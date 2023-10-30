import React from "react";
import "./css/style.css";
import userImg from "./img/userImg.png";
import VectorImage from "./img/vector.svg";
const Head = ({pageName}) => {

  return (
    <div className="head-main">
      <div className="text-wrapper-7">{pageName}</div>
    <div className="group-11">
      <img className="profile" alt="Rectangle" src={userImg} />
      <div className="notification-wrapper">
        <img className="notification" alt="Vector" src={VectorImage} />
      </div>
    </div>
    </div>
  );
};

export default Head;
