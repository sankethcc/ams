
/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./css/style.css";
import {
  totalData,
  studentData,
  teacherData,
  parentData,
  managementData,
} from "./data.js";
import { getAllCoupons, getAllPlatformUsers, getAllStudents, getAllTeachers, getAllParents, getAllmanagement, getpending, getGraphDataRole, getGraphData } from "../API/apis";
import FilterImage from "./img/icons8-filter-96-1.png";
import ScreenTimeChart from "./screentime";
import SideNav from "./SideNav";
import Head from "./Head";
import { Box } from "@mui/material";

const Dashboard = () => {
  const [displayData, setDisplayData] = useState({
    requests: 0,
    documentVerification: 0,
    sendCode: 0,
    totalCoupons: 0,
    totalUsers: "0",
    activeUsers: "0",
    totalBilling: "0",
    activeSub: "0",
    expiredSub:"0",
    graphKey:[],
    values:[]


  });
  const [allActive, setAllActive] = useState(true);
  const [studentActive, setStudentActive] = useState(false);
  const [teacherActive, setTeacherActive] = useState(false);
  const [parentActive, setParentActive] = useState(false);
  const [managementActive, setManagementActive] = useState(false);
  const [activeButton, setActiveButton] = useState("All");
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [request, setRequest] = useState(0)
  const [activeData, setActiveData] = useState(displayData);
  const [graphData, setGraphData] = useState()
  const [graphDataValue, setGraphDataValue] = useState()
  const [activeButtonToApiFunctionMap] = useState({
    All: getAllPlatformUsers,
    Student: getAllStudents,
    Teacher: getAllTeachers,
    Parent: getAllParents,
    Management: getAllmanagement,
  });
  useEffect(() => {
    getAllCoupons()
      .then((response) => {
        const coupons = response.data;
        setTotalCoupons(coupons.length);
      })
      .catch((error) => {
        console.error("Error fetching total coupons:", error);
      });
  }, []);

  useEffect(() => {
    if (activeButtonToApiFunctionMap[activeButton]) {
      activeButtonToApiFunctionMap[activeButton]()
        .then((response) => {
          const users = response;
          // setAllUsersCount(users.length);
          // document_verification_code
          const date = new Date().toJSON().slice(0, 10);
            setDisplayData(
              {
              ...displayData,
              requests: request,
              documentVerification: users.filter(user=> user.is_document_verified === false).length,
              sendCode: users.filter(user=> user.document_verification_code).length,
              totalCoupons: totalCoupons,
              totalUsers: users.length,
              activeUsers: users.filter(user => (user.subscription && date< user.subscription_expiry && !user.blocked)).length,
              totalBilling: "0",
              activeSub: users.filter(user => (user.subscription && date< user.subscription_expiry && !user.blocked)).length,
              expiredSub:users.filter(user=> !user.subscription || date> user.subscription_expiry || user.blocked).length,
              graphKey:graphData,
              values:graphDataValue
            }
  
              )
        })
        .catch((error) => {
          console.error(`Error fetching total ${activeButton.toLowerCase()}s:`, error);
        });
    }
    getpending()
      .then((data) => {
        // console.log(data)
        setRequest(data.length)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
      
    
  }, [activeButton, activeButtonToApiFunctionMap]);
  useEffect(()=>{
    let dataPoint = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    if(activeButton === 'All'){
      getGraphData()
      .then((data)=>{
        const orderedData = dataPoint.map(day => ({
          day,
          value: data[day] || 0, // Set the value from the API response, or default to 0
        }));

        const graphValue = orderedData.map((val)=>val.value)
        setGraphDataValue(graphValue)
      })
      .catch((error)=>{
        console.log('Error Fetching Graph Data:', error)
      })

    }else{
      getGraphDataRole(activeButton.toLowerCase())
      .then((data)=>{
        const orderedData = dataPoint.map(day => ({
          day,
          value: data[day] || 0, // Set the value from the API response, or default to 0
        }));

        const graphValue = orderedData.map((val)=>val.value)
        setGraphDataValue(graphValue)
      })
      .catch((error)=>{
        console.log('Error Fetching Graph Data:', error)
      })
    }
  },[activeButton])
  // useEffect(()=>{
  //   getGraphDataRole(activeButton.toLowerCase())
  //   .then((data)=>{
  //     const key = Object.keys(data)
  //     const values = Object.values(data)
  //     setGraphData(key)
  //     setGraphDataValue(values)
  //   })
  //   .catch((error)=>{
  //     console.log('Error Fetching Graph Data:', error)
  //   })
    
  // }, [activeButtonToApiFunctionMap, activeButton])
  const toggleButton = (button) => {
    setActiveButton(button);
    setAllActive(button === "All");
    setStudentActive(button === "Student");
    setTeacherActive(button === "Teacher");
    setParentActive(button === "Parent");
    setManagementActive(button === "Management");
    
  };


  useEffect(() => {
    const getData = () => {
      switch (activeButton) {
        case "All":
          return displayData;
        case "Student":
          return displayData;
        case "Teacher":
          return displayData;
        case "Parent":
          return displayData;
        case "Management":
          return displayData;
        default:
          return displayData;
      }
    };

    setActiveData(getData());
  }, [activeButton]);


  return (
    <div className="screen">
      <SideNav xyz={"Dashboard"} />
      <div className="main-container">
      <Head pageName='Dashboard' />
      <div className="middle">


      <div className="middle-wrapper">
      <div className="dashboard">
          <div className="rectangle b-radius1">
            <div className="group ">
              <div className="font-main2">Total users</div>
              <div className="font-main1">{displayData.totalUsers}</div>
            </div>
        </div>
          <div className="rectangle-2 b-radius1">
            <div className="group">
              <div className="font-main2">Active user</div>
              <div className="font-main1">{displayData.activeUsers}</div>
          </div>
        </div>
          <div className="rectangle-3 b-radius1">
            <div className="group">
              <div className="font-main2">Total billing</div>
              <div className="font-main1">{displayData.totalBilling}</div>
          </div>
        </div>
      </div>
      <div className="dashboard-wrap-3 ">
        <div
          className={`dashboard-wrap-4 b-radius2 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text-wrapper-13">All</div>
        </div>
        <div
          className={`dashboard-wrap-4 b-radius2 ${studentActive ? "active" : ""}`}
          onClick={() => toggleButton("Student")}
        >
          <div className="text-wrapper-13">Student</div>
        </div>
        <div
          className={`dashboard-wrap-4 b-radius2 ${teacherActive ? "active" : ""}`}
          onClick={() => toggleButton("Teacher")}
        >
          <div className="text-wrapper-13">Teacher</div>
        </div>
        <div
          className={`dashboard-wrap-4 b-radius2 ${parentActive ? "active" : ""}`}
          onClick={() => toggleButton("Parent")}
        >
          <div className="text-wrapper-13">Parent</div>
        </div>
        <div
          className={`dashboard-wrap-4 b-radius2 ${managementActive ? "active" : ""}`}
          onClick={() => toggleButton("Management")}
        >
          <div className="text-wrapper-13">Management</div>
        </div>
        <div className="filter-wrapper b-radius2">
          <img className="filter" alt="Filter" src={FilterImage} />
        </div>
      </div>
      <div className="outer-group-wrapper">
        <div className="outer-group-2 b-radius1">
          <ScreenTimeChart activeData={graphDataValue} />
        </div>
       <div className="outer-6 b-radius1">
        <div className="font-main2">Total users</div>
        <div className="font-main1">{displayData.totalUsers}</div>
        <div className="outer-7 b-radius1">
          <div className="font-main2">Total billing</div>
          <div className="font-main1">{displayData.totalBilling}</div>
        </div>
        <div className="bottom">
          <div className="active-subscription">
            <div className="heading">
              {" "}
              Active <br />
              Subscription
            </div>
            <div className="text-wrapper-33">{displayData.activeSub}</div>
          </div>
          <div className="expired-subscription">
            <div className="heading">
              {" "}
              Expired <br />
              Subscription
            </div>
            <div className="text-wrapper-34">{displayData.expiredSub}</div>
          </div>
        </div>
      </div>
      </div>

      </div>


      <div className="right-wrapper ">
      <div className="outer b-radius1">
        <div className="text-wrapper-3">Verification request</div>{" "}
        <div className="text-wrapper-5">{request}*</div>
        <p className="p">
          The requests should be completed under 24 hours
        </p>{" "}
        <div className="bartext-wrapper-4">See more</div>
        <div className="bars">
          <div className="bar-wrap b-radius2">
            <div className="bartext-wrapper">Document verification needed</div>
            <div className="bartext-wrapper-2">
              {displayData.documentVerification}
            </div>
          </div>
          <div className="bar-wrap b-radius2">
            <div className="bartext-wrapper">Send code</div>
            <div className="bartext-wrapper-2">{displayData.sendCode}</div>
          </div>
        </div>
      </div>
      <div className="outer-3 b-radius1">
        <div className="text-wrapper-3">Total Coupons</div>
        <div className="dash-text-wrapper-6">{totalCoupons}</div>
      </div>
      </div>
      </div>



      </div>
    </div>
  );
};

export default Dashboard;
