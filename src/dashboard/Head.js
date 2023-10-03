import React, { useState, useEffect } from "react";
import "./css/style.css";
import RectangleImage from "./img/rectangle-54.png";
import VectorImage from "./img/vector.svg";
const Head = () => {

  return (
    <div className="group-11">
      <img className="profile" alt="Rectangle" src={RectangleImage} />
      <div className="notification-wrapper">
        <img className="notification" alt="Vector" src={VectorImage} />
      </div>
    </div>
  );
};

export default Head;
