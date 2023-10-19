import React,{useEffect, useState} from 'react'
import './Management1.css'
import SideNav from './SideNav'
import { useParams } from 'react-router-dom'
import { getManagement } from '../API/apis';
import Head from './Head';

const ManagementDocument = () => {
  const {doc_id} = useParams()
  // console.log(doc_id)
  const [data, setdata] = useState({});
  useEffect(() => {
    
    getManagement(doc_id)
      .then((Data) => {
        console.log(data)
        setdata(Data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    
  }, []);
  return (
    <div className="AMS screen">
        <SideNav xyz={'management'}/>
         
    <div className="div">
      <Head pageName={`Management/${data.username}`} />
      <div className='managment-document'>

      
      <div className="overlap-2">
      <p className="details">Details</p>
      <div className='details-wrapper'> 
      <div className="data-wrapper">
        <p className="font1"> School name </p>
          <p className="font2">{data.school_name}</p>
        </div>
        <div className='data-wrapper'>
        <p className="font1">Address</p>
        <p className="font2">{data.address}</p>

        </div>
        <div className='data-wrapper'>
        <p className="font1">User name</p>
          <p className="font2">{data.username}</p>

        </div>
        <div className='data-wrapper'>
        <p className="font1">email</p>
          <p className="font2">{data.email}</p>

        </div>
        <div className='data-wrapper'>
        <p className="font1">DIOS code</p>
          <p className="font2">{data.udise_code}</p>

        </div>
        <div className='data-wrapper'>
        <p className="font1">Document</p>
        <div className="view-document-wrapper">
        <p className="font2">doc name</p>
        <button className="view-button">View</button>
        </div>

        </div>
       
          
        </div>
        <div className='button-wrapper'>
          <button className="send-button">Send code</button>
        </div>
      </div>
      <div className="overlap-2">
        <p className="details">DOCUMENT VIEW</p>
        <div className="button-wrapper">
            <button className="send-button">Valid</button>
            <button className="send-button">Invalid</button>
        </div>
      </div>
      </div>
      
    </div>
  </div>
  )
}

export default ManagementDocument