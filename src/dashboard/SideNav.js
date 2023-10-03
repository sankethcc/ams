import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LOGO from "./img/logo1.png";
import "./css/usersidebar.css";
import {
  FaUser,
  FaUserTie,
  FaUserEdit,
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaRegCreditCard,
} from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { HiUserGroup, HiUsers } from "react-icons/hi2";
import SubMenu from "./SubMenu";
import * as RiIcons from "react-icons/ri";

const SidebarNav = styled.nav`
  background-color: white;
  width: 250px;
  height: 100vh;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SideNav = ({ xyz }) => {
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <BiSolidDashboard />,
      active: xyz === "Dashboard"? true : false,
    },
    {
      name: "Users",          
      path: "/users",
      icon: <FaUser />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      active: xyz === "users"? true : false,
      subNav: [
        {
          path: "/management",
          name: "Management",
          icon: <FaUserTie />,
          active: xyz === "management"? true : false,

        },
        {
          path: "/student",
          name: "Student",
          icon: <HiUserGroup />,
          active: xyz === "student"? true : false,

        },
        {
          path: "/parent",
          name: "Parent",
          icon: <HiUsers />,
          active: xyz === "parent"? true : false,

        },
        {
          path: "/teacher",
          name: "Teacher",
          icon: <FaUserEdit />,
          active: xyz === "teacher"? true : false,

        },
      ],
    },
    {
      path: "/subscription",
      name: "Subscription",
      icon: <FaFileInvoiceDollar />,
      active:xyz==="subscription"?true: false, 
    },
    {
      path: "/coupon",
      name: "Coupon",
      icon: <FaMoneyBill />,
      active:xyz==="coupon"?true: false, 
    },
    {
      path: "/billing",
      name: "Billing",
      icon: <FaRegCreditCard />,
      active:xyz==="billing"?true: false, 
    },
  ];
  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <SidebarNav sidebar={sidebar}>
        <div className="top_section">
          <img alt="SP" src={LOGO} className="logo_icon" />
          <h1 className="logo">School</h1>
          <h1 className="logo_pen">Pen</h1>
        </div>

        <SidebarWrap>
          {menuItem.map((item, index) => {
            return <SubMenu item={item} key={index} active={item.active} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default SideNav;
