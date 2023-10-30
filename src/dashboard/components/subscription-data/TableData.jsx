import React, { useState, useEffect } from "react";
// import 'antd/dist/antd.css';
import "./table-data.css";
import { Table, Tag, Space, Button, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faPause,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getAllPlatformUsers,blockOrUnblockUser } from "../../../API/apis.js";
import axios from 'axios'
import ModalUpdateUserID from '../../ModalUpdateUserID'
import { enqueueSnackbar } from 'notistack'

const { Column } = Table;

export default function MyTable() {
  // Define state variables for label text and active status
  const [activeButton, setActiveButton] = useState("Active");
  const [userData, setUserData] = useState([]);
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [searchItem, setSearchItem] = useState('')
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [bool, setbool] = useState(false)
  console.log(userData)
  useEffect(() => {
    // Fetch user data from the API
    getAllPlatformUsers()
      .then((data) => {
        setUserData(data);
        const act = data.filter((data) => ((data.subscription=="Active")))
        const inact = data.filter((data) => ((data.subscription=="InActive")))
        setallData(data);
        setactiveData(act);
        setInactiveData(inact);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
   
  }, [showModalUpdate,bool]);
  // Function to handle button clicks and update the active button
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };
  
  const [isBlocked, setIsBlocked] = useState()
  const [user, setUser] = useState({
    user_id:'',
    _id:'',
    role:''

  })
  const handleBlock = async(record) => {
    try{
      const response = await blockOrUnblockUser(record._id, record.role)
      setbool(!bool)
      if(response.blocked){
        setIsBlocked(response.blocked)
         
        enqueueSnackbar(`User Blocked Successfully`, { variant: 'success' })
        
      }else{
        enqueueSnackbar(`User UnBlocked Successfully`, { variant: 'success' }) 

      }
    }catch(error){
      enqueueSnackbar(`Network Error`, { variant: 'error' })
    }
  };

  const handleSuspend = async(record) => {
    try{
      const response = await blockOrUnblockUser(record._id, record.role)
      setbool(!bool)
      if(response.blocked){
        enqueueSnackbar(`User Suspended Successfully`, { variant: 'success' })
        
      }else{
        enqueueSnackbar(`User Un-Suspended Successfully`, { variant: 'success' }) 

      }
      
    }catch(error){
      enqueueSnackbar(`Network Error`, { variant: 'error' })

    }
  };
  

  const handleEdit = (record) => {
    // Handle the edit action here
    // console.log(`Edit user with ID: ${record.user_id}`);
    // console.log(record)
     setShowModalUpdate(!showModalUpdate)
    setUser({...user,user_id:record.user_id,_id:record._id,role:record.role })
    console.log(record)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
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
      <div className="table-wrapper">
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
                  <div>{record.blocked ==true? 'Un Block':'Block'}</div>
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
                  <div>{record.blocked ==true? 'Un Suspend':'Suspend'}</div>
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
    </>
  );
}
