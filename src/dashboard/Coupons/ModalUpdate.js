import React, { useState } from 'react'
import { updateCoupon} from "../../API/apis";

const ModalUpdate = ({ setShowModalUpdate,id}) => {
    const [discountv, setdiscountv] = useState("");
    const [validity, setValidity] = useState("");
  const [type, setType] = useState("Percentage");
  const [ctype, setcType] = useState("One time apply");
  const [code, setCode] = useState("");
  const [limits, setlimit] = useState("");
  const [description, setDescription] = useState("");
  const [start, setstart] = useState("");

  console.log(id)



  const submitHandler = async () => {
    const formData = new FormData()
      formData.append('coupon_code', code);
    formData.append('coupon_type', ctype);
    formData.append('discount', discountv);
    formData.append('assign_limit', limits);
    formData.append('discount_type', type);
    formData.append('start_date', start);
    formData.append('expire_date', validity);
    formData.append('description', description)
    try {
      const response = await updateCoupon(id,formData);
      console.log(response)
      console.log("Coupon updated successfully.");
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
      // setShowModal(false);
  }
  return (
    <div className="modal-wrapper">
                <div className="modal-content">
                  <h3 className="text-wrapper-modal">Create Coupon</h3>
                  <div className="content-wrapper-1">
                    <div className="modal-discount-div">
                      <h5 className="modal-discount-name" style={{marginLeft:'-12px'}}>Discount</h5>
                      <select style={{width:'8rem',marginLeft:'-1rem',backgroundColor:'#d3d3d342',borderRadius:'10px',border:'none',height:'3rem'}}
                        type="text"
                        className="modal-discount"
                        placeholder="example"
                        onChange={(e) => {
                          setType(e.target.value);
                          
                        }}
                      >
                      <option>Percentage</option>
                      <option>Number</option>

                      </select>
                    </div>
                    
                    <div className="modal-validity-div" style={{marginLeft:'2rem'}}>
                    <h5 className="modal-validity-name">Start Date</h5>
                      <input placeholder="PerMonth"
                        type="date"
                        className="modal-validity"
                        onChange={(e) => {
                          setstart(e.target.value);
                        }}
                      />
                    </div> 

                     <div className="modal-validity-div" style={{marginLeft:'2rem'}}>
                    <h5 className="modal-validity-name">Validity</h5>
                      <input placeholder="PerMonth"
                        type="date"
                        className="modal-validity"
                        onChange={(e) => {
                          setValidity(e.target.value);
                        }}
                      />
                    </div>
                    
                  </div>
                  <div className="content-wrapper-1">
                  
                  
                  </div>
                  <div className="content-wrapper-2">
               
                    <input placeholder="Discount" style={{marginTop:10}}
                        onChange={(e) => {
                          setdiscountv(e.target.value);
                        }}
                    />
                  </div>
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Type</h5>
                    <select style={{backgroundColor:'#d3d3d342',border:'none'}}
                      type="text"
                      className="modal-code"
                      onChange={(e) => {
                        setcType(e.target.value);
                      }}
                     
                    >
                      <option>One time apply</option>
                      <option>Assign limit</option>
                      <option>First limited users</option>
                    </select>
        </div>
                  <input placeholder="limit" style={{marginTop:10}}
                        onChange={(e) => {
                          setlimit(e.target.value);
                        }}
                    />
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Create Code</h5>
                    <input
                      type="text"
                      className="modal-code"
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
        </div>
                  
                  <div className="content-wrapper-4">
                    <h5 className="modal-desc-name">Description</h5>
                    <input
                      type="text"
                      className="modal-desc"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="modal-buttons">
                    <button className="modal-create" onClick={submitHandler}>
                      Update
                    </button>
                    <button
                      className="modal-cancel"
                      onClick={() => {
                        setShowModalUpdate(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
  )
}

export default ModalUpdate
