import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import './MakeARequest.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { OfferPlayApi } from '../../Slice/Player/PlayerView/PlayerViewSlice';
import { ToastContainer } from 'react-toastify';
import {TbCurrencyNaira} from 'react-icons/tb'
import {BsFillPatchCheckFill, BsHouseDoor, BsDot} from 'react-icons/bs'
import { PlayerProfileAdvertiseApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice';
import { CircularProgress } from '@mui/material';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import {reset as resetPaymentSlice} from "../../Slice/Player/PlayerPayment/PaymentSlice"
import { AdvertSentApi } from '../../Slice/Player/PlayerPayment/PaymentSlice';




const AdvertisePlayerModal = ({show, progress, hideAdvertiseProfile, positionPlayed}) => {

    const [payValue, setPayValue] = useState('')
    const { id } = useParams();
    const [data, setData] = useState({})
    const [change, setChange] = useState(false)
    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
    const [loadingOffer, setLoadingOffer] = useState(false)
    const dispatch = useDispatch()
    const AdvertValue = 100
    const [advertPrice, setAdvertPrice] = useState('')
    const [duration , setDuration ] = useState(null)
    const [durationPeriod, setDurationPeriod] = useState(null)

    
  const AdvertPrices = useSelector((state)=>state?.reducer?.GetPaymentSlice?.getAdvertFeesdata)
  const AdvertPaid = useSelector((state)=>state?.reducer?.GetPaymentSlice?.getAdvertPaidData)

  useEffect(()=>{
    const reload = async () =>{
      if(AdvertPaid?.url){
    window.location.href = AdvertPaid?.url
      }
    
    }
    reload()
  }, [AdvertPaid])
// console.log('advert prices ', AdvertPrices)

useEffect(()=>{
  if(duration == 'weekly'){
  setAdvertPrice(AdvertPrices?.advert_fee)
  }
  else if(duration == 'monthly'){
    setAdvertPrice(AdvertPrices?.monthly_advert)
  }
},[duration])

useEffect(()=>{
  const initial = async () =>{
  setDuration('weekly')
  await dispatch(resetPaymentSlice())
  setDurationPeriod('1')
  }
  initial()
},[])

    const handleChangePayValue =(e) =>{
      setPayValue(e.target.value)
    }
    const handleOfferChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmitOffer = async (e) =>{
      e.preventDefault()
      data.player_id = userId;
      // data.amount = AdvertValue
      const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const timeDifference = Math.abs(end - start);
    const weeks = Math.ceil(timeDifference / millisecondsPerWeek);
      if(weeks/4 < 1){
        data.value = AdvertValue
      }
      else {
        const weeksData = weeks/4 
        console.log(weeksData)
        if(weeksData%4 == 0){
          data.value = AdvertValue * Math.floor(weeksData)
        }
        else if (weeksData % 4 != 0){
          data.value = AdvertValue * Math.floor(weeksData) + AdvertValue
        }
      }
      setLoadingOffer(true)
      await dispatch(PlayerProfileAdvertiseApi(data))
      setLoadingOffer(false)
      // console.log('data ', data)
    }

    const handleDurationAdvert = (value) =>{
      setDuration(value)
    }

    const handleSubmitAdvert = async(e) =>{
      e.preventDefault()
      let sentData = {
        nos: Number(durationPeriod),
        duration: duration
      }
      console.log(sentData)
      await dispatch(AdvertSentApi(sentData))
    }
    

  return (
    <Modal
    open={show}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    {/* <div className='HomePage_ViewProfileModal'>
      <ToastContainer />
      <form onSubmit={handleSubmitOffer} className='AdvertisePlayer_ModalView'>
       
       <div style={{margin:'15px 25px', padding: '1rem'}}>
        <p className='text-xl font-bold mb-2'>Advertise Profile</p>
        <p className='text-[14px] md:w-[75%]'>Make your profile more visible to scout and fans coming to the platform</p>
        <div className='mt-[20px] md:flex justify-between'>
            <div className='flex'>
            <img src={PlayerDetails?.profile_pics} alt='image placeholder' className='AdvertisewProfile_UserProfileImage' />
            <div>
            <p className='AdvertiseProfile_UserProfiledetailsUsername'><span style={{display:'flex', alignItems:'center'}}>{PlayerDetails?.firstname} {PlayerDetails?.surname} <BsFillPatchCheckFill style={{fontSize:'22px', color:'#0F7BEF', marginLeft:'10px'}} /></span></p>
            <p className='text-[14px] md:w-[75%]'>Score: {progress}/100</p>
            </div>
            </div>
            <div>
            <p className='ScoutViewProfile_UserProfilePosition'>{positionPlayed}</p>
            <p className='ScoutViewProfile_UserProfilePricerange'>Contract: <span style={{display:'flex', alignItems:'center'}}><TbCurrencyNaira style={{fontSize:"18px"}} />{PlayerDetails?.price?.minimum} - {PlayerDetails?.price?.maximum}</span></p>
            </div>
        </div>
        <p className=' mt-[15px]'><span className='font-bold'>Amount:</span> ${AdvertValue}</p>
        <div className='md:flex md:justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Start Date</p>
            <input type='date' name='start_date' onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>End Date</p>
            <input type='date' name='end_date' onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>
        <div className='md:flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Card Number</p>
            <input type='text' name='card' onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>CVV</p>
            <input type='text' name='cvv' maxLength={3} onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>
        <div className='md:flex justify-between'>
            <div>
            <p className='font-bold mt-[10px]'>Month</p>
            <input type='text' maxLength={2} name='month' onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
            <div>
            <p className='font-bold mt-[10px]'>Year</p>
            <input type='text' name='year' maxLength={2} onChange={handleOfferChange} className='w-[100%] md:w-[200px] p-1.5 rounded border border-gray-300' />
            </div>
        </div>

        <div className='flex justify-end mt-[20px]'>
            <button className='font-bold py-1.5 px-2.5 mr-3' onClick={hideAdvertiseProfile}>Cancel</button>
            <button className='text-white p-1.5 rounded bg-black'>
            {loadingOffer? <CircularProgress size={15} /> : <span>Payment</span>}
                </button>
        </div>
       </div>
       </form>
    </div> */}

    

<div className='HomePage_ViewProfileModal'>
      <div className='MakeaRequest_ModalView'>
       <div className='MakeaRequest_Modal'>
        <IoMdArrowBack style={{fontSize:'25px'}} onClick={hideAdvertiseProfile} />
        <p  className='MakeaRequest_HowitWorksText text-center'>How it Works</p>
        <AiOutlineInfoCircle style={{fontSize:'20px', marginLeft:'10px'}} />
       </div>
       <div className='MakeaRequest_HowitWorksContent'>
        <p>What type of Advert do u want?</p>
        {/* <div onClick={handleVideoRequestType} className='MakeaRequest_HowitWorksContentInnerDiv'>
          <div style={{display:'flex', alignItems:'center'}}>
          <div style={{border:'2px solid rgba(204, 204, 204, 1)', borderRadius:'50%', padding:'15px'}}></div>
          <p style={{marginLeft:'15px'}}>Weekly</p>
          </div>
          <p>${PlayerDetails?.fanprice?.video_price}</p>
        </div>
        <div onClick={handleRequestType} className='MakeaRequest_HowitWorksContentInnerDiv'>
          <div style={{display:'flex', alignItems:'center'}}>
          <div style={{border:'2px solid rgba(204, 204, 204, 1)', borderRadius:'50%', padding:'15px'}}></div>
          <p style={{marginLeft:'15px'}}>Monthly</p>
          </div>
          <p>${PlayerDetails?.fanprice?.image_price}</p>
        </div> */}
       </div>
       <div className='px-4 py-2'>
        <p >Subscription Type</p>
        <select onChange={(e)=> handleDurationAdvert(e.target.value)} className='border px-2 py-1 rounded  border-[#cccccc] w-[100%]'>
          <option value='weekly' >Weekly</option>
          <option value='monthly' >Monthly</option>
        </select>
        <p className='mt-2'>Price:</p>
        <p className='border px-2 py-1 rounded  border-[#cccccc] w-[100%]'> {advertPrice} naira</p>
        <p className='mt-2'>Duration:</p>
        {duration == 'monthly' && <select onChange={(e)=> setDurationPeriod(e.target.value)} className='border px-2 py-1 rounded  border-[#cccccc] w-[100%]'>
          <option value='1'>1 month</option>
          <option value='2'>2 month</option>
          <option value='3'>3 month</option>
          <option value='4 '>4 month</option>
          <option value='5'>5 month</option>
          <option value='6'>6 month</option>
          <option value='7'>7 month</option>
          <option value='8'>8 month</option>
          <option value='9'>9 month</option>
          <option value='10'>10 month</option>
          <option value='11'>11 month</option>
          <option value='12'>12 month</option>
        </select>}

        {duration == 'weekly' && <select onChange={(e)=> setDurationPeriod(e.target.value)} className='border px-2 py-1 rounded  border-[#cccccc] w-[100%]'>
          <option value='1'>1 week</option>
          <option value='2'>2 week</option>
          <option value='3'>3 week</option>
          <option value='4'>4 week</option>
        </select>}

      <div className='flex justify-end mt-3'>
        <button onClick={hideAdvertiseProfile} className='text-white bg-red-500 py-1 px-3 rounded mr-2'>Cancel</button>
        <button onClick={handleSubmitAdvert} className='text-white bg-green-800 py-1 px-3 rounded mr-2'>Submit</button>
        </div>
        </div>

       </div>
    </div>
    
  </Modal>
  )
}

export default AdvertisePlayerModal