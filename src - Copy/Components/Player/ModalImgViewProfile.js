import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';

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


const ModalImgViewProfile = ({showImgModal,imgModal, handleCloseImageClicked }) => {



  return (
    <Modal
    open={showImgModal}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='HomePage_ViewProfileModal'>
    <div className='ModalImg_ModalView'>
      <img src={imgModal} className='ImgShownModal_ViewProfile' />
      <div className='CloseButton_ViewedModal'>
      <button onClick={handleCloseImageClicked} className='ViewProfile_DeleteVideo'>Close</button>
      </div>
      </div>
    </div>
    
  </Modal>
  )
}

export default ModalImgViewProfile