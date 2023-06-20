import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import {IoMdArrowBack} from 'react-icons/io'
import imgPlaceholder from '../../assets/AdminImg.png'
import './UpdateOfferDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { GetScoutOfferDetailsApi, ScoutUpdateOfferApi } from '../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice';
import { ToastContainer } from 'react-toastify';

const UpdateOfferDetail = ({show, handleHide, id, userId, setShow}) => {
  const [price_amt, setPriceAmt] = useState('')
  const [titleDetail, setTitleDetail] = useState('')
  const [detailUpdates, setDetailUpdate] = useState('')
  const [updateLoad, setUpdateLoad] = useState(false)
  const dispatch = useDispatch()

  const gottenDetailsUpdate = useSelector((state)=> state.reducer?.ScoutDealsSlice?.getOfferDetailsData?.data?.offers)
  useEffect(()=>{
    setPriceAmt(gottenDetailsUpdate?.value)
    setTitleDetail(gottenDetailsUpdate?.name)
    setDetailUpdate(gottenDetailsUpdate?.detail)
  },[gottenDetailsUpdate])

  const handleChangePrice = (e) =>{
    setPriceAmt(e.target.value)
  }
  const handleChangeTitle = (e) =>{
    setTitleDetail(e.target.value)
  }
  const handleChangeDetail = (e) =>{
    setDetailUpdate(e.target.value)
  }
  const handleSubmitUpdate = async(e) =>{
    e.preventDefault()
    const dataUpdate={}
    dataUpdate.user_id = userId
    dataUpdate.offer_id = id
    dataUpdate.price= price_amt
    dataUpdate.title = titleDetail
    dataUpdate.detail = detailUpdates
    setUpdateLoad(true)
    await dispatch(ScoutUpdateOfferApi(dataUpdate))
    await dispatch(GetScoutOfferDetailsApi({id, userId}))
    setUpdateLoad(false)
    setShow(false)
  }

  return (
    <Modal
    open={show}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='HomePage_ViewProfileModal'>
      <ToastContainer />
      <div className='MakeaRequest_ModalView'>
      <div className='MakeaRequest_Modal'>
        <IoMdArrowBack style={{fontSize:'25px'}} onClick={handleHide} />
        <p style={{fontSize: '20px', display:'flex', flex: 1, justifyContent:'center', alignItems:'center'}}>Update Offer</p>
       </div>
        <form onSubmit={handleSubmitUpdate} className='FormforOfferUpdate'>
       <p className='InputLabel_UpdateOffer'>Price</p>
        <input type='text' value={price_amt} onChange={handleChangePrice} className='InputField_UpdateOffer' placeholder='dollar' />
        <p className='InputLabel_UpdateOffer'>Title</p>
        <input type='text' value={titleDetail} onChange={handleChangeTitle} className='InputField_UpdateOffer' placeholder='title' />
        <p className='InputLabel_UpdateOffer'>Details</p>
        <textarea type='text' name='detail' value={detailUpdates} onChange={handleChangeDetail} className='InputTextArea_UpdateOffer'/>
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
          {updateLoad? <CircularProgress size={15} /> : <span>Update</span>}
          </button>
        </form>
        </div>
    </div>
    </Modal>
  )
}

export default UpdateOfferDetail