import React, { useState, useEffect } from "react";
import { editUserDetails } from "../API/apis";
import { enqueueSnackbar } from "notistack";


const ModalUpdateUserID = ({ setShowModalUpdate, id, user }) => {
  const [userid, setUserId] = useState(user.user_id)
  const inputChange = (e)=>{
    setUserId(e.target.value)
  }
  const updateUser = async ()=>{
    if(!userid){
      enqueueSnackbar(`Enter User ID`, { variant: 'error' })
    }else{
    const formData = new FormData();
    if(user.role =='student'){
      formData.append('user_id', userid);
    }
    else if(user.role == 'parent'){
      formData.append('user_id', userid)
    }else if(user.role == 'teacher'){
      formData.append('user_id', userid)
    }else{
      formData.append('user_id', userid)
    }
    try{
      const response = await editUserDetails(user._id,user.role, formData );
      console.log(response)
      enqueueSnackbar(`User Updated Successfully : ${userid}`, { variant: 'success' })
      
      setShowModalUpdate(false);
    }catch (error){
      console.error("Error updating user:", error);
      enqueueSnackbar(`Network Error`, { variant: 'error' })
    }
  }
  }
  // console.log(userID)
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <h3 className="text-wrapper-modal">Update User ID</h3>
        <input value={userid} placeholder="User ID" onChange={inputChange} ></input>
        <div className="modal-buttons">
          <button className="modal-create"
          onClick={() => {
            
            updateUser()
            
          }}
          >
            Update
          </button>

          <button
            className="modal-cancel"
            onClick={() => {
              setShowModalUpdate(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateUserID;
