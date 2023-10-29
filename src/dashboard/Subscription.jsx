import React, { useState, useEffect } from "react";
import "./css/subscription1.css";
import { Card, Col, Row } from "react-bootstrap";
import SubscriptionModal from "./SubscriptionModal";
import SubscriptionModalUpdate from './SubscriptionModalUpdate'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { getSubscriptions} from "../API/apis.js";
import Head from "./Head";
import SideNav from "./SideNav";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Subscription = () => {
  const [allActive, setAllActive] = useState(true);
  const [Active, setActive] = useState(false);
  const [Expired, setExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [searchItem, setSearchItem] = useState('')
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const dataHandler = (submitData) => {
    const updatedArray = [submitData,...data];
    setallData(updatedArray)
    setData(updatedArray);
  };

  

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    if (allActive) {
      const filteredItems = allData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
    else if (Active){
      const filteredItems = activeData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
    else {
      const filteredItems = InactiveData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }

  }
  const toggleButton = (button) => {
    if (button === "All") {
      setData(allData)
    }
    else if (button === "Active") {
      setData(activeData)
      
    }
    else {
      setData(InactiveData)
      
    }
    setAllActive(button === "All");
    setActive(button === "Active");
    setExpired(button === "Expired");
  };

  const handleCardClick = (index) => {
    if (index === activeCardIndex) {
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

  useEffect(() => {
    
    getSubscriptions()
      .then((data) => {
        setallData(data)
        const act = data.filter((data) => ((!data.blocked)))
        const inact = data.filter((data) => ((data.blocked)))
        setactiveData(act)
        setInactiveData(inact)
        if (allActive) {
          setData(data);
        }
        else if (Active){
          setData(act);
        }
        else {
          setData(inact);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [showModalUpdate]);
  return (

    <div className="screen">
      <SideNav xyz={"subscription"} />
      <div style={{ width: "85%", padding: "24px 45px" }}>
      <Head pageName='Subscription' />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="card-top">
        <div
          className={`card1-wrap1-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text1-wrapper1-13">All {allData.length}</div>
        </div>
        <div
          className={`card1-wrap1-4 ${Active ? "active" : ""}`}
          onClick={() => toggleButton("Active")}
        >
          <div className="text1-wrapper1-13">Active {activeData.length}</div>
        </div>
        <div
          className={`card1-wrap1-4 ${Expired ? "active" : ""}`}
          onClick={() => toggleButton("Expired")}
        >
          <div className="text1-wrapper1-13">Expired {InactiveData.length}</div>
        </div>
      </div>
      <div className="input1-wrapper">
        <input type="text" className="input-field" placeholder="Search Subscription" value={searchItem}
          onChange={handleInputChange}/>
      </div>
      </div>

      <Row className="coupon-card">
        <Col >
          <Card className="subscription1-card1-create1">
            <button className="button" onClick={(e) => setShowModal(true)}>
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
          data?.map((couponData, index) => {
            const features = JSON.parse(couponData?.feature_offering)
          return (
            <Col key={index} className="coupon1-items1" >

              <Card
                key={index}
                className={`subscription1-card1 ${activeCardIndex === index ? "active" : "" }`}
                  style={{position:'relative', padding:'25px'}}
                  onMouseEnter={() => handleCardClick(index)}
                  onMouseLeave={handleCardClick}
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
                    <div className="subscription-menu">
                      <div className="dot-menu"> <MoreVertIcon /> </div>
                      <div className="menu-list">
                        <span  onClick={()=>handleOpenUpdate(index, couponData?._id)}>Update</span>
                        <span  onClick={()=>handleOpenUpdate(index, couponData?._id)}>Delete</span>
                      </div>
                    </div>
                </div>
                  
                  {showModalUpdate[index] && showModalUpdate?
                  <SubscriptionModalUpdate 
                  showModalUpdate={showModalUpdate}
                  setShowModalUpdate={setShowModalUpdate}
                  dataHandler={dataHandler}
                  index={couponData._id}
                  
                  />
                  :null}

              <div className="sub-details">
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    textTransform:'capitalize'
                  }}
                >
                  <b>{couponData?.name ?? "-"}</b>
                </p>

                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    marginTop: "13px",
                    color:'black'
                  }}
                >
                  &#8377;{couponData?.amount ?? "-"}
                  
                  <p
                    style={{
                      fontSize: "15px",
                      textTransform:'capitalize',
                      display: "inline",
                      color:'#707070',
                      textTransform:'lowercase'
              
                    }}
                  >
                    /{couponData?.period ?? ""}
                  </p>
                </p>

                <p
                  style={{
                    color: "#A9A9B1",
                    fontSize: "12px",
                    marginRight: "12px",
                    marginTop: "10px",
                    wordSpacing: "5px",
                    textTransform:'capitalize',
                    lineHeight: '1.5',
                  }}
                >
                  {couponData?.description ?? "-"}
                </p>
                <div
                  style={{
                    color: "#707070",
                    fontSize: "15px",
                    marginTop:"20px"
                  }}
                >

                  <ul style={{ padding: "0px", textTransform:'capitalize' }}>
                    {features.map((item, index1) => {
                    return (
                      <li className="li" key={index1}><span style={{ marginRight: "10px", verticalAlign:'middle' }}><IoIosCheckmarkCircleOutline /></span>{item}</li>
                    )})}
                  </ul>


                </div>
                </div>
                <div className="sub_bottom">
                <p className="left-entry">
                  <small>Tax regime</small>
                  <br />
                  {couponData?.tax_regime ?? "0"}%  {couponData?.tax_excluded ?? '-'}
                </p>
                <p className="right-entry">
                  <small>Total amount</small>
                  <br />
                  <span style={{ fontSize: "16px" }}>&#8377;{couponData?.total ?? "0"}</span>
                </p>
                  </div>
                
              </Card>
            </Col>
          )})}
      </Row>
      </div>
    </div>
  );
};
export default Subscription;