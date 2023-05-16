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


const HomePagePitchOffer = ({show, loader, handleSubmit, handleChange, title, handleHide}) => {

    
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
       <div style={{margin:'15px 25px'}}>
        <p style={{fontWeight: '600'}}>Provide Details on Your Offer</p>
        <p style={{fontSize:'13px', margin: '7px 0'}}>Offer Name</p>
        <input type='text' className='OfferModal_TitleInput' />
        <p style={{fontSize:'13px', margin: '7px 0'}}>Offer Details</p>
        <textarea type='text' className='OfferModal_TitleTextarea' />
        <p style={{fontSize:'13px', margin: '7px 0 0'}}>Expiration date (optional)</p>
        <p style={{fontSize:'12px', marginBottom:'5px'}}>After this date, the recipient will no longer be able to review or accept your deal</p>
        <input type='date' className='OfferModal_TitleDate' />
       </div>
       </div>
    </div>
    
  </Modal>
  )
}

export default HomePagePitchOffer