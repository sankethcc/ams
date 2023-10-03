from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from datetime import datetime
from flask_cors import CORS  # Import the CORS module
import flask_cors


app = Flask(__name__)
flask_cors.cross_origin(
    origins='http://localhost:3000/',
    methods=['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'],
    headers=None,
    supports_credentials=False,
    max_age=None,
    send_wildcard=True,
    always_send=True,
    automatic_options=False
)

# Enable CORS for all routes
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/AMS'
mongo_a = PyMongo(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/students"
mongo_s = PyMongo(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/teachers"
mongo_t = PyMongo(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/management"
mongo_m = PyMongo(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/parents"
mongo_p = PyMongo(app)



# API endpoints supporting CRUD operations
def get_entities(collection_name, dbinitialize):
    collection = dbinitialize.db[collection_name]
    all_entities = list(collection.find())
    # Convert ObjectId to string for JSON serialization
    for entity in all_entities:
        entity['_id'] = str(entity['_id'])
    return jsonify(all_entities)


def get_entity(collection_name, entity_id, dbinitialize):
    entity = dbinitialize.db[collection_name].find_one({"_id": entity_id})
    return entity

def update_entity(collection_name, entity_id, entity_data, dbinitialize):
    result = dbinitialize.db[collection_name].update_one({"_id": entity_id},
                                                  {"$set": entity_data})
    if result.modified_count == 0:
        return jsonify({"error": f"{collection_name.capitalize()} notfound"}), 404
    updated_entity = dbinitialize.db[collection_name].find_one({"_id": entity_id})
    return jsonify(updated_entity)

def block_entity(collection_name, entity_id, db_initialize):
    entity = db_initialize.db[collection_name].find_one({"_id": entity_id})
    if not entity:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404

    new_blocked_value = not entity.get("blocked", False)  # Toggle the 'blocked' value
    result = db_initialize.db[collection_name].update_one({"_id": entity_id}, {"$set": {"blocked": new_blocked_value}})

    if result.modified_count == 0:
        return jsonify({"error": f"Failed to update {collection_name.capitalize()}'s 'blocked' status"}), 500

    updated_entity = db_initialize.db[collection_name].find_one({"_id": entity_id})

    return jsonify(updated_entity), 200

def delete_entity(collection_name, entity_id):
    deleted_entity = mongo_a.db[collection_name].find_one_and_delete({"_id": entity_id})
    if deleted_entity is None:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404
    return jsonify(deleted_entity)

# Calculate total amount including tax
# @app.route('/calculate_total', methods=['GET'])
def calculate_total(amount, tax_regime, tax_excluded):
    if  tax_excluded == True :
        total = amount
    elif tax_regime is not None:
        total = amount + (amount * tax_regime / 100)
    return total

def format_date(date):
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    year = date_obj.year
    month = date_obj.month
    day = date_obj.day
    return datetime(year, month, day)
           
def check_expire(coupon_id):
    coupon = get_entity(coupon_id)
    if coupon and coupon['expire_date'] > datetime.now():
        return True
    else:
        return False

# subscription CRUD operations
                                                                                    # All API's checked by ARPIT
# get all subscriptions 
@app.route('/subscriptions', methods=['GET'])
def get_subscriptions():
    return get_entities('subscription_manage', mongo_a)

# get one subscription
@app.route('/subscription/<string:subscription_id>', methods=['GET'])
def get_subscription(subscription_id):
    return get_entities('subscription_manage', subscription_id, mongo_a)

# create a new subscription
@app.route('/create_subscription', methods=['POST'])
def create_subscription():
    name = request.json['name']
    amount = int(request.json['amount'])
    period = request.json['period']
    description = request.json['description']
    feature_offering = request.json['feature_offering']
    tax_regime = int(request.json['tax_regime'])
    tax_excluded = request.json['tax_excluded']
    total = calculate_total(amount,tax_regime, tax_excluded)

    new_subscription ={
        "_id": str(ObjectId()),
        'name': name,
        'amount': amount,
        'period': period,
        'description': description,
        'feature_offering': feature_offering,
        'tax_regime': tax_regime,
        'tax_excluded': tax_excluded,
        'total': total
    }
    try:
        inserted_id = mongo_a.db.subscription_manage.insert_one(new_subscription).inserted_id
        inserted = mongo_a.db.subscription_manage.find_one({"_id": inserted_id})
        return jsonify({"_id": str(inserted["_id"])})
    except Exception as e:
        return jsonify({"error": "Error occurred while creating the class"}), 500
    
# update subscription requires existing subscription id
@app.route('/update_subscription/<string:subscription_id>', methods=['PUT'])
def update_subscription(subscription_id):
    name = request.json['name']
    amount = int(request.json['amount'])
    period = request.json['period']
    description = request.json['description']
    feature_offering = request.json['feature_offering']
    tax_regime = int(request.json['tax_regime'])
    tax_excluded = request.json['tax_excluded']
    total = calculate_total(amount,tax_regime, tax_excluded)

    update_subscription ={
        'name': name,
        'amount': amount,
        'period': period,
        'description': description,
        'feature_offering': feature_offering,
        'tax_regime': tax_regime,
        'total': total
    }
    return update_entity('subscription_manage', subscription_id, update_subscription, mongo_a)

# delete subscription requires existing subscription id
@app.route('/delete_subscription/<string:subscription_id>', methods=['DELETE'])
def delete_subscription(subscription_id):
    return delete_entity('subscription_manage', subscription_id)

#get all users on platform
@app.route('/get_all_platform/users', methods = ['GET'])
def all_platform_users():
    all_entities = []
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    students = list(mongo_s.db.student_profile.find(projection=projection))
    teachers = list(mongo_t.db.teacher_profile.find(projection=projection))
    managements = list(mongo_m.db.management_profile.find(projection=projection))
    parents = list(mongo_p.db.parent_profile.find(projection=projection))
    all_entities = all_entities + students + teachers + managements + parents
    return jsonify(all_entities)

#get all students
@app.route('/get_all_students', methods = ['GET'])
def get_all_students():
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    all_students = list(mongo_s.db.student_profile.find(projection=projection))
    return jsonify(all_students)

#get all teachers
@app.route('/get_all_teachers', methods = ['GET'])
def get_all_teachers():
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    all_teachers = list(mongo_t.db.teacher_profile.find(projection=projection))
    return jsonify(all_teachers)

#get all parents
@app.route('/get_all_parents', methods = ['GET'])
def get_all_parents():
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    all_parents = list(mongo_p.db.parent_profile.find(projection=projection))
    return jsonify(all_parents)

#get all managements
@app.route('/get_all_managements', methods = ['GET'])
def get_all_managements():
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    all_managements = list(mongo_m.db.management_profile.find(projection=projection))
    return jsonify(all_managements)

@app.route('/edit_user/<string:_id>')
def edit_user_details(_id):
    update_user_id = request.json['user_id']
    if mongo_s.db.student_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.student_profile.find_one({"_id": _id})
        collection_name = 'student_profile'
        dbinitialize = mongo_s
    elif mongo_t.db.teacher_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.teacher_profile.find_one({"_id": _id})
        collection_name = 'teacher_profile'
        dbinitialize = mongo_t
    elif mongo_m.db.management_profile.find_one({"_id": _id}) is not None:
        # entity = mongo_m.db.management_profile.find_one({"_id": _id})
        collection_name = 'management_profile'
        dbinitialize = mongo_m
    elif mongo_p.db.parent_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.parent_profile.find_one({"_id": _id})
        collection_name = 'parent_profile'
        dbinitialize = mongo_p
    entity_data = {
        'user_id': update_user_id
    }
    return update_entity(collection_name, _id, entity_data, dbinitialize)

# use same api for block and suspend
#block single user, which can be possible from admin site
@app.route('/block_user/<string:email>', methods = ['PUT'])
def block_single_user(email):
    dbinitialize = ""
    if mongo_s.db.users.find_one({"email": email}) is not None: # student database
        entity = mongo_s.db.users.find_one({"email": email})
        dbinitialize = mongo_s
    elif mongo_m.db.users.find_one({"email": email}) is not None: # management database
        entity = mongo_m.db.users.find_one({"email": email})
        dbinitialize = mongo_m
    elif mongo_t.db.users.find_one({"email": email}) is not None: # teacher database
        entity = mongo_t.db.users.find_one({"email": email})
        dbinitialize = mongo_t
    elif mongo_p.db.users.find_one({"email": email}) is not None: # parents database
        entity = mongo_p.db.users.find_one({"email": email})
        dbinitialize = mongo_p
    try:
        new_blocked_value = not entity.get("blocked", False)  # Toggle the 'blocked' value
        result = dbinitialize.db.users.update_one({"_id": entity["_id"]}, {"$set": {"blocked": new_blocked_value}})

        if result.modified_count == 0:
            return jsonify({"error": "Failed to update user's 'blocked' status"}), 500

        updated_entity = dbinitialize.db.users.find_one({"_id": entity["_id"]})
        return updated_entity, 200
    except Exception as e:
        return jsonify({"error": "Error occurred while blocking user"}), 500
    

# Coupon CRUD operations
@app.route('/get_all_coupon', methods = ['GET'])
def get_all_coupon():
    return get_entities('coupons_collection', mongo_a)


@app.route('/generate_coupon', methods=['POST'])
def generate_coupon():
    try:
        coupon_code = request.json['code']
        coupon_type = request.json['type']
        discount = request.json['discount']
        limit=request.json['limit']
        limit_type=request.json['limit_type']
        expire_date = request.json['validity']
        description = request.json['description']

        # Basic input validation
        if not coupon_code or not coupon_type or not discount  or not expire_date or not description:
            return jsonify({'error': 'All fields are required.'}), 400
        # Validate and convert 'discount' to an integer
        try:
            discount = int(discount)
        except ValueError:
            return jsonify({'error': 'Invalid discount value. Please enter a valid number.'}), 400
        # You can add more validation as needed for dates, etc.
        entity_data = {
            "_id": str(ObjectId()),
            'coupon_code': coupon_code, 
            'discount': discount, 
            'discount_type': coupon_type,
            'validity': expire_date, 
            'limit':limit,
            'limit_type':limit_type,
            'description': description,
            'used': False,
            'created_at': datetime.now(),
            # 'updated_at': "Not updated"
        }
        inserted_id = mongo_a.db.coupons_collection.insert_one(entity_data).inserted_id
        inserted = mongo_a.db.coupons_collection.find_one({"_id": inserted_id})
        return jsonify({"_id": str(inserted["_id"])}), 200
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing your request.'}), 500


# update existing coupon 
@app.route('/update_coupon/<string:coupon_id>', methods = ['PUT'])
def update_coupon(coupon_id):
    coupon_code = request.json['coupon_code']
    coupon_type = request.json['coupon_type']
    discount = int(request.json['discount'])
    start_date = request.json['start_date']
    expire_date = request.json['expire_date']
    description = request.json['description']
    entity_data = {
        '_id':coupon_code,
        'coupon_type':coupon_type,
        'discount':discount,
        'start_date':start_date,
        'expire_date':expire_date,
        'description':description,
        'updated_at':datetime.now()
    }
    return update_entity('coupons_collection', coupon_id, entity_data, mongo_a )

#delete existing coupon
@app.route('/delete_coupon/<string:coupon_id>', methods = ['DELETE'])
def delete_coupon(coupon_id):
    return delete_entity('coupons_collection', coupon_id)

if __name__ == '__main__':
    app.run(debug=True)