import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
display: flex;
color: #707070;
justify-content: space-between;
align-items: center;
padding: 12px 17px;
list-style: none;
width: 100%;
text-decoration: none;
font-size: 14px;

  &:hover {
    // background: #4F78FE;
    cursor: pointer;
    // border-radius:15px;
    color:#4F78FE
  }
  &.active {
    background: #4F78FE;
    cursor: pointer;
    border-radius: 10px;
    color: white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: .7vw;
`;

const DropdownLink = styled(Link)`
display: flex;
color: #707070;
// justify-content: space-between;
align-items: center;
padding: 21px 17px;
padding-left:40px;
list-style: none;
width: 100%;
text-decoration: none;
font-size: 14px;


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