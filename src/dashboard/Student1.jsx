/* eslint-disable */
import './Student.css'
import SideNav from './SideNav'
import React, { useState, useEffect } from "react";
import { blockOrUnblockUser, getAllParents, getGraphDataRole } from "../API/apis.js";


import { Table, Tag, Space} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faEdit,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import ModalUpdateUserID from './ModalUpdateUserID'
import { enqueueSnackbar } from 'notistack'
import Head from './Head'
import SubscriptionStastic from './ComponentsCommon/SubscriptionStastic'
import BScreenTimeChart from './BillingScreenTime'
import ScreenTimeChart from './screentime';
const { Column } = Table;

const Student1 = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [activeButton, setActiveButton] = useState("Active");
  const [searchItem, setSearchItem] = useState('')
  const [graphValue, setGraphValue] = useState()

  useEffect(()=>{
   let dataPoint = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
   getGraphDataRole('parent')
       .then((data)=>{
         const orderedData = dataPoint.map(day => ({
           day,
           value: data[day] || 0, // Set the value from the API response, or default to 0
         }));
 
         const graphValue = orderedData.map((val)=>val.value)
         setGraphValue(graphValue)
       })
       .catch((error)=>{
         console.log('Error Fetching Graph Data:', error)
       })
  },[])
  
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    if (activeButton === 'Active') {
      const filteredItems = allData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserData(filteredItems);
    }
    else if (activeButton === 'Inactive') {
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
    if(buttonText==="Active"){
      setUserData(allData)
    }
    else if(buttonText==="Inactive"){
      setUserData(activeData)
    }
    else{
      setUserData(InactiveData)
    }
    setActiveButton(buttonText);
  };
  const [bool, setbool] = useState(false)

   const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };
  const handleBlock = async (record) => {
    // Handle the block action here
    console.log(record._id)
    try{
      const response = await blockOrUnblockUser(record._id, 'parent')
      setbool(!bool)

      if(response.blocked){
        enqueueSnackbar(`User Blocked Successfully`, { variant: 'success' })
        
      }else{
        enqueueSnackbar(`User UnBlocked Successfully`, { variant: 'success' }) 

      }
    }catch(error){
      enqueueSnackbar(`Network Error`, { variant: 'error' })

    }
  };

  const handleSuspend = async (record) => {
    try{
      
      const response = await blockOrUnblockUser(record._id, 'parent')
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

  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [user, setUser] = useState({
    user_id:'',
    _id:'',
    role:'parent'

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
  const date = new Date().toJSON();
  useEffect(() => {
    getAllParents()
      .then((data) => {
        setUserData(data);
        // console.log(data)
        const act = data.filter((data) => data.subscription && date< data.subscription_expiry && !data.blocked)
        const inact = data.filter((data) => !data.subscription || date> data.subscription_expiry || data.blocked)
        setallData(data);
        setactiveData(act);
        setInactiveData(inact);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
  }, [showModalUpdate,bool]);

  return (
    <div className="AMS-1 screen">
    <SideNav xyz={'parent'}/>
    <div className="main-container" >
      <Head pageName="Parent"/>
      <div className="main">
    <div className='head-main'>
      <div className="overlap-group-wrapper-190">
      <div style={{ padding:'20px' }} className="outer-group-2 b-radius1">
      <ScreenTimeChart activeData={graphValue} />
        </div>
      </div>
      <SubscriptionStastic total={allData.length} active={activeData.length} expired={InactiveData.length} />
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
    <div className="itachi-wrapper table-wrapper">
        <Table rowSelection={rowSelection} dataSource={userData}>
          <Column title="User ID" dataIndex="user_id" key="user_id" />
          <Column title="Name" dataIndex="username" key="username" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="phone" key="phone" />
          <Column
            title="Subscription Status"
            dataIndex="subscription"
            key="subscription"
            render={(subscriptionStatus, record) => {
              return (
              <Tag 
              color={subscriptionStatus === true && record.blocked === false && date< record.subscription_expiry ? "green" : "red"}>
                {subscriptionStatus && record.blocked === false && date< record.subscription_expiry ?'Active':'InActive'}</Tag>
            )}}
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
                <div>{record.blocked ===true? 'Un Block':'Block'}</div>

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
                  <div>{record.blocked ===true? 'Un Suspend':'Suspend'}</div>

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

export default Student1
