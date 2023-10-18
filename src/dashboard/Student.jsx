import './Student.css'
import SideNav from './SideNav'
import boy from './img/rectangle-54.png'
import chart from './img/graph1.png'
import block from './img/block.png'
import suspend from './img/suspend.png'
import edit from './img/edit.png'
import search from './img/searchsymbol.png'
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { blockOrUnblockUser, getAllStudents } from "../API/apis.js";
import { Table, Tag, Space, Button, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPause,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import ModalUpdateUserID from './ModalUpdateUserID'
import { enqueueSnackbar } from 'notistack'
import Head from './Head'
import SubscriptionStastic from './ComponentsCommon/SubscriptionStastic'
import BScreenTimeChart from './BillingScreenTime'
const { Column } = Table;


const Student = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [activeButton, setActiveButton] = useState("Active");
  const [searchItem, setSearchItem] = useState('')

 
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
  const [isBlocked, setIsBlocked] = useState()
  const handleBlock = async (record) => {
    // Handle the block action here
    try{
      const response = await blockOrUnblockUser(record._id, 'student')
      if(response.blocked){
        setIsBlocked(response.blocked)
        enqueueSnackbar(`User Unblocked Successfully`, { variant: 'success' })
        
      }else{
        enqueueSnackbar(`User Blocked Successfully`, { variant: 'success' }) 

      }
    }catch(error){
      enqueueSnackbar(`Network Error`, { variant: 'error' })

    }
  };

  const handleSuspend = async (record) => {
    try{
      const response = await blockOrUnblockUser(record._id, 'student')
      if(response.blocked){
        enqueueSnackbar(`User Un-Suspended Successfully`, { variant: 'success' })
        
      }else{
        enqueueSnackbar(`User Suspended Successfully`, { variant: 'success' }) 

      }
      
    }catch(error){
      enqueueSnackbar(`Network Error`, { variant: 'error' })

    }
  };
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [user, setUser] = useState({
    user_id:'',
    _id:'',
    role:'student'

  })

  const handleEdit = (record) => {
    // Handle the edit action here
    // console.log(`Edit user with ID: ${record.user_id}`);
    setShowModalUpdate(!showModalUpdate)
    setUser({...user,user_id:record.user_id,_id:record._id })
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    
    getAllStudents()
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
    
  }, [showModalUpdate]);
  
  return (
    
    <div className="AMS-1 screen">
    <SideNav xyz={'student'}/>
    <div style={{width:'85%', padding:'25px 45px'}} >
      <Head pageName="Student"/>
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

      {showModalUpdate?
      <ModalUpdateUserID showModalUpdate={showModalUpdate}
                        setShowModalUpdate={setShowModalUpdate} user={user} />
                        :null}
      <div className="itachi-wrapper">
        <Table rowSelection={rowSelection} dataSource={userData}>
          <Column title="User ID" dataIndex="user_id" key="user_id" />
          <Column title="Name" dataIndex="username" key="username" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="phone" key="phone" />
          <Column
            title="Subscription Status"
            dataIndex="subscription"
            key="subscription"
            render={(subscriptionStatus) => (
              <Tag color={subscriptionStatus === "Active" ? "green" : "red"}>{subscriptionStatus}</Tag>
            )}
          />
          <Column
            title="Subscription Expiry"
            dataIndex="subscription_expiry"
            key="subscription_expiry"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle" className="middle">
                <div>
                  <FontAwesomeIcon
                    icon={faBan}
                    onClick={() => handleBlock(record)}
                    style={{ cursor: "pointer", color: "rgba(79, 120, 254, 1" }}
                  />
                  <div>{isBlocked ==true? 'Un Block':'Block'}</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    onClick={() => handleSuspend(record)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "white",
                      color: "rgba(79, 120, 254, 1",
                    }}
                  />
                  <div>Suspend</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(record)}
                    style={{ cursor: "pointer", color: "rgba(79, 120, 254, 1" }}
                  />
                  <div>Edit</div>
                </div>
              </Space>
            )}
          />
        </Table>
      </div>
    
    </div>
    </div>
  </div>
  </div>


  )
}

export default Student
