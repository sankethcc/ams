import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./dashboard/LoginPage";
import Users from "./dashboard/Users";
import Billing from "./dashboard/Billing";
import Coupon from "./dashboard/Coupons/Coupon";
import Subscription from "./dashboard/Subscription";

import { Divider } from "antd";
import Management1 from "./dashboard/Management1";
import Student from "./dashboard/Student";
import Student1 from "./dashboard/Student1";
import Teacher from "./dashboard/Teacher";
//ekmekek
//sjnjdnjdddidn
function App() {
  return (
    
    
    <Router>
      <Routes>
       {" "}
       <Route path="/" element={<LoginPage />} />
         <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/billing" element={<Billing />} />
       <Route path="/coupon" element={<Coupon />} />
        <Route path="/subscription" element={<Subscription />} /> 
        <Route path="/management" element={<Management1/>}/>
         <Route path='/student' element={<Student/>}/> 
         <Route path="/parent" element={<Student1/>}/>
         <Route path="/teacher" element={<Teacher/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
