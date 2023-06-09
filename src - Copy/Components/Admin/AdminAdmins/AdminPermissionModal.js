import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './AdminPermissionModal.css'
import Select from "react-select";
import { CircularProgress } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    p: 4,
    bgcolor: 'white',
    borderRadius: '20px'
  };

const AdminPermissionModal = ({show, loader, handleSubmit, handleChange, title, handleHide}) => {

    const customStyles = {
            
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "white",
          padding: "3px",
          border: "1px solid gray",
          boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
      };
  return (
    <Modal
    open={show}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='AdminPermissionModal'>
        <form onSubmit={handleSubmit} className='AdminPermissionModal_body'>
            <p className='AdminPermissionModal_topic'>{title}</p>
            <p className='AdminPermissionModal_Inputlabel'>Name</p>
            <input type='text' className='AdminPermissionModal_Input' name='name' onChange={handleChange} />
            <p className='AdminPermissionModal_Inputlabel'>Description</p>
            <input type='text' className='AdminPermissionModal_Input' name='description' onChange={handleChange} />
        <div className='Admin_CreatNegotiation_actionbutton'>
        <button className='Admin_CreateNegotiation_cancel' onClick={handleHide}>Cancel</button>
        <button type='submit' className='Admin_CreateNegotiation_next'>
        {loader? <CircularProgress size={15} /> : <span>Submit</span>}
            </button>
        </div>
         </form>
        
    </div>
    
  </Modal>
  )
}

export default AdminPermissionModal