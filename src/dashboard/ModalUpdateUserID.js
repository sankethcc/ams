import React, { useState, useEffect } from "react";
import { editUserDetails } from "../API/apis";


const ModalUpdateUserID = ({ setShowModalUpdate, id, user }) => {
  const [userid, setUserId] = useState(user.user_id)
  const inputChange = (e)=>{
    setUserId(e.target.value)
  }
  const updateUser = ()=>{
    const formData = new FormData();
    if(user.role =='student'){
      formData.append('user_id', userid);
    }
    else if(user.role == 'parent'){
      formData.append('user_id', userid)
    }else if(user.role == 'teacher'){
      formData.append('user_id', userid)
    }

    editUserDetails(user._id,user.role, formData )
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
            setShowModalUpdate(false);
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
