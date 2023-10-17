import React,{useEffect, useState} from 'react'
import './Management1.css'
import SideNav from './SideNav'
import { useParams } from 'react-router-dom'
import { getManagement } from '../API/apis';

const ManagementDocument = () => {
  const {doc_id} = useParams()
  // console.log(doc_id)
  const [data, setdata] = useState({});
  useEffect(() => {
    
    getManagement(doc_id)
      .then((Data) => {
        // console.log(data)
        setdata(Data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
  }, []);
  return (
    <div className="AMS">
        <SideNav xyz={'management'}/>
         
    <div className="div">
        <div className="text-wrapper">{data.username}</div>
      <img className="line" alt="Line" src="line-7.svg" />
      <div className="overlap">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper-2">Invalid</div>
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="div-wrapper">
            <div className="text-wrapper-3">Valid</div>
          </div>
        </div>
        <div className="text-wrapper-4">DOCUMENT VIEW</div>
      </div>
      <div className="overlap-2">
        <div className="overlap-3">
          <div className="text-wrapper-5">Send code</div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-4">
            <div className="text-wrapper-6">View</div>
          </div>
        </div>
        <div className="text-wrapper-7">DIOS code</div>
        <div className="text-wrapper-8">Document</div>
        <div className="text-wrapper-9">Address</div>
        <div className="text-wrapper-10">email</div>
        <div className="text-wrapper-11">School name</div>
          <div className="text-wrapper-12">{data.school_name}</div>
          <div className="text-wrapper-13">{data.username}</div>
          <div className="text-wrapper-14">{data.udise_code}</div>
        <div className="text-wrapper-15">doc name</div>
          <div className="text-wrapper-16">{data.email}</div>
          <div className="text-wrapper-17">{data.address}</div>
        <div className="text-wrapper-18">User name</div>
        <div className="text-wrapper-19">Details</div>
      </div>
      
      <div className="group-17">
        <img className="rectangle" alt="Rectangle" src='/' />
        <div className="vector-wrapper">
          <img className="vector" alt="Vector" src='/' />
        </div>
      </div>
    </div>
  </div>
  )
}

export default ManagementDocument