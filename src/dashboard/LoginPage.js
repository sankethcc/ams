import React, { useState } from "react";
import "./css/login.css";
import { dummyUserData } from "./data"; // Import your user data
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Move useNavigate outside of handleLogin

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const user = dummyUserData.find((userData) => userData.email === email);

    if (!user || user.password !== password) {
      alert("Please enter correct email and password");
      return;
    }

    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      alert("Please enter correct email and password");
    }
  };

  return (
    <div className="screen">
      <div className="left"></div>
      <div className="box">
        <div className="main-title">Hello Again!</div>
        <p className="text">Welcome back, you've been missed</p>
        <div className="inputs">
          <input
            className="box2"
            placeholder="Enter User Name"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="box2"
            placeholder="Password"
            type="password" // Use type="password" for password input
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="forgot">Forgot Password?</div>
        </div>
        <button className="login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
