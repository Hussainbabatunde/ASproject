import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './AdminCreateNegotiation.css'
import Select from "react-select";

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

const AdminCreateNegotiation = ({show, options, handleHide}) => {

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
    <div className='Admin_CreateNegotiation_modal'>
    <p className='AdminPage_NegotiateTitleText'>Create Negotiation</p>
    <p className='Admin_Createnegotiation_text'>You are about to create a negotiation, please select the Player and Scout involved.</p>
    <p className='Admin_CreateNegotiation_label'>Scout</p>
    <Select options={options} styles={customStyles} />
    <p className='Admin_CreateNegotiation_label'>Player</p>
    <Select options={options} styles={customStyles} />  

    <div className='Admin_CreatNegotiation_actionbutton'>
        <button className='Admin_CreateNegotiation_cancel' onClick={handleHide}>Cancel</button>
        <button className='Admin_CreateNegotiation_next'>Next</button>
        </div>   
    </div>
    
  </Modal>
  )
}

export default AdminCreateNegotiation