import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #707070;
  justify-content: space-between;
  align-items: center;
  padding: 2vh;
  list-style: none;
  height: 3.4vh;
  width: 9vw;  
margin:1px 2vw 0;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background: #4F78FE;
    cursor: pointer;
    border-radius:15px;
    color:white;
  }
  &.active {
    background: #4F78FE;
    cursor: pointer;
    border-radius: 15px;
    color: white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: .7vw;
`;

const DropdownLink = styled(Link)`
  height: 7vh;
  margin-left: 4vw;
  padding:0 1vh 0;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #707070;
  font-size: 14px;
  width: 7vw;
// margin:10px;


&.active {
  color:#4F78FE;
}
&:hover {
  color:#4F78FE;
}
`;
const SubMenu = ({ item, active }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={active ? 'active' : ''} // Apply active class if active prop is true
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.name}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.name}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};
export default SubMenu;