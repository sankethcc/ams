import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Col, Row } from "react-bootstrap";
import SideNav from "../SideNav";
import Head from "../Head";
import { getAllCoupons, createCoupon } from "../../API/apis";
import { IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ModalUpdate from "./ModalUpdate";

const Coupon = () => {
  const [allActive, setAllActive] = useState(true);
  const [active, setActive] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const [discount, setDiscount] = useState("");
  const [validity, setValidity] = useState("");
  const [start, setstart] = useState("");
  const [discountv, setdiscountv] = useState("");
  const [limits, setlimit] = useState("");
  const [type, setType] = useState("Percentage");
  const [ctype, setcType] = useState("One time apply");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState("");
  const [limit_type, setLimitType] = useState("first users");

  useEffect(() => {
    getAllCoupons()
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dataHandler = async (submitData) => {

    const formData = new FormData()
    formData.append('coupon_code', submitData.code);
    formData.append('coupon_type', submitData.ctype);
    formData.append('discount', submitData.discountv);
    formData.append('assign_limit', submitData.limits);
    formData.append('discount_type', submitData.type);
    formData.append('start_date', submitData.start);
    formData.append('expire_date', submitData.validity);
    formData.append('description', submitData.description)
    // console.log(submitData)
    // console.log("Data being sent to server:", submitData); 
    try {
      const response = await createCoupon(formData);
      console.log(response)
      console.log("Coupon created successfully.");
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
    handleClose();
  };

  const toggleButton = (button) => {
    setAllActive(button === "All");
    setActive(button === "Active");
    setExpired(button === "Expired");
  };

  const handleCardClick = (index) => {
    if (index === activeCardIndex) {
      setActiveCardIndex(null);
    } else {
      setActiveCardIndex(index);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      discount,
      validity,
      type,
      code,
      description,
      limit, 
      limit_type,
      discountv,
      start,
      limits,
      ctype
    };
    dataHandler(obj);
    setCoupons((prev) => [{
        '_id': code,
        'discount': discountv,
        'coupon_type': ctype,
        'assign_limit': limits,
        'start_date': start,
        'expire_date': validity,
        'discount_type':type,
          description
      }, ...prev]);
    setdiscountv("");
    setValidity("");
    setType("Percentage");
    setCode("");
    setDescription("");
    setlimit("")
    setLimit(""); 
    setcType("One time apply"); 
    setstart("")
    setShowModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);


  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {

    setAnchorEl(e.target._id);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleDotMenu = ()=>{
    setShowModalUpdate(!showModalUpdate)
  }
  const handleOpenUpdate = (index) => {
    setShowModalUpdate(prevShowModalUpdate => ({
      ...prevShowModalUpdate,
      [index]: true
    }));
  };

  return (
    <div className="coupon-screen">
      <SideNav xyz={"coupon"} />
      <Head />
      <div className="text-wrapper-7">Coupon</div>
      <div className="card-top">
        <div
          className={`card-wrap-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text-wrapper-13">All</div>
        </div>
        <div
          className={`card-wrap-4 ${active ? "active" : ""}`}
          onClick={() => toggleButton("Active")}
        >
          <div className="text-wrapper-13">Active</div>
        </div>
        <div
          className={`card-wrap-4 ${expired ? "active" : ""}`}
          onClick={() => toggleButton("Expired")}
        >
          <div className="text-wrapper-13">Expired</div>
        </div>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field-coupon"
          placeholder="Search user"
        />
      </div>
      <div className="coupon-card">
        <Col md={3}>
          <div className="subscription-card-create">
            <button className="button" onClick={(e) => setShowModal(true)}>
              <span>+</span>
              <br />
              {/* sdfaklsjdfkajsdf */}
              <b>Create new Coupon</b>
            </button>
            {showModal && (
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
                    
                    {/* <br/> */}
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
               
                   
                  </div>
                  <input placeholder="Discount" style={{marginTop:10}}
                        onChange={(e) => {
                          setdiscountv(e.target.value);
                        }}
                    />
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Coupon Type</h5>
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
                      Create
                    </button>
                    <button
                      className="modal-cancel"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>

        {coupons &&
          coupons.length > 0 &&
          coupons.map((couponData, index) => (
            <Col key={index} className="coupon-items" style={{position:'relative'}}>
              <Card
                key={index}
                className={`subscription-card ${
                  activeCardIndex === index ? "active" : ""
                }`}
                onClick={() => handleCardClick(index)}
              >
                <p
                  style={{
                    color: "#707070",
                    fontSize: "32px",
                    margin: "20px",
                    marginLeft: "30px",
                    marginBottom: "0px",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                  }}
                >
                  
                  <b>
                    {couponData?.discount_type === "Percentage"
                      ? `${couponData?.discount ?? ""}%`
                      : `₹${couponData?.discount ?? ""}`}
                  </b>
                </p>
                
                
                <p
                  style={{
                    color: "#A9A9B1",
                    fontSize: "16px",
                    marginLeft: "30px",
                  }}
                >
                  {couponData?.description ?? "-"}
                </p>
                <p
                  style={{
                    color: "#707070",
                    fontSize: "25px",
                    marginLeft: "30px",
                  }}
                >
                  <b>{couponData?._id ?? "-"}</b>{" "}
                </p>
                <p className="left-entry">
                  <small>Count</small>
                  <br />
                  {couponData?.assign_limit ?? 0} {couponData?.coupon_type ?? "-"}

                </p>
                
                <p className="right-entry">
                  <small>Validity</small>
                  <br />
                  {couponData?.expire_date ?? 0}
                </p>
              </Card>

                    {/* id="long-button" */}
              <div style={{position:'absolute', top:'30px', right:'10px'}}>
                  <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  
                  >
                    <MoreVertIcon />
                  </IconButton>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        TransitionComponent={Fade}
                      >
                        <MenuItem 
                        onClick={()=>{
                          handleCloseMenu()
                          handleOpenUpdate(index)
                        }}>
                          Update
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                      </Menu>
                    </div>

                    {showModalUpdate[index] && showModalUpdate?
                  <ModalUpdate 
                  showModalUpdate={showModalUpdate}
                  setShowModalUpdate={setShowModalUpdate}
                  submitHandler={submitHandler}
                  id={index}
                  />
                  :null}


            </Col>
            
          ))}
      </div>
    </div>
  );
};

export default Coupon;
