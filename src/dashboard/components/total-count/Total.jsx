import React, { useState, useEffect } from "react";
import "./total.css";
import "../../css/style.css";
import { getAllParents,getAllStudents,getAllTeachers,getAllmanagement } from "../../../API/apis.js";

export default function Total() {
  const [management, setManagement] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [students, setStudents] = useState(0);
  const [parents, setParents] = useState(0);
//dmd sjj
  useEffect(() => {
    // Fetch data for Total Management
    getAllmanagement()
      .then((data) => {
        setManagement(data.length); // Set the length of the response data in state
      })
      .catch((error) => {
        console.error("Error fetching management data:", error);
      });

    // Fetch data for Total Teacher
    getAllTeachers()
      .then((data) => {
        setTeachers(data.length); // Set the length of the response data in state
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });

    // Fetch data for Total Student
    getAllStudents()
      .then((data) => {
        setStudents(data.length); // Set the length of the response data in state
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });

    // Fetch data for Total Parent
    getAllParents()
      .then((data) => {
        setParents(data.length); // Set the length of the response data in state
      })
      .catch((error) => {
        console.error("Error fetching parent data:", error);
      });
  }, []);
  return (
    <div className="middle-wrapper-total">
      <div className="dashboard">
          <div className="rectangle b-radius1">
            <div className="group">
              <div className="text-wrapper-8">Total Management</div>
              <div className="text-wrapper-9">{management}</div>
              <div className="small-text">10% increase in last 28 days</div>
            </div>
          </div>
          <div className="rectangle-2 b-radius1">
            <div className="group">
              <div className="text-wrapper-8">Total Teacher</div>
              <div className="text-wrapper-9">{teachers}</div>
              <div className="small-text">10% increase in last 28 days</div>
            </div>
          </div>
          <div className="rectangle-3 b-radius1">
            <div className="group">
              <div className="text-wrapper-8">Total Student</div>
              <div className="text-wrapper-9">{students}</div>
              <div className="small-text">10% increase in last 28 days</div>
            </div>
          </div>
          <div className="rectangle-4 b-radius1">
            <div className="group">
              <div className="text-wrapper-8">Total Parent</div>
              <div className="text-wrapper-9">{parents}</div>
              <div className="small-text">10% increase in last 28 days</div>
            </div>
      </div>
        </div>
    </div>
  );
}
