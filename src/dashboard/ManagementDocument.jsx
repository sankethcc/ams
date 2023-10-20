import React,{useEffect, useState} from 'react'
import base64js from 'base64-js'
import './Management1.css'
import SideNav from './SideNav'
import { useParams } from 'react-router-dom'
import { getManagement,sendcode,resendcode,getdocument} from '../API/apis';
import Head from './Head';
import pdffile from './pdffile.pdf'

const ManagementDocument = () => {
  const {doc_id} = useParams()
  // console.log(doc_id)
  const [data, setdata] = useState({});
  const [url, seturl] = useState('');

  const [btn, setbtn] = useState("Send");


  const sendCode = () => {
    const formData = new FormData();
      formData.append('username', data.user_id);
    if (btn == "Send") {
      sendcode(formData)
        .then((Data) => {
          setbtn("Resend")
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
    else {
      resendcode(formData)
        .then((Data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }
  useEffect(() => {
    
    getManagement(doc_id)
      .then((Data) => {
        console.log(data)
        setdata(Data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

      

    const id= "653126b833c549b4a29b4deb"
   
    getdocument(id)
      .then((response) => {
        // const objectURL = URL.createObjectURL(response.data);
        const pdfBase64 = base64js.fromByteArray(new TextEncoder().encode(response.data));
        seturl(pdfBase64);
        console.log(response)

      })
        
      // .then((blob) => {
      //   const objectURL = URL.createObjectURL(blob);
      //   seturl(objectURL);
      // });
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
          <p className="font2">{data.user_id}</p>

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
              <button className="send-button" onClick={sendCode}>{`${btn} Code`}</button>
        </div>
      </div>
      <div className="overlap-2">
        <p className="details">DOCUMENT VIEW</p>
        {/* <embed src={url} /> */}
        {/* <iframe src={`https://docs.google.com/gview?url=${url}&embedded=true`}></iframe> */}
        {/* <embed src={`data:application/pdf;base64,${btoa{url}}`}></embed> */}
        {/* <embed src={`data:application/pdf;base64,${url}`} type="application/pdf" width="100%" height="600px" /> */}
        {/* <embed src={`data:application/pdf;base64,${pdfBase64}`} type="application/pdf" width="100%" height = "600px" /> */}
          <embed src={pdffile} />
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