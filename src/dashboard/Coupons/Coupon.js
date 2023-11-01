/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, Col } from "react-bootstrap";
import SideNav from "../SideNav";
import Head from "../Head";
import { getAllCoupons, createCoupon, getSubscriptions } from "../../API/apis";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalUpdate from "./ModalUpdate";
import { useSnackbar } from "notistack";

const Coupon = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allActive, setAllActive] = useState(true);
  const [active, setActive] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const [validity, setValidity] = useState("");
  const [start, setstart] = useState("");
  const [discountv, setdiscountv] = useState("");
  const [limits, setlimit] = useState(1);
  const [type, setType] = useState("Percentage");
  const [ctype, setcType] = useState("One time apply");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const [subscription, setSubscription] = useState([])
  const [selectedSubscription, setSelectedSubscription] = useState()

  const handleClose = () => setShowModal(false);

  const submitHandler = async () => {
    if(ctype ==="One time apply"){
      setlimit(1)
    }
    if (
      !code ||
      !ctype ||
      !discountv ||
      !limits ||
      !type ||
      !start ||
      !validity ||
      !description
    ) {
      enqueueSnackbar(`Please fill all fields`, { variant: "error" });
      
      console.log(limits)
    } else {
      const formData = new FormData();
      formData.append("coupon_code", code);
      formData.append("coupon_type", ctype);
      formData.append("discount", discountv);
      formData.append("assign_limit", limits);
      formData.append("discount_type", type);
      formData.append("start_date", start);
      formData.append("expire_date", validity);
      formData.append("description", description);
      formData.append('valid_subscription', selectedSubscription);
      try {
        await createCoupon(formData);
        enqueueSnackbar(`Coupon created successfully`, { variant: "success" });
        setCoupons((prev) => [
          {
            _id: code,
            discount: discountv,
            coupon_type: ctype,
            assign_limit: limits,
            start_date: start,
            expire_date: validity,
            discount_type: type,
            description,
          },
          ...prev,
        ]);
        setallData((prev) => [
          {
            _id: code,
            discount: discountv,
            coupon_type: ctype,
            assign_limit: limits,
            start_date: start,
            expire_date: validity,
            discount_type: type,
            description,
          },
          ...prev,
        ]);
        setdiscountv("");
        setValidity("");
        setType("Percentage");
        setCode("");
        setDescription("");
        setlimit("");
        setcType("One time apply");
        setstart("");
        setShowModal(false);

        handleClose();
      } catch (error) {
        console.error("Error creating coupon:", error);
        enqueueSnackbar(`Coupon Already Exist`, { variant: "error" });
      }
    }
  };

  const toggleButton = (button) => {
    // console.log(button)
    if (button === "All") {
      // setUserData(allData)
      setCoupons(allData);
    } else if (button === "Active") {
      setCoupons(activeData);
    } else {
      setCoupons(InactiveData);
    }
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

  useEffect(() => {
    document.body.style.overflow = "scroll";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    // console.log(allActive)
    if (allActive) {
      const filteredItems = allData.filter((user) =>
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoupons(filteredItems);
    } else if (active) {
      const filteredItems = activeData.filter((user) =>
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoupons(filteredItems);
    } else {
      const filteredItems = InactiveData.filter((user) =>
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoupons(filteredItems);
    }
  };
  
  
 
  const handleOpenUpdate = (index) => {
    setShowModalUpdate((prevShowModalUpdate) => ({
      ...prevShowModalUpdate,
      [index]: true,
    }));
  };
  const date = new Date().toJSON().slice(0, 10);;
  useEffect(() => {
    getAllCoupons()
      .then((response) => {
        setallData(response.data)
        const data = response.data;
        const act = data.filter((data) => ((date < data.expire_date && !data.blocked)))
        const inact = data.filter((data) => ((date >= data.expire_date || data.blocked)))
        setactiveData(act)
        setInactiveData(inact)
        if (allActive) {
          setCoupons(response.data);
        }
        else if (active){
          setCoupons(act);
        }
        else {
          setCoupons(inact);
        }
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });

      getSubscriptions()
      .then((data) => {
        const act = data.filter((data) => ((!data.blocked)))
        setSubscription(act)
        
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [showModalUpdate, active, allActive ]);
  
  
  return (
    <div className="screen">
      <SideNav xyz={"coupon"} />
      <div style={{ width: "85%", padding: "24px 45px" }}>
        <Head pageName="Coupon" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="card-top">
            <div
              className={`card-wrap-4 ${allActive ? "active" : ""}`}
              onClick={() => toggleButton("All")}
            >
              <div className="text-wrapper-13">All {allData.length}</div>
            </div>
            <div
              className={`card-wrap-4 ${active ? "active" : ""}`}
              onClick={() => toggleButton("Active")}
            >
              <div className="text-wrapper-13">Active {activeData.length}</div>
            </div>
            <div
              className={`card-wrap-4 ${expired ? "active" : ""}`}
              onClick={() => toggleButton("Expired")}
            >
              <div className="text-wrapper-13">Expired {InactiveData.length}</div>
            </div>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field-search"
              placeholder="Search Coupon"
              value={searchItem}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div style={{justifyContent:`${coupons.length<3?'flex-start':''}`}} className="coupon-card">
            <div className="subscription-card-create coupon1-items1">
              <button className="button" onClick={(e) => setShowModal(true)}>
                <span>+</span>
                <span style={{fontSize:'20px', color:'#707070'}}>Create new Coupon</span>
              </button>
              {showModal && (
                <div className="modal-wrapper">
                <div className="modal-content">
                  <h3 className="text-wrapper-modal">Create Coupon</h3>
                  <div style={{marginBottom:'10px'}} className="content-wrapper-1">
                    <div className="modal-validity-div" style={{width:'100%'}}>
                      <h5 className="modal-validity-name">Start Date</h5>
                      <input
                        placeholder="PerMonth"
                        type="date"
                        className="modal-validity"
                        value={start}
                        onChange={(e) => {
                          setstart(e.target.value);
                        }}
                      />
                    </div>
          
                    <div className="modal-validity-div" style={{width:'100%'}}>
                      <h5 className="modal-validity-name">Validity</h5>
                      <input
                        placeholder="PerMonth"
                        type="date"
                        className="modal-validity"
                        value={validity}
                        onChange={(e) => {
                          setValidity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                      <h5 className="modal-discount-name">
                        Discount
                      </h5>
                  <div className="content-wrapper-2">
                      <select
                        type="text"
                        className="modal-select b-radius2"
                        placeholder="example"
                        value={type}
                        onChange={(e) => {
                          setType(e.target.value);
                        }}
                      >
                        <option>Percentage</option>
                        <option>Number</option>
                      </select>
                    <input
                      placeholder="Discount"
                      style={{ marginTop: 10 }}
                      onChange={(e) => {
                        setdiscountv(e.target.value);
                      }}
                      value={discountv}
                    />
                  </div>
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Type</h5>
                    <div style={{display:'flex', gap:'15px'}}>
          
                    <select
                      type="text"
                      className="modal-select b-radius2"
                      value={ctype}
                      onChange={(e) => {
                        setcType(e.target.value);
                      }}
                    >
                      <option>One time apply</option>
                      <option>Assign limit</option>
                      <option>First limited users</option>
                    </select>
                  <input
                  className={`${ctype === "One time apply" || ""? "d-none": "" }`}
                    placeholder="limit"
                    value={limits}
                    onChange={(e) => {
                      setlimit(e.target.value);
                    }}
                  />
                    </div>
                  </div>
                  <div className="content-wrapper-3">
                    <h5 className="modal-code-name">Subscription</h5>
                    <div style={{display:'flex', gap:'15px'}}>
                    
                    <select
                    style={{textTransform:'capitalize'}}
                      type="text"
                      className="modal-select b-radius2"
                      value={selectedSubscription}
                      onChange={(e) => {
                        setSelectedSubscription(e.target.value);
                      }}
                    >
                      <option value='' disabled selected hidden>Select Subscription</option>
                       {subscription.map((data, i)=>{
                            const {_id, name, amount, period} = data
                            return(
                                <option style={{textTransform:'capitalize'}} value={_id} key={i}>
                                    <span>{name}</span>
                                    <span> ₹{amount} / {period} </span>
                                </option>
                            )
                          })}
                    </select> 
                    </div>
                  </div>
                  <div className="content-wrapper-4">
                    <h5 className="modal-code-name">Create Code</h5>
                    <input
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

          {coupons &&
            coupons.length > 0 &&
            coupons.map((couponData, index) => (
              <div
                key={index}
                className="coupon1-items1"
                style={{ position: "relative" }}
              >
                <Card
                style={{opacity:`${couponData.blocked || date >= couponData.expire_date ?'0.6':'1'}`}}
                  key={index}
                  className={`subscription-card ${
                    activeCardIndex === index && !couponData?.blocked && date < couponData.expire_date ? "active" : ""
                  }`}
                  onMouseEnter={() => handleCardClick(index)}
                  onMouseLeave={handleCardClick}
                >
                  <p
                    style={{
                      fontSize: "26px",
                      fontWeight: "700",
                      fontFamily: "Poppins",
                    }}
                  >
                    
                      {couponData?.discount_type === "Percentage"
                        ? `${couponData?.discount ?? ""}% OFF`
                        : `₹${couponData?.discount ?? ""} OFF`}
                    
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      textTransform:'capitalize',
                      lineHeight:'1.5',
                      wordSpacing:'4.5px'
                      
                    }}
                  >
                    {couponData?.description ?? "-"}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      textTransform:"uppercase",
                      fontWeight:'700'
                    }}
                  >
                    {couponData?._id ?? "-"}
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p className="left-entry" style={{display:'flex', flexDirection:'column', fontSize:'11px' }}>
                      <span
                        style={{
                          color: "var(--light-grey, #A9A9B1)",
                          marginBottom: "10px",
                        }}
                      >
                        Count
                      </span>
                      <span>
                        {couponData?.assign_limit ?? 0}{" "}
                        {couponData?.coupon_type ?? "-"}
                      </span>
                    </p>

                    <p className="right-entry" style={{display:'flex', fontSize:'11px', flexDirection:'column' }}>
                      <span
                       style={{
                        color: "var(--light-grey, #A9A9B1)",
                        marginBottom: "10px",
                      }}
                      
                      >Validity</span>
                      {couponData?.expire_date ?? 0}
                    </p>
                  </div>
                <div
                  style={{ position: "absolute", top: "15px", right: "15px" }}
                >
                  <div className="subscription-menu">
                      <div className="dot-menu"> <MoreVertIcon /> </div>
                      <div className="menu-list">
                        <span  onClick={()=>handleOpenUpdate(index, couponData?._id)}>Update</span>
                        <span  onClick={()=>handleOpenUpdate(index, couponData?._id)}>Delete</span>
                      </div>
                    </div>
                </div>
                </Card>


                {showModalUpdate[index] && (
                  <ModalUpdate
                    showModalUpdate={showModalUpdate}
                    setShowModalUpdate={setShowModalUpdate}
                    submitHandler={submitHandler}
                    id={couponData._id}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
