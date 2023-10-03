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
import { getAllPlatformUsers } from "../../../API/apis.js";

const { Column } = Table;

export default function MyTable() {
  // Define state variables for label text and active status
  const [activeButton, setActiveButton] = useState("Active");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    getAllPlatformUsers()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  // Function to handle button clicks and update the active button
  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleBlock = (record) => {
    // Handle the block action here
    console.log(`Block users with IDs: ${selectedRowKeys}`);
  };

  const handleSuspend = (record) => {
    // Handle the suspend action here
    console.log(`Suspend users with IDs: ${selectedRowKeys}`);
  };

  const handleEdit = (record) => {
    // Handle the edit action here
    console.log(`Edit user with ID: ${record.userid}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <h2 className="headd">Subuscription</h2>
      <div className="filter-style">
        <button
          className={
            activeButton === "Active" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Active")}
        >
          All {`(2.5 lakh)`}
        </button>
        <button
          className={
            activeButton === "Inactive" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Inactive")}
        >
          Active (2 lakh)
        </button>
        <button
          className={
            activeButton === "Other" ? "active-button" : "inactive-button"
          }
          onClick={() => handleButtonClick("Other")}
        >
          Inactive (50,000)
        </button>
        <div className="input-container">
          <i className="fa fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search User"
            className="input-field"
          />
        </div>
      </div>
      <div className="table-wrapper">
        <Table rowSelection={rowSelection} dataSource={userData}>
          <Column title="User ID" dataIndex="user_Id" key="user_Id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Mobile" dataIndex="phone" key="phone" />
          <Column
            title="Subscription Status"
            dataIndex="subscriptionStatus"
            key="subscriptionStatus"
            render={(subscriptionStatus) => (
              <Tag color={subscriptionStatus === "Active" ? "green" : "red"}>{subscriptionStatus}</Tag>
            )}
          />
          <Column
            title="Subscription Expiry"
            dataIndex="subscriptionExpiry"
            key="subscriptionExpiry"
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
    </>
  );
}
