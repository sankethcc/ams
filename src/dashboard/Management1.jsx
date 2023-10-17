import React, { useEffect, useState } from 'react'
import boy from './img/rectangle-54.png'
import chart from './img/graph1.png'
import search from './img/searchsymbol.png'
import './Management1.css'
import SideNav from './SideNav'
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
    <div className="AMS-1">
        <SideNav xyz={'management'}/>
         
    <div className="div-x">
      <div className="text-wrapper-yoyo" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>Management
      <img src={boy} alt="" style={{transform:'scale(0.5)',top:'-3rem',position:'absolute',marginLeft:'62rem',}}/>
      
      
      </div>
      <div className="overlapping">
        <input type='text' className="text-wrapper-2x" placeholder='search' value={searchItem}
            onChange={handleInputChange} style={{border:'none',backgroundColor:'white',outline:'none'}}/>
        <img className="search-black-done" alt="Search black" src={search}/>
      </div>
      <div className="overlap-group-harsh">
        <button onClick={() => handleButtonClick("Active")}  className="text-wrapper-3rd" style={{backgroundColor:'#4f78fe'}}>All {allData.length}</button>
      </div>
      <div className="text-wrapper-4th">Subscription analytics</div>
      <div className="groupism">
        <div className="active-crore-wrapper">
          <button onClick={() => handleButtonClick("Inactive")} className="text-wrapper-5th">Active&nbsp;&nbsp;{activeData.length}</button>
        </div>
      </div>
      <div className="overlap-wrapper-rider">
        <div className="div-wrapper-rider">
          <button onClick={() => handleButtonClick("Other")} className="text-wrapper-5th">Inactive {InactiveData.length}</button>
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
      
      <div className="itachi">
        <Table rowSelection={rowSelection} dataSource={userData}>
          <Column title="User ID" dataIndex="user_id" key="user_id" />
          <Column title="Name" dataIndex="username" key="username" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="phone" key="phone" />
          <Column title="School Name" dataIndex="school_name" key="school_name" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column title="DIOS Code" dataIndex="udise_code" key="udise_code" />
                   
          <Column
            title="Document"
            key="document"
            render={(text, record) => (
              <Space size="middle" className="middle">
                <div>
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    onClick={() => handleDocument()}
                    style={{ cursor: "pointer", color: "rgba(79, 120, 254, 1" }}
                  />
                  <div>Block</div>
                </div>
              </Space>
            )}
          />
        </Table>
      </div>
    
    </div>
    
    {/* <div className="div">
      <div className="text-wrapper">Management/user name</div>
      <img className="line" alt="Line" src="line-7.svg" />
      <div className="overlap">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper-2">Invalid</div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="div-wrapper">
            <div className="text-wrapper-3">Valid</div>
          </div>
        </div>
        <div className="text-wrapper-4">DOCUMENT VIEW</div>
      </div>
      <div className="overlap-2">
        <div className="overlap-3">
          <div className="text-wrapper-5">Send code</div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-4">
            <div className="text-wrapper-6">View</div>
          </div>
        </div>
        <div className="text-wrapper-7">DIOS code</div>
        <div className="text-wrapper-8">Document</div>
        <div className="text-wrapper-9">Address</div>
        <div className="text-wrapper-10">email</div>
        <div className="text-wrapper-11">School name</div>
        <div className="text-wrapper-12">Delhi public school</div>
        <div className="text-wrapper-13">username</div>
        <div className="text-wrapper-14">SDSJAHD56S5</div>
        <div className="text-wrapper-15">doc name</div>
        <div className="text-wrapper-16">username@gmail.com</div>
        <div className="text-wrapper-17">Delhi</div>
        <div className="text-wrapper-18">User name</div>
        <div className="text-wrapper-19">Details</div>
      </div>
      
      <div className="group-17">
        <img className="rectangle" alt="Rectangle" src='/' />
        <div className="vector-wrapper">
          <img className="vector" alt="Vector" src='/' />
        </div>
      </div>
    </div> */}
  </div>
  )
}

export default Management1
