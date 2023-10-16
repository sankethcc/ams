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
import { blockOrUnblockUser, getAllTeachers} from "../API/apis.js";

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
const { Column } = Table;


const Teacher = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [allData, setallData] = useState([]);
  const [activeData, setactiveData] = useState([]);
  const [InactiveData, setInactiveData] = useState([]);
  const [activeButton, setActiveButton] = useState("Active");
  const [searchItem, setSearchItem] = useState('')

  useEffect(() => {
    
    getAllTeachers()
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
  const handleBlock = async (record) => {
    // Handle the block action here
    try{
      const response = await blockOrUnblockUser(record._id, 'teacher')
      console.log(response.blocked)
      if(response.blocked){
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
      const response = await blockOrUnblockUser(record._id, 'teacher')
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
    role:'teacher'

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
  return (
    <div>
       <div className="AMS-1">
      <SideNav xyz={'teacher'}/>
    <div className="div-x">
      <div className="text-wrapper-yoyo" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>Teacher
      <img src={boy} alt="" style={{transform:'scale(0.5)',top:'-3rem',position:'absolute',marginLeft:'62rem',}}/>
      
      
      </div>
      <div className="overlapping">
        <input type='text' className="text-wrapper-2x" placeholder='search' value={searchItem}
            onChange={handleInputChange} style={{border:'none',backgroundColor:'white',outline:'none'}}/>
        <img className="search-black-done" alt="Search black" src={search}/>
      </div>
      <div className="overlap-group-harsh">
        <button className="text-wrapper-3rd" onClick={() => handleButtonClick("Active")} style={{backgroundColor:'#4f78fe'}}>All {allData.length}</button>
      </div>
      <div className="text-wrapper-4th">Subscription analytics</div>
      <div className="groupism">
        <div className="active-crore-wrapper">
          <button className="text-wrapper-5th" onClick={() => handleButtonClick("Inactive")} >Active&nbsp;&nbsp;{activeData.length}</button>
        </div>
      </div>
      <div className="overlap-wrapper-rider">
        <div className="div-wrapper-rider">
          <button className="text-wrapper-5th" onClick={() => handleButtonClick("Other")}>Inactive {InactiveData.length}</button>
        </div>
      </div>
     
      <div className="overlap-group-wrapper-190">
        <div className="overlap-4890">
          <div className="frame-family">
            <div className="text-wrapper-1992">7h</div>
            <div className="text-wrapper-2000">6h</div>
            <div className="text-wrapper-2111">5h</div>
            <div className="text-wrapper-2000">4h</div>
            <div className="text-wrapper-2000">3h</div>
          </div>
          <img className="pine" alt="Line" src="line.svg" />
          <img className="pine-2" alt="Line" src="image.svg" />
          <div className="car">
            <img className="pine-3" alt="Line" src="line-2.svg" />
            <img className="pine-4" alt="Line" src="line-3.svg" />
            <img className="pine-5" alt="Line" src="line-4.svg" />
            <img className="chatting" alt="Chart" src={chart} />
          </div>
          <div className="navbar">
            <div className="graph-2">Mon</div>
            <div className="graph-3">Tue</div>
            <div className="graph-4">Wed</div>
            <div className="graph-5">Thu</div>
            <div className="graph-6">Fri</div>
            <div className="graph-7">Sat</div>
            <div className="graph-8">Sun</div>
          </div>
        </div>
      </div>
      <div className="lap-5">
        <div className="lap-6">
          <div className="bike-29">Total management</div>
          <p className="pk">10% increase in last 28 days</p>
          <div className="bike-30">50,000</div>
        </div>
        <div className="nonactive-subscription">
          Active <br />
          subscription
        </div>
        <div className="expired-people">
          Expired <br />
          Subscription
        </div>
        <div className="gold-31">95 K</div>
        <div className="gold-32">5000</div>
      </div>
      {/* <div className="itachi">
        <div className="itachi-33">User Id</div>
        <div className="itachi-34">Name</div>
        <div className="itachi-35">Subscription status:</div>
        <div className="itachi-36">Subscription expiry:</div>
        <div className="actionking">Action</div>
        <div className="rectangle-1" />
        <div className="itachi-37">SP123</div>
        <div className="itachi-38">Vikas Singh</div>
        <div className="photoframe-2">
          <div className="text-wrapper-39100">Active</div>
        </div>
        <div className="itachi-40">13/9/2023</div>
        <div className="square-2" />
        <div className="itachi-41">SP123</div>
        <div className="itachi-42">Vikas Singh</div>
        <div className="frame-367">
          <div className="text-wrapper-39100">Inactive</div>
        </div>
        <div className="itachi-43">13/9/2023</div>
        <div className="rectanglechota-3" />
        <img className="glasses" alt="Line" src="line-2-2.svg" />
        <img className="glasses-7" alt="Line" src="line-3-2.svg" />
        <img className="glasses-8" alt="Line" src="line-4-2.svg" />
      
        <div className="itachi-44">Email</div>
        <div className="itachi-45">ck3437@gmail.com</div>
        <div className="itachi-46">ck3437@gmail.com</div>
        <div className="itachi-47">Mobile</div>
        <div className="itachi-48">8989891816</div>
        <div className="itachi-49">8989891816</div>
        <div className="sp-4">
          <div className="sp-5">
            <img className="vectoradd" alt="Vector" src={block} />
            <div className="itachi-50">Block</div>
          </div>
          <div className="sp-5">
            <img className="exclamationmark" alt="Exclamation" src={suspend} />
            <div className="itachi-50">Suspend</div>
          </div>
          <div className="sp-5">
            <img className="iconic" alt="Icon pen" src={edit} />
            <div className="itachi-50">Edit</div>
          </div>
        </div>
        <div className="sp-6">
          <div className="sp-5">
            <img className="" alt="Vector" src={block} />
            <div className="itachi-50">Block</div>
          </div>
          <div className="sp-5">
            <img className="exclamationmark" alt="Exclamation" src={suspend}/>
            <div className="itachi-50">Suspend</div>
          </div>
          <div className="sp-5">
            <img className="iconic" alt="Icon pen" src={edit}/>
            <div className="itachi-50">Edit</div>
          </div>
        </div>
      </div> */}
      {showModalUpdate?
      <ModalUpdateUserID showModalUpdate={showModalUpdate}
                        setShowModalUpdate={setShowModalUpdate} user={user} />
                        :null}
      <div className="itachi">
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
                  <div>Block</div>
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
  )
}

export default Teacher
