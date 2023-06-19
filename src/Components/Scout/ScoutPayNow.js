import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import '../Player/MakeARequest.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OfferPlayApi } from '../../Slice/Player/PlayerView/PlayerViewSlice';
import { ToastContainer } from 'react-toastify';
import {TbCurrencyNaira} from 'react-icons/tb'
import {BsFillPatchCheckFill, BsHouseDoor, BsDot} from 'react-icons/bs'
import { PlayerProfileAdvertiseApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice';
import { CircularProgress } from '@mui/material';
import { GetScoutOfferDetailsApi, ScoutMakePaymentApi } from '../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice';




const ScoutPayNow = ({showPay, gottenDetails, handleHideShowPay, positionPlayed}) => {

    const [payValue, setPayValue] = useState('')
    const { id } = useParams();
    const [data, setData] = useState({})
    const [change, setChange] = useState(false)
    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
    const [loadingOffer, setLoadingOffer] = useState(false)
    const dispatch = useDispatch()

    const gottenMarketfee= useSelector((state)=> state?.reducer?.GetPaymentSlice?.getMarketPriceData?.data)
    const recipientfee= Number(gottenDetails?.data?.offers?.recipient_earnings)
    const marketFee= Number(gottenMarketfee)
    const AdvertValue = recipientfee + marketFee  


    const handleChangePayValue =(e) =>{
      setPayValue(e.target.value)
    }
    const handleOfferChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmitOffer = async (e) =>{
      e.preventDefault()
      data.offer_id = gottenDetails?.data?.offers?.id;
      data.value = Number(AdvertValue)
      setLoadingOffer(true)
      await dispatch(ScoutMakePaymentApi(data))
      await dispatch(GetScoutOfferDetailsApi({id, userId}))
      setLoadingOffer(false)
      handleHideShowPay()
    }
    

  return (
    <Modal
    open={showPay}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className='HomePage_ViewProfileModal'>
      <ToastContainer />
      <form onSubmit={handleSubmitOffer} className='AdvertisePlayer_ModalView'>
       
       <div style={{margin:'15px 25px', padding: '1rem'}}>
        <p className='text-xl font-bold mb-2'>Pay Now</p>
        
        <p className=' mt-[15px]'><span className='font-bold'>Recipient Amount:</span> ${recipientfee}</p>
        <p className=' mt-[5px]'><span className='font-bold'>Market Fee:</span> ${marketFee}</p>
        <p className=' mt-[5px]'><span className='font-bold'>Total Amount:</span> ${AdvertValue}</p>
        
        <div className='flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Card Number</p>
            <input type='text' name='card' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>CVV</p>
            <input type='text' name='cvv' maxLength={3} onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>
        <div className='flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Month</p>
            <input type='text' maxLength={2} name='month' onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>Year</p>
            <input type='text' name='year' maxLength={2} onChange={handleOfferChange} className='w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>

        <div className='flex justify-end mt-[20px]'>
            <button className='font-bold py-1.5 px-2.5 mr-3' onClick={handleHideShowPay}>Cancel</button>
            <button className='text-white p-1.5 rounded bg-black'>
            {loadingOffer? <CircularProgress size={15} /> : <span>Payment</span>}
                </button>
        </div>
       </div>
       </form>
    </div>
    
  </Modal>
  )
}

export default ScoutPayNow