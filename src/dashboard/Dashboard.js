
import React, { useState, useEffect } from "react";
import "./css/style.css";
import {
  totalData,
  studentData,
  teacherData,
  parentData,
  managementData,
} from "./data.js";
import { getAllCoupons, getAllPlatformUsers, getAllStudents, getAllTeachers, getAllParents, getAllmanagement } from "../API/apis";
import FilterImage from "./img/icons8-filter-96-1.png";
import ScreenTimeChart from "./screentime";
import SideNav from "./SideNav";
import Head from "./Head";

const Dashboard = () => {
  const [allActive, setAllActive] = useState(true);
  const [studentActive, setStudentActive] = useState(false);
  const [teacherActive, setTeacherActive] = useState(false);
  const [parentActive, setParentActive] = useState(false);
  const [managementActive, setManagementActive] = useState(false);
  const [activeButton, setActiveButton] = useState("All");
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [activeData, setActiveData] = useState(totalData);
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
          console.log(`${activeButton} users:`, users);
          setAllUsersCount(users.length);
        })
        .catch((error) => {
          console.error(`Error fetching total ${activeButton.toLowerCase()}s:`, error);
        });
    }
  }, [activeButton, activeButtonToApiFunctionMap]);

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
          return totalData;
        case "Student":
          return studentData;
        case "Teacher":
          return teacherData;
        case "Parent":
          return parentData;
        case "Management":
          return managementData;
        default:
          return totalData;
      }
    };

    setActiveData(getData());
  }, [activeButton]);

  console.log("allUsersCount:", allUsersCount);

  return (
    <div className="screen">
      <SideNav xyz={"Dashboard"} />
      <Head />
      <div className="outer">
        <div className="text-wrapper-3">Verification request</div>{" "}
        <div className="text-wrapper-5">{activeData.requests}*</div>
        <p className="p">
          The requests should be completed under 24 hours
        </p>{" "}
        <div className="bartext-wrapper-4">See more</div>
        <div className="bars">
          <div className="bar-wrap">
            <div className="bartext-wrapper">Document verification needed</div>
            <div className="bartext-wrapper-2">
              {activeData.documentVerification}
            </div>
          </div>
          <div className="bar-wrap">
            <div className="bartext-wrapper">Send code</div>
            <div className="bartext-wrapper-2">{activeData.sendCode}</div>
          </div>
        </div>
      </div>
      <div className="outer-3">
        <div className="text-wrapper-3">Total Coupons</div>
        <div className="dash-text-wrapper-6">{totalCoupons}</div>
      </div>
      <div className="text-wrapper-7">Dashboard</div>
      <div className="dashboard">
        <div className="dashboard-wrap-2">
          <div className="rectangle">
            <div className="group">
              <div className="text-wrapper-8">Total users</div>
              <div className="text-wrapper-9">{allUsersCount}</div>
            </div>
          </div>
        </div>
        <div className="dashboard-wrap-2">
          <div className="rectangle-2">
            <div className="group">
              <div className="text-wrapper-8">Active user</div>
              <div className="text-wrapper-9">{activeData.activeUsers}</div>
            </div>
          </div>
        </div>
        <div className="dashboard-wrap-2">
          <div className="rectangle-3">
            <div className="group">
              <div className="text-wrapper-8">Total billing</div>
              <div className="text-wrapper-9">{activeData.totalBilling}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-wrap-3">
        <div
          className={`dashboard-wrap-4 ${allActive ? "active" : ""}`}
          onClick={() => toggleButton("All")}
        >
          <div className="text-wrapper-13">All</div>
        </div>
        <div
          className={`dashboard-wrap-4 ${studentActive ? "active" : ""}`}
          onClick={() => toggleButton("Student")}
        >
          <div className="text-wrapper-13">Student</div>
        </div>
        <div
          className={`dashboard-wrap-4 ${teacherActive ? "active" : ""}`}
          onClick={() => toggleButton("Teacher")}
        >
          <div className="text-wrapper-13">Teacher</div>
        </div>
        <div
          className={`dashboard-wrap-4 ${parentActive ? "active" : ""}`}
          onClick={() => toggleButton("Parent")}
        >
          <div className="text-wrapper-13">Parent</div>
        </div>
        <div
          className={`dashboard-wrap-4 ${managementActive ? "active" : ""}`}
          onClick={() => toggleButton("Management")}
        >
          <div className="text-wrapper-13">Management</div>
        </div>
        <div className="filter-wrapper">
          <img className="filter" alt="Filter" src={FilterImage} />
        </div>
      </div>
      <div className="outer-group-wrapper">
        <div className="outer-group-2">
          <ScreenTimeChart activeData={activeData} />
        </div>
      </div>
      <div className="outer-6">
        <div className="text-wrapper-31">Total users</div>
        <div className="text-wrapper-32">{allUsersCount}</div>
        <div className="outer-7">
          <div className="text-wrapper-29">Total billing</div>
          <div className="text-wrapper-30">{activeData.totalBilling}</div>
        </div>
        <div className="bottom">
          <div className="active-subscription">
            <div className="heading">
              {" "}
              Active <br />
              Subscription
            </div>
            <div className="text-wrapper-33">{activeData.activeSub}</div>
          </div>
          <div className="expired-subscription">
            <div className="heading">
              {" "}
              Expired <br />
              Subscription
            </div>
            <div className="text-wrapper-34">{activeData.expiredSub}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
