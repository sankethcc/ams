import React, { useState,useEffect } from 'react'
import { updateCoupon,getSingleCoupons,deleteCoupon} from "../../API/apis";
import { enqueueSnackbar } from 'notistack';

const ModalUpdate = ({ setShowModalUpdate,id}) => {
    const [discountv, setdiscountv] = useState("");
    const [validity, setValidity] = useState("");
  const [type, setType] = useState("percentage");
  const [ctype, setcType] = useState("");
  const [code, setCode] = useState("");
  const [limits, setlimit] = useState("");
  const [description, setDescription] = useState("");
  const [start, setstart] = useState("");
  const [btn,setbtn]=useState("")
  // console.log(id)


  useEffect(() => {
    getSingleCoupons(id)
      .then((response) => {
        console.log(response.data.discount)
        setdiscountv(response.data.discount)
        setValidity(response.data.expire_date)
        setstart(response.data.start_date)
        setcType(response.data.coupon_type)
        setType(response.data.discount_type)
        setlimit(response.data.assign_limit)
        setDescription(response.data.description)
        setCode(response.data._id)
        setbtn(response.data.blocked)
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        

      });
  }, []);
  const deleteHandler = async () => {
    try {
      const response = await deleteCoupon(id)
      console.log(response)
      enqueueSnackbar(`Coupon ${btn==true?"Activated": "Deactivated"} successfully.`, { variant: 'success' })
      setShowModalUpdate(true)
    }catch (error) {
      console.error("Error creating coupon:", error);
      enqueueSnackbar(`Network Error.`, { variant: 'error' })
    }
  }
  const submitHandler = async () => {
    if(!code || !ctype || !discountv || !limits || !type|| !start|| !validity ||!description){
      enqueueSnackbar(`Please fill all fields`, { variant: 'error' })
    }else{
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
      // console.log(response)
      console.log("Coupon updated successfully.");
      enqueueSnackbar(`Coupon updated successfully.`, { variant: 'success' })
      setShowModalUpdate(true)
      
    } catch (error) {
      console.error("Error creating coupon:", error);
      enqueueSnackbar(`Network Error`, { variant: 'error' })
    }
      // setShowModal(false);
  }
  }
  return (
    <div className="modal-wrapper">
                <div className="modal-content">
                  <h3 className="text-wrapper-modal">Update Coupon</h3>
                  <div className="content-wrapper-1">
                    <div className="modal-discount-div">
                      <h5 className="modal-discount-name" style={{marginLeft:'-12px'}}>Discount</h5>
                      <select style={{width:'8rem',marginLeft:'-1rem',backgroundColor:'#d3d3d342',borderRadius:'10px',border:'none',height:'3rem'}}
                        type="text"
                        className="modal-discount"
              placeholder="example"
                        value={type}
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
                        value={start}
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
                        value={validity}
                        
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
                        value={discountv}
                    />
                  </div>
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Type</h5>
                    <select style={{backgroundColor:'#d3d3d342',border:'none'}}
                      type="text"
            className="modal-code"
                        value={ctype}
                      onChange={(e) => {
                        setcType(e.target.value);
                      }}
                     
                    >
                      <option>One time apply</option>
                      <option>Assign limit</option>
                      <option>First limited users</option>
                    </select>
        </div>
        <input placeholder="limit" style={{ marginTop: 10 }}
                       value={limits}
                        onChange={(e) => {
                          setlimit(e.target.value);
                        }}
                    />
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Create Code</h5>
                    <input
                      disabled={true}
                      type="text"
            className="modal-code"
                        value={code}
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
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="modal-buttons">
                    <button className="modal-create" onClick={submitHandler}>
                      Update
                    </button>
                    <button className="modal-create" onClick={deleteHandler}>
                      {btn==true?"Active": "InActive"}
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
