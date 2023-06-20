import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import imgPlaceholder from '../../assets/AdminImg.png'
// import './AdminPermissionModal.css'
import Select from "react-select";
import { CircularProgress } from '@mui/material';
import {IoMdArrowBack} from 'react-icons/io'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import './MakeARequest.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MakeRequestDetailApi, OfferPlayApi } from '../../Slice/Player/PlayerView/PlayerViewSlice';
import { ToastContainer } from 'react-toastify';

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


const VideoRequestModal = ({show,setRequestType, loader,requestType , handleSubmit, handleChange, title, handleHide}) => {

    const [payValue, setPayValue] = useState('')
    const { id } = useParams();
    const [data, setData] = useState({})
    const [change, setChange] = useState(false)
    const [changeReq, setChangeReq] = useState(false)
    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const [loadingOffer, setLoadingOffer] = useState(false)
    const dispatch = useDispatch()
    console.log(requestType)

    useEffect(()=>{
      if(PlayerDetails){
        if(requestType == 'Photo'){
          setPayValue(PlayerDetails?.fanprice?.image_price)
        }
        else if(requestType == 'Video'){
          setPayValue(PlayerDetails?.fanprice?.video_price)
        }
    }
    },[requestType])

    
  const gottenMarketfee= useSelector((state)=> state?.reducer?.GetPaymentSlice?.getMarketPriceData?.data)


  const marketfee = Number(gottenMarketfee);
  const TotalFee = marketfee + Number(payValue);

    const handleChangePayValue =(e) =>{
      setPayValue(e.target.value)
    }
    const handleOfferChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmitRequest = async (e) =>{
      e.preventDefault()
      data.to = id;
      data.from = userId;
      data.type= requestType
      data.value = payValue
      data.recipient_earnings = payValue
      data.market_place_fee = marketfee
      // console.log(data)
      setLoadingOffer(true)
      await dispatch(MakeRequestDetailApi(data))
      setLoadingOffer(false)
      handleHide()
      // console.log('data ', data)
    }
    
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
      <ToastContainer />
      <form onSubmit={handleSubmitRequest} className='offeraRequest_ModalView'>
       <div className='MakeaRequest_Modal'>
        <IoMdArrowBack style={{fontSize:'25px'}} onClick={handleHide} />
        <img src={imgPlaceholder} width='50px' height='50px' style={{marginLeft:'10px'}} />
        <p  className='MakeaRequest_HowitWorksText'>How it Works</p>
        <AiOutlineInfoCircle style={{fontSize:'20px', marginLeft:'10px'}} />
       </div>
       <div style={{margin:'15px 25px'}}>
       <p style={{fontWeight:'600'}}>What type of media are you interested in?</p>
       {changeReq ? 
       <select onChange={(e)=> setRequestType(e.target.value)} className='OfferModal_PriceInput'>
        <option value='Video'>Video</option>
        <option value='Photo'>Photo</option>
     </select> 
       :
       <div className='VideoRequest_MidalVideoDiv'>
          <p>{requestType}</p>
       <p onClick={()=> setChangeReq(true)} className='MakeARequest_InitialChangeText' >Change</p>
       </div>}
        <p style={{fontWeight: '600'}}>Provide Details on Your Offer</p>
        <p style={{fontSize:'13px', }}>Offer Name</p>
        <input type='text' name='name' onChange={handleOfferChange} className='OfferModal_TitleInput' />
        <p style={{fontSize:'13px', }}>Offer Details</p>
        <textarea type='text' name='detail' onChange={handleOfferChange} className='OfferModal_TitleTextarea' />
        <p style={{fontSize:'13px', margin: '7px 0 0'}}>Expiration date (optional)</p>
        <p style={{fontSize:'12px', marginBottom:'5px'}}>After this date, the recipient will no longer be able to review or accept your deal</p>
        <input type='date' name='expiration' onChange={handleOfferChange} className='OfferModal_TitleDate' />
        <p style={{fontWeight: '600', marginTop:'20px'}}>Amount to be paid:</p>
         
        <div className='MakeARequest_InitialAmtDiv'>
          <p className='MakeARequest_InitialAmtText'>${payValue}</p>
          {/* <p className='MakeARequest_InitialChangeText' onClick={() => setChange(true)}>Change</p> */}
        </div>
        
        <div className='OfferInput_PriceSingleSummary'>          
        <p style={{fontSize:'13px', margin: '7px 0 0'}}>Recipient earnings</p>
        <p style={{fontSize:'13px', margin: '7px 0 0'}}>${payValue}</p>
        </div>
        <div className='OfferInput_PriceSingleSummary'>          
        <p style={{fontSize:'13px'}}>Marketplace fee*</p>
        <p style={{fontSize:'13px'}}>${marketfee}</p>
        </div>
        <div className='OfferInput_PriceTotal'>
          <p style={{fontWeight:'600'}}>Total</p>
          <p style={{fontWeight:'600'}}>${TotalFee}</p>
        </div>
            <button type='submit' className='HomepageViewProfile_requestButton' >
            {loadingOffer? <CircularProgress size={15} /> : <span>Send Offer</span>}
              </button>
       </div>
       </form>
    </div>
    
  </Modal>
  )
}

export default VideoRequestModal