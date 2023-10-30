import React,{useEffect, useState} from 'react'
import './Management1.css'
import SideNav from './SideNav'
import { useParams } from 'react-router-dom'
import { getManagement,sendcode,resendcode,apiUrl,verify} from '../API/apis';
import Head from './Head';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from './ComponentsCommon/LoadingSpin';

const ManagementDocument = () => {
  const {doc_id} = useParams()
  const [data, setdata] = useState({});
  const [isSending, setIsSending] = useState(false)

  const [btn, setbtn] = useState("Send");

  const verifydoc = () => {
    const formData = new FormData();
    formData.append('username', data.user_id);
    verify(formData).then((data) => {       
          console.log(data)
          enqueueSnackbar(`${data.message}`, {variant:'success'})
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
  }
  const [isDocumentView, setIsDocumentView] = useState(false)
  const handleViewDocument = ()=>{
    setIsDocumentView(!isDocumentView)
  }
  const sendCode = () => {
    setIsSending(true)
    const formData = new FormData();
      formData.append('username', data.user_id);
    if (btn === "Send") {
      sendcode(formData)
        .then((Data) => {
          setbtn("Resend")
          console.log(data)
          enqueueSnackbar(`Code Sent`, {variant:'success'})
          setIsSending(false)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
    else {
      resendcode(formData)
        .then((Data) => {
          console.log(Data)
          enqueueSnackbar(`${Data.message}`, {variant:'success'})
          setIsSending(false)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }
  useEffect(() => {
    
    getManagement(doc_id)
      .then((Data) => {
        setdata(Data)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

  }, [doc_id]);
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
        <p className="font1">UDISE code</p>
          <p className="font2">{data.udise_code}</p>

        </div>
        <div className='data-wrapper'>
        <p className="font1">Document</p>
        <div className="view-document-wrapper">
        <p className="font2">doc name</p>
        <button onClick={handleViewDocument} className="view-button">View</button>
        </div>

        </div>
       
          
        </div>
        {!data.is_document_verified?
        <div className='button-wrapper'>
              <button className="send-button" onClick={sendCode}>
                {isSending?<LoadingSpinner />:
                `${btn} Code`}
              </button>
        </div>
        :null}
      </div>
      <div className="overlap-2">
        <p className="details">DOCUMENT VIEW</p>
          {isDocumentView?
          (
            <div>
              <embed src={`${apiUrl}get_document/${data.document_path}`} width="100%" height="600px" /> 
              {!data.is_document_verified?
            <div className="button-wrapper">
                <button onClick={verifydoc}  className="send-button">Valid</button>
                <button className="send-button">Invalid</button>
            </div>
            :null}
            </div>

          ):null}
      </div>
      </div>
      
    </div>
  </div>
  )
}

export default ManagementDocument