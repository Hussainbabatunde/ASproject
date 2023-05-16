import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import imgPlaceholder from '../../assets/AdminImg.png'
// import './AdminPermissionModal.css'
import Select from "react-select";
import { CircularProgress } from '@mui/material';
import {IoMdArrowBack} from 'react-icons/io'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import './MakeARequest.css'

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

const MakeARequest = ({show, loader, handleShowOffer, handleChange, title, handleHide}) => {

    const customStyles = {
            
        control: (defaultStyles) => ({
          ...defaultStyles,
          backgroundColor: "white",
          padding: "3px",
          border: "1px solid gray",
          boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
      }

  return (
    <Modal
    open={show}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='HomePage_ViewProfileModal'>
      <div className='MakeaRequest_ModalView'>
       <div className='MakeaRequest_Modal'>
        <IoMdArrowBack style={{fontSize:'25px'}} onClick={handleHide} />
        <img src={imgPlaceholder} width='50px' height='50px' style={{marginLeft:'10px'}} />
        <p  className='MakeaRequest_HowitWorksText'>How it Works</p>
        <AiOutlineInfoCircle style={{fontSize:'20px', marginLeft:'10px'}} />
       </div>
       <div className='MakeaRequest_HowitWorksContent'>
        <p>What type of Video are you interested in?</p>
        <div onClick={handleShowOffer} className='MakeaRequest_HowitWorksContentInnerDiv'>
          <div style={{display:'flex', alignItems:'center'}}>
          <div style={{border:'2px solid rgba(204, 204, 204, 1)', borderRadius:'50%', padding:'15px'}}></div>
          <p style={{marginLeft:'15px'}}>Video, or Photo</p>
          </div>
          <p>$1,000+</p>
        </div>
        <div className='MakeaRequest_HowitWorksContentInnerDiv'>
          <div style={{display:'flex', alignItems:'center'}}>
          <div style={{border:'2px solid rgba(204, 204, 204, 1)', borderRadius:'50%', padding:'15px'}}></div>
          <p style={{marginLeft:'15px'}}>Youtube Post</p>
          </div>
          <p>$1,000+</p>
        </div>
       </div>
       </div>
    </div>
    
  </Modal>
  )
}

export default MakeARequest