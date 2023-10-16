import React, { useState, useEffect } from "react";
import "./css/subscription1.css";
import { Card, Col, Row } from "react-bootstrap";
import SubscriptionModal from "./SubscriptionModal";
import SubscriptionModalUpdate from './SubscriptionModalUpdate'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { getSubscriptions} from "../API/apis.js";
import Head from "./Head";
import SideNav from "./SideNav";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";
const Subscription = () => {
  const [allActive, setAllActive] = useState(true);
  const [Active, setActive] = useState(false);
  const [Expired, setExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  // console.log(data);
  const [searchItem, setSearchItem] = useState('')
  const [allData, setallData] = useState([]);

  const dataHandler = (submitData) => {
    const updatedArray = [submitData,...data];
    setallData(updatedArray)
    setData(updatedArray);
  };

  useEffect(() => {
    
    getSubscriptions()
      .then((data) => {
        setData(data);
        setallData(data)
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = allData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredItems);
  }
  const toggleButton = (button) => {
    setAllActive(button === "All");
    setActive(button === "Active");
    setExpired(button === "Expired");
  };

  const handleCardClick = (index) => {
    if (index === activeCardIndex) {
      console.log("ji")
      setActiveCardIndex(null); // Deselect the card if clicked again
    } else {
      setActiveCardIndex(index);
    }
  };
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenUpdate = (index) => {
    setShowModalUpdate(prevShowModalUpdate => ({
      ...prevShowModalUpdate,
      [index]: true
    }));
  };

  return (
    <div className="coupon1-screen1">
      <SideNav xyz={"subscription"} />
      <Head />
      <div className="text1-wrapper1-7">Subscription</div>
      <div className="card1-top1">
        <div
          className={`card1-wrap1-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text1-wrapper1-13">All</div>
        </div>
        <div
          className={`card1-wrap1-4 ${Active ? "active" : ""}`}
          onClick={() => toggleButton("Active")}
        >
          <div className="text1-wrapper1-13">Active</div>
        </div>
        <div
          className={`card1-wrap1-4 ${Expired ? "active" : ""}`}
          onClick={() => toggleButton("Expired")}
        >
          <div className="text1-wrapper1-13">Expired</div>
        </div>
      </div>
      <div className="input1-wrapper1">
        <input type="text" className="input1-field1" placeholder="Search Subscription" value={searchItem}
          onChange={handleInputChange}/>
      </div>
      {/* <div> */}
      <Row className="coupon1-card1">
        <Col md={3}>
          <Card className="subscription1-card1-create1">
            <button className="button11" onClick={(e) => setShowModal(true)}>
              <span>+</span>
              <br />
              <b>Create new Subscription</b>
            </button>

            {showModal && (
              <SubscriptionModal
                showModal={showModal}
                setShowModal={setShowModal}
                dataHandler={dataHandler}
              />
            )}
          </Card>
        </Col>
        {data &&
          data.length > 0 &&
          data?.map((couponData, index) => (
            <Col key={index} className="coupon1-items1">

              <Card
                key={index}
                className={`subscription1-card1 ${activeCardIndex === index ? "active" : ""
                  }`}
                  style={{position:'relative', paddingTop:'20px'}}
                // onClick={() => setShowModal(true)}
              >
                <div
                  style={{
                    position:'absolute',
                    color: "#707070",
                    fontSize: "20px",
                    right:'10px',
                    top:'0px'


                  }}
                >
                  <select placeholder='Update'
                  style={{border:'none'}}
                  onChange={()=>handleOpenUpdate(index, couponData?._id)}
                >
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    
                  </IconButton>
                      
                        <option> <MoreVertIcon /> </option>
                        <option> Update </option>
                        <option>Delete</option>
                     
                    </select>
                </div>
                  
                  {showModalUpdate[index] && showModalUpdate?
                  <SubscriptionModalUpdate 
                  showModalUpdate={showModalUpdate}
                  setShowModalUpdate={setShowModalUpdate}
                  dataHandler={dataHandler}
                  index={couponData._id}
                  
                  />
                  :null}


                <p
                  style={{
                    color: "#707070",
                    fontSize: "18px",
                    marginLeft: "14px",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontWeight: 700
                  }}
                >
                  <b>{couponData?.name ?? "-"}</b>
                </p>

                <p
                  style={{
                    color: "black",
                    fontSize: "32px",
                    marginLeft: "14px",
                    fontWeight: 700,
                    marginTop: "13px"
                  }}
                >
                  <b>&#8377;{couponData?.amount ?? "-"}</b><p style={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 700,
                    display: "inline"
                  }}>/</p>
                  <p
                    style={{
                      color: "black",
                      fontSize: "15px",

                      fontWeight: 700,
                      display: "inline"
                    }}
                  >
                    <b>{couponData?.period ?? ""}</b>
                  </p>
                </p>

                <p
                  style={{
                    color: "#A9A9B1",
                    fontSize: "12px",
                    marginLeft: "14px",
                    marginRight: "12px",
                    marginTop: "10px",
                    wordSpacing: "5px"
                  }}
                >
                  <b>{couponData?.description ?? "-"}</b>
                </p>
                <p
                  style={{
                    color: "#707070",
                    fontSize: "15px",
                    marginLeft: "15px",
                    marginTop:"20px"
                  }}
                >

                  <ul style={{ padding: "0px" }}>
                    {couponData.feature_offering}
                    {/* {couponData?.feature_offering.map((item, index1) => (
                      <li className="li" key={index1}><span style={{ marginRight: "10px" }}><IoIosCheckmarkCircleOutline /></span>{item}</li>
                    ))} */}
                  </ul>


                </p>
                
                <div className="sub_bottom">
                <p className="left1-entry1">
                  <small>Tax regime</small>
                  <br />
                  {couponData?.tax_regime ?? "0"}%  {couponData?.selectedOption ?? '-'}
                </p>
                <p className="right1-entry1">
                  <small>Total amount</small>
                  <br />
                  <span style={{ fontSize: "16px" }}>&#8377;{couponData?.total ?? "0"}</span>
                </p>
                  </div>
                
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default Subscription;