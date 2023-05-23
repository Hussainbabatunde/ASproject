import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import '../Player/PlayersDeals.css'
import {FaDownload} from 'react-icons/fa'
import imgRecipient from '../../assets/imgRecipient.png'
import { useDispatch, useSelector } from 'react-redux'
import { GetPlayerOfferDetailsApi, GetPlayerOfferDownloadApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice'
import { PulseLoader } from 'react-spinners'
import { GetScoutOfferDetailsApi, GetScoutOfferDownloadApi } from '../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice'

const ScoutDealsMade = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
  const userType = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user_type)
  const [downloadPage, setDownloadPage] = useState(false)
  // console.log('id ', id)
  // console.log('user id', userId)
  useEffect(()=>{
    const offerDetails = async()=>{
      setLoading(true)
      await dispatch(GetScoutOfferDetailsApi({id, userId}))
      setLoading(false)
    }
    offerDetails()
  },[])

  const handleDownload = async() =>{
    setDownloadPage(true)
    await dispatch(GetScoutOfferDownloadApi(id, userId))
    setDownloadPage(false)
  }
  const gottenDetails = useSelector((state)=> state.reducer?.ScoutDealsSlice?.getOfferDetailsData)
  const expireData = gottenDetails?.data?.expiration.slice(0,11);
  return (
    <div className='PlayersViewDeals_Container'>
        <div className='PlayersDealsMade_Page'>
        {/* <div className='ScoutViewProfile_navigationprogress'>
                <Link to='/afrisport/player/deal' className='ScoutViewProfile_navigationback'>Deals</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Details</p>
            </div> */}
            <div className='PlayerViewDeals_InfoSection'>
            <div className='PlayerViewDeals_InfoSection_UpperSegment'>
              <div className='PlayerViewdetails_TopicSec'>                
                <p className='PlayerViewdetails_DetailsText'>Details (Not Paid)</p>
                <div className='PlayerViewdetails_DownloadButtons'>
                  <button className='PlayerViewdetails_DownloadPdf' onClick={handleDownload} style={{display:'flex', alignItems:"center"}}>
                    <FaDownload style={{color:'#3D413D', marginRight: '7px'}} /> 
                    {downloadPage ? 
                          <PulseLoader
                              color="black"
                              size={13}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            /> :<span>Download</span>}
                    </button>
                  {userType!= 'player' && <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <button className='PlayerViewdetails_Updatebutton'>Update</button>
                  <button className='PlayerViewdetails_Paynowbutton'>Pay Now</button>
                  </div>}
                </div>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Sent By:</label>
                <p className='PlayerViewdetails_labelresponse'><img src={imgRecipient}  className='useTable_ImageRecipient' />
                <span className='PlayerViewdetails_sendername'> Nicole Frami</span>
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Duration:</label>
                <p className='PlayerViewdetails_labelresponse'> 6 months</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Expiring:</label>
                <p className='PlayerViewdetails_labelresponse'>{expireData}</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Amount:</label>
                <p className='PlayerViewdetails_labelresponse'> ${gottenDetails?.data?.market_place_fee}</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Name:</label>
                <p className='PlayerViewdetails_labelresponse'>{gottenDetails?.data?.name}</p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Status:</label>
                <p className='PlayerViewdetails_labelresponse'> 
                <span className='PlayerViewdetails_response_styling'>{gottenDetails?.data?.status}</span>
                </p>
              </div>
              <div className='PlayerViewdetails_LabelAndAnswer'>
                <label className='PlayerViewdetails_LabelText'>Negotiate Description:</label>
                <p className='PlayerViewdetails_labelresponse'>{gottenDetails?.data?.detail}</p>
              </div>
              </div>
              <div className='PlayerViewDeals_InfoSection_LowerSegment'>
                  <div className='PlayerViewDeals_CommentImgName'>
                  <img src={imgRecipient}  className='useTable_ImageRecipient' />
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                    <p className='PlayerViewdetails_sendername'>Ms Lucas Howe <span className='PlayerViewDeals_DateDetails'>3 days ago</span></p>
                    <p className='PlayerViewDeals_CommentDetails'> Hi, i am the talent manager for the player.</p>
                  </div>
                  </div>
                  <div className='PlayerViewDeals_CommentImgName'>
                  <img src={imgRecipient}  className='useTable_ImageRecipient' />
                  <div className='PlayerViewDeals_CommentNameandDetails'>
                    <p className='PlayerViewdetails_sendername'>Ms Lucas Howe <span className='PlayerViewDeals_DateDetails'>3 days ago</span></p>
                    <p className='PlayerViewDeals_CommentDetails'> Hi, i am the talent manager for the player.</p>
                  </div>
                  </div>
                  <div className='PlayerViewDeals_CommentSectionDiv'>
                    <div className='PlayerViewDeals_CommentSectionInnerDiv'>
                      <textarea placeholder='Make a comment' style={{flex: 1, border:'none', minHeight: '50px'}} />
                      <button className='PlayerViewDeals_CommentButton'>Comment</button>
                    </div>
                  </div>
              </div>
            </div>
            </div>
    </div>
  )
}

export default ScoutDealsMade