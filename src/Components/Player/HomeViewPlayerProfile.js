import React, { useEffect, useState } from 'react'
import '../../Pages/Scout/ScoutViewProfile.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import {BsShareFill} from 'react-icons/bs'
import imgPlaceholder from '../../assets/imgPlaceholder.png'
import {BsFillPatchCheckFill, BsHouseDoor, BsDot} from 'react-icons/bs'
import {MdOutlineDashboard} from 'react-icons/md'
import {TbCurrencyNaira} from 'react-icons/tb'
import {SlLocationPin} from 'react-icons/sl'
import {RiDashboardLine} from 'react-icons/ri'
import PlayerImg from '../../assets/Player1.png'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerProfileVerificationStatus, ProfileDetailsPlayer } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { Skeleton } from '@mui/material'
import ScoutHeader from '../Header/ScoutHeader'
import Footer from '../Homepage/Footer'
import MakeARequest from './MakeARequest'
import HomePagePitchOffer from './HomePagePitchOffer'
import ReactPlayer from 'react-player'
import { ToastContainer } from 'react-toastify'
import VideoRequestModal from './VideoRequestModal'

const HomeViewPlayerProfile = () => {
  const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [loader, setLoader] = useState(false)
    const [videoLoader, setVideoLoader] = useState(false)
    const [showVideoRequest, setShowVideoRequest] = useState(false)
  
  
    const userData = useSelector((state)=> state.reducer.LoginSlice?.logindata )
    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
    // console.log('Player details ', PlayerDetails)
    // const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.message?.id)

    const handleHide = () => {
        setShow(false)
      }
      const handleShow= ()=>{
        setShow(true)
      }

      const handleHideOffer = () => {
        setShowOffer(false)
      }
      const handleShowOffer= ()=>{
        setShow(false)
        setShowOffer(true)
      }

      const handleShowVideoRequest = () =>{
        setShow(false)
        setShowVideoRequest(true)
      }
      const handleHideVideoRequest = () =>{
        setShowVideoRequest(false)
      }

      const handleUserProfile = () =>{
        if(userData?.data?.user_type == 'player'){
          navigate('/afrisport/player/profile')
        }
        else if(userData?.data?.user_type == 'admin'){
          navigate('/admin/admin/dashboard')
        }
        else if(userData?.data?.user_type == 'scout'){
          navigate('/afrisport/scout/profile')
        }
      }
      
    useEffect(()=>{
        const getInfo = async() =>{
          setLoading(true)
          await dispatch(ProfileDetailsPlayer(id))
          // await dispatch(PlayerProfileVerificationStatus())
          setLoading(false)
        }
        getInfo()
      },[])

  return (
    <div>
        <ScoutHeader />
    <div className='ScoutViewProfile'>
      <ToastContainer />
        {/* <div className='ScoutViewProfile_navigation'>
            <div className='ScoutViewProfile_navigationprogress'>
                <Link style={{cursor:'pointer'}}
                to='/afrisport/player/homepage'
                //  onClick={handleUserProfile} 
                 className='ScoutViewProfile_navigationback'>Back</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Player Profile</p>
            </div>
            <Link className='ScoutViewProfile_share'> <BsShareFill style={{color:'rgba(150, 150, 150, 1)'}} /> <span style={{color:'rgba(150, 150, 150, 1)', marginLeft:'10px'}}>Share</span></Link>
        </div> */}

        <div className='HomepageViewPlayerProfile'>
        <div className='HomepageView_ProfileOffers'>
        <div className='ScoutViewProfile_UserProfileSection'>
          <div className='ScoutViewProfile_UserProfiledetailsSection'>
            <img src={PlayerDetails?.profile_pics} alt='image placeholder' className='ScoutViewProfile_UserProfileImage' />
            <div>
              <p className='ScoutViewProfile_UserProfiledetailsUsername'>{loading == true ? <Skeleton variant="rounded" width='90%' height={32} /> : <span style={{display:'flex', alignItems:'center'}}>{PlayerDetails?.firstname} {PlayerDetails?.surname} 
              {/* <BsFillPatchCheckFill style={{fontSize:'22px', color:'#0F7BEF', marginLeft:'10px'}} /> */}
              </span>}</p>
              {/* <p className='ScoutViewProfile_UserProfileScore'>Score: {progress}/100</p> */}
              {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : <p className='ScoutViewProfile_UserProfileCurrentlyAvailable'>{PlayerDetails?.bio?.available == 0 ? `Not Available` : `Currently Available`}</p>}
              <div className='ScoutViewProfile_UserProfilePositionSection'>
                <p className='ScoutViewProfile_UserProfilePosition'>Striker</p>
                <p className='ScoutViewProfile_UserProfilePosition'>Midfielders</p>
                </div>

                <p className='ScoutViewProfile_UserProfilePricerange'>Contract: {loading == true? <Skeleton variant="rounded" width='90%' height={20} /> : <span style={{display:'flex', alignItems:'center'}}><TbCurrencyNaira style={{fontSize:"18px"}} />{PlayerDetails?.price?.minimum} - {PlayerDetails?.price?.maximum}</span>}</p>
            </div>
          </div>

        </div>
        <div className='ScoutViewProfile_AboutSection'>
            <p className='ScoutViewProfile_AboutTopicText'>About</p>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'>66</p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Biography</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>{loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.bio?.about}</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><MdOutlineDashboard /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Current Club</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>{loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.bio?.current_club}</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><SlLocationPin /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Location</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>{loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.bio?.location}</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><BsHouseDoor /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Hometown</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>{loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.bio?.home_town}.</p>
              </div>
            </div>
            {/* <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><RiDashboardLine /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Interest</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Gamming, Singing.</p>
              </div>
            </div> */}
            <p className='ScoutViewProfile_PhysicalStatsText'>Physical Stats</p>
            <div className='ScoutViewProfile_PhysicalStatsInfo'>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Gender: {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.physical_stat?.gender}</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Height: {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.physical_stat?.height}ft</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Language: {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.physical_stat?.language}</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Weight: {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.physical_stat?.weight}kg</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Religion: Christian</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Stronger foot: {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : PlayerDetails?.physical_stat?.strong_foot}</p>
            </div>
        </div>
        <p className='ScoutViewProfile_PhysicalStatsText'>Images <BsDot style={{fontSize:'25px'}}/> {PlayerDetails?.images.length} </p>
        <div className='ScoutViewProfile_ImageSection'>
        {PlayerDetails?.images.map((each, index) =>( 
        <img src={each?.image_url}  key={index} className='ScoutViewProfile_Image' />
        ))}
            {/* <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' /> */}
        </div>
        <p className='ScoutViewProfile_PhysicalStatsText'>Video <BsDot style={{fontSize:'25px'}}/> {PlayerDetails?.videos?.length} </p>
        <div className='ScoutViewProfile_VideoSection'>
        {PlayerDetails?.videos.map((each, index) =>( 
          <div key={index} className='ScoutViewProfile_VideoDiv'>
        <ReactPlayer width='300px' height='300px' controls url={each?.video_url} />
        </div>
        ))}
        </div>
        </div>
        <div className='HomepageViewProfile_OfferRequest'>
            <div className='HomepageViewProfile_MakeRequestSec'>                
            <p className='ScoutViewProfile_AboutTopicText'>For Fans</p>
            <p className='ScoutViewProfile_UserProfileCurrentlyAvailable'>Request for personalized Video or Photo Content</p>
            <button className='HomepageViewProfile_requestButton' onClick={handleShow}>Make a request</button>
            </div>
            {userData?.data?.user_type != 'player' && <div className='HomepageViewProfile_MakeRequestSec'>                
            <p className='ScoutViewProfile_AboutTopicText'>Negotiate this Player</p>
            <p className='ScoutViewProfile_UserProfileCurrentlyAvailable'>For Business, Pitch your business offer to the player/talent manager.</p>
            <div style={{marginTop: '20px'}}>
            <p style={{fontSize: '13px'}}>Ranging from $400</p>
            <p style={{fontSize: '13px', marginTop:"5px"}}>Open for negotiation</p>
            </div>
            <button className='HomepageViewProfile_requestButton' onClick={handleShowOffer}>Pitch offer</button>
            </div>}
        </div>
        </div>
    </div>
    <MakeARequest loader={loader} show={show} handleShow={handleShow} handleShowOffer={handleShowOffer} handleShowVideoRequest={handleShowVideoRequest} handleHide={handleHide}/>
    <HomePagePitchOffer loader={loader} show={showOffer} handleShow={handleShowOffer} handleHide={handleHideOffer} />
    <VideoRequestModal loader={videoLoader} show={showVideoRequest} handleHide={handleHideVideoRequest} />
    <Footer />
    </div>
  )
}

export default HomeViewPlayerProfile