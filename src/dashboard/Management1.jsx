import React, { useEffect, useState } from 'react'
import boy from './img/rectangle-54.png'
import chart from './img/graph1.png'
import search from './img/searchsymbol.png'
import './Management1.css'
import SideNav from './SideNav'
import './components/subscription-data/table-data.css'
import { getAllmanagement } from '../API/apis';
import { Table, Tag, Space, Button, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPause,
  faEdit,
  faExclamationCircle,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import Head from './Head'
import SubscriptionStastic from './ComponentsCommon/SubscriptionStastic'
import BScreenTimeChart from './BillingScreenTime'
const { Column } = Table;
const Management1 = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [activeButton, setActiveButton] = useState("Active");
  const [searchItem, setSearchItem] = useState('')

  useEffect(() => {
    
    getAllmanagement()
      .then((data) => {
        setUserData(data);
        // console.log(data)
        const act = data.filter((data) => ((data.subscription=="Active")))
        const inact = data.filter((data) => ((data.subscription=="InActive")))
        setallData(data);
        setactiveData(act);
        setInactiveData(inact);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
  }, []);
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    console.log(activeButton)

    if (activeButton == 'Active') {
      const filteredItems = allData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserData(filteredItems);
    }
    else if (activeButton == 'Inactive') {
      const filteredItems = activeData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserData(filteredItems);
    }
    else {
      const filteredItems = InactiveData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserData(filteredItems);
    }
  }
  const handleButtonClick = (buttonText) => {
    if(buttonText=="Active"){
      setUserData(allData)
    }
    else if(buttonText=="Inactive"){
      setUserData(activeData)
    }
    else{
      setUserData(InactiveData)
    }
    setActiveButton(buttonText);
  };

   const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };
  

  const [showDocument, setShowDocument] = useState(false)
  const handleDocument = () => {
    // Handle the edit action here
    // console.log(`Edit user with ID: ${record.userid}`);
    setShowDocument(!showDocument)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className="AMS-1 screen">
        <SideNav xyz={'management'}/>
        <div style={{width:'85%', padding:'25px 45px'}} >
      <Head pageName="Management"/>
    <div className="main">
    <div className='head-main'>
      <div className="overlap-group-wrapper-190">
      <div style={{ padding:'20px' }} className="outer-group-2 b-radius1">
              <BScreenTimeChart />
        </div>
      </div>
        <SubscriptionStastic />
      </div>


      <div style={{paddingBottom:'20px'}}>
      <h2 className="headd" style={{paddingBottom:'20px'}}>Subuscription</h2>
      <div className="filter-style">
        <div className="filter-buttons">

        <button
          className={
            activeButton === "Active" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Active")}
        >
          All {allData.length}
        </button>
        <button
          className={
            activeButton === "Inactive" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Inactive")}
        >
          Active {activeData.length}
        </button>
        <button
          className={
            activeButton === "Other" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Other")}
        >
          Inactive {InactiveData.length}
        </button>
        </div>
        <div className="input-container">
          <i className="fa fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search User"
            className="input-field"
            value={searchItem}
            onChange={handleInputChange}
          />
        </div>
      </div>
      </div>
     
      
      <div className="itachi-wrapper">
        <Table rowSelection={rowSelection} dataSource={userData}>
          <Column title="User ID" dataIndex="user_id" key="user_id" />
          <Column title="Name" dataIndex="username" key="username" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="phone" key="phone" />
          <Column title="School Name" dataIndex="schoolname" key="schoolname" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column title="DIOS Code" dataIndex="diosCode" key="diosCode" />
                   
          <Column
            title="Document"
            key="document"
            render={(text, record) => (
              <Space size="middle" className="">
                <Link to={`/management/${record._id}`} style={{display:'flex', gap:'10px', cursor:'pointer' }} onClick={() => handleDocument()}> 
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{ cursor: "pointer", color: '#707070', fontSize:'20px' }}
                  >
                    
                  </FontAwesomeIcon>
                  <span style={{fontSize:'15px', color:'#707070'}}>DOC</span>
                </Link>
              </Space>
            )}
          />
        </Table>
      </div>
    
    </div>
    
    
  </div>
  </div>
  )
}

export default Management1
