import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import '../Player/PlayersDeals.css'
import {FaDownload} from 'react-icons/fa'
import imgRecipient from '../../assets/imgRecipient.png'
import { useDispatch, useSelector } from 'react-redux'
import { GetPlayerOfferDetailsApi, GetPlayerOfferDownloadApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice'
import { PulseLoader } from 'react-spinners'
import { GetScoutOfferDetailsApi, GetScoutOfferDownloadApi, ScoutDealCommentsApi, ScoutMakeCommentApi } from '../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice'
import { CircularProgress, Skeleton } from '@mui/material'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import FanUpdateRequestDetail from './FanUpdateRequestDetail'
import { FanFanDealCommentsApi, FanMakeCommentApi } from '../../Slice/Fan/FanDealsApiPage/FanDealSlice'
import FanPayNow from './FanPayNow'

const FanDealsMade = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
  const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
  const [downloadPage, setDownloadPage] = useState(false)
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')
  const [showPay, setShowPay] = useState(false)
  const [commentload, setCommentLoad] = useState(false)
  const gottenDetails = useSelector((state)=> state.reducer?.ScoutDealsSlice?.getOfferDetailsData)
  const expireData = gottenDetails?.data?.offers?.expiration.slice(0,11);
  const CommentsGotten = useSelector((state)=> state.reducer?.FanDealsSlice?.fanCommentMadePlayerData?.data?.data)

  let Offer_data = useLocation()
  const {each} = Offer_data.state
  
  const senderId = each?.request?.deal?.to
  // console.log('CommentsGotten ', gottenDetails)
  console.log('user id', each)
  useEffect(()=>{
    const offerDetails = async()=>{
      setLoading(true)
    //   await dispatch(GetScoutOfferDetailsApi({id, userId}))
      await dispatch(FanFanDealCommentsApi({id, userId, senderId}))
      setLoading(false)
    }
    offerDetails()
  },[])

  const handleShowUpdate = () =>{
    setShow(true)
    console.log(show)
  }

  const handleHide = () =>{
    setShow(false)
  }

  useEffect(()=>{
    const offerDetails = async()=>{
      setCommentLoad(true)
      await dispatch(FanFanDealCommentsApi({id, userId, senderId}))
      setCommentLoad(false)
    }
    offerDetails()
  },[senderId])

  const handleComment = (e) =>{
    setComment(e.target.value)
  }
  const handleDownload = async() =>{
    setDownloadPage(true)
    await dispatch(GetScoutOfferDownloadApi(id, userId))
    setDownloadPage(false)
  }

  const handleHideShowPay = () =>{
    setShowPay(false)
  }

  const handleSubmitComment = async (e) =>{
    e.preventDefault()
    const sentData ={}
    sentData.comment = comment
    sentData.others = userId
    sentData.player_id = each?.request?.deal?.to
    sentData.request_id = each?.request?.deal?.requestId
    setCommentLoad(true)
    console.log(sentData)
    await dispatch (FanMakeCommentApi(sentData))    
    await dispatch(FanFanDealCommentsApi({id, userId, senderId}))
    // console.log(sentData)
    setComment('')
    setCommentLoad(false)
  }
    

  // console.log('gottenDetails ', gottenDetails)


  return (
    <div className='PlayersViewDeals_Container'>
      <ToastContainer />
        <div className='PlayersDealsMade_Page'>
        {/* <div className='ScoutViewProfile_navigationprogress'>
                <Link to='/afrisport/player/deal' className='ScoutViewProfile_navigationback'>Deals</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Details</p>
            </div> */}
            <div className='PlayerViewDeals_InfoSection'>
            <div className='PlayerViewDeals_InfoSection_UpperSegment'>
              <div className='PlayerViewdetails_TopicSec'>                
                <p className='PlayerViewdetails_DetailsText'>Details {each?.request?.deal?.payment_status == 'paid' ? '(Paid)' : '(Not Paid)'}</p>
                <div className='PlayerViewdetails_DownloadButtons'>
                  {/* <button className='PlayerViewdetails_DownloadPdf' onClick={handleDownload} style={{display:'flex', alignItems:"center"}}>
                    <FaDownload style={{color:'#3D413D', marginRight: '7px'}} /> 
                    {downloadPage ? 
                          <PulseLoader
                              color="black"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            /> :<span>Download</span>}
                    </button> */}
                  {userType!= 'player' && <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {/* <button className='PlayerViewdetails_Updatebutton' onClick={handleShowUpdate}>Update</button> */}
                  {each?.request?.deal?.payment_status == 'paid' ?
                   <span></span>
                   :
                   <button className='PlayerViewdetails_Paynowbutton' onClick={()=> setShowPay(true)}>Pay Now</button>
                  }
                  </div>}
                </div>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Recipient:</label>
                <p className='PlayerViewdetails_labelresponse'>
                {loading? <Skeleton variant="circular" width={35} height={32} /> :<img src={each?.request?.player?.profile_pics}  className='useTable_ImageRecipient' />}
                {loading?  <Skeleton variant="rounded" width={105} height={22} /> :<span className='PlayerViewdetails_sendername'> {each?.request?.player?.firstname} {each?.request?.player?.surname}</span>}
                </p>
              </div>
              {/* <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Duration:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> 6 months</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Expiring:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{expireData}</p>}
              </div> */}
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Amount:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'> ${each?.request?.deal?.value}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Name:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{each?.request?.deal?.fanRequest}</p>}
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Status:</label>
                <p className='PlayerViewdetails_labelresponse'> 
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<span className='PlayerViewdetails_response_styling'>{each?.request?.deal?.requestStatus}</span>}
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Description:</label>
                {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_labelresponse'>{each?.request?.deal?.detail}</p>}
              </div>
              </div>
              <div className='PlayerViewDeals_InfoSection_LowerSegment'>
              {CommentsGotten?.map((each, index) =>( 
                  <div key={index} className='PlayerViewDeals_CommentImgName'>
                  {loading? <Skeleton variant="circular" width={35} height={32} /> :<img src={each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.profile_pics: each?.comments?.others?.profile_pics }  className='useTable_ImageRecipient' />}
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                  {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewdetails_sendername'>{each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.firstname  : each?.comments?.others?.firstname } {each?.comments?.sent_by == each?.comments?.player?.id ? each?.comments?.player?.surname  : each?.comments?.others?.surname } 
                    <span className='PlayerViewDeals_DateDetails'> {moment(each?.comments?.created_at).format('DD-MM-YYYY hh:mma')} </span>
                    </p>}
                    {loading? <Skeleton variant="rounded" width={105} height={22} />:<p className='PlayerViewDeals_CommentDetails'> {each?.comments?.comment} </p>}
                  </div>
                  </div>))}
                  <div className='PlayerViewDeals_CommentSectionDiv'>
                    <form onSubmit={handleSubmitComment} className='PlayerViewDeals_CommentSectionInnerDiv'>
                      <textarea onChange={handleComment} value={comment} placeholder='Make a comment' style={{flex: 1, border:'none', minHeight: '50px'}} />
                      <button type='submit' className='PlayerViewDeals_CommentButton'>
                      {commentload ? <CircularProgress size={15} /> :  <span>Comment</span>}
                        </button>
                    </form>
                  </div>
              </div>
            </div>
            </div>
            <FanUpdateRequestDetail show={show} setShow={setShow} handleHide={handleHide} userId= {userId} id={id} />
            <FanPayNow senderId={senderId}  showPay={showPay} handleHideShowPay={handleHideShowPay} gottenDetails={each} userId={userId}  />
    </div>
  )
}

export default FanDealsMade;