import React, { useEffect, useState } from 'react'
import '../Scout/ScoutProfile.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { LogoutAuth } from '../../Slice/auth/Login'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { ProfileDetailsScout, ScoutProfilePicture, ScoutProfileVerificationStatus } from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice";
import ScoutProfileProfileform from './ScoutProfileProfileform'
import ScoutProfileUploadId from './ScoutProfileUploadId'
import { UserLogout } from '../Player/UserLogOut'
import { AiFillCamera } from 'react-icons/ai'
import { reset as resetLoginSlice } from "../../Slice/auth/Login";
import {reset as resetPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import {reset as resetPlayerFanDealSlice} from "../../Slice/Player/PlayerDeal/PlayerFanDealSlice"
import {reset as resetPlayerHomepageSlice} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage"
import {reset as resetManagerSlice} from "../../Slice/Player/PlayerManager/PlayerManagerSlice"
import {reset as resetPaymentSlice} from "../../Slice/Player/PlayerPayment/PaymentSlice"
import {reset as resetViewSlice} from "../../Slice/Player/PlayerView/PlayerViewSlice"
import {reset as resetPlayerProfileSlice} from "../../Slice/Player/Playerprofile/PlayerProfileSlice"
import {reset as resetFanDealSlice} from "../../Slice/Fan/FanDealsApiPage/FanDealSlice"

import {reset as resetFanProfileSlice} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice"

import {reset as resetScoutProfileSlice} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice"

import {reset as resetScoutDealSlice} from "../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice"

import { GetMarketPriceApi } from '../../Slice/Player/PlayerPayment/PaymentSlice'

const ScoutProfile = () => {


  const VerifiedStatus = useSelector((state)=> state.reducer?.ScoutProfileSlice?.VerificationStatusData?.data)
  // console.log('verification ', VerifiedStatus)
  let progress = VerifiedStatus?.identification + VerifiedStatus?.profile_pics +  VerifiedStatus?.physical_stat +  VerifiedStatus?.images +  VerifiedStatus?.videos;
  useEffect(()=>{
    if(VerifiedStatus?.videos == 20){
      setCheckedVideoLink(true)
    }
    if(VerifiedStatus?.physical_stat == 20){
      setCheckedPhysicalStats(true)
    }
    if(VerifiedStatus?.images == 20){
      setCheckedUploadPics(true)
    }
    if(VerifiedStatus?.identification == 20){
      setCheckedMeansofID(true)
    }
    if(VerifiedStatus?.profile_pics == 20){
      setCheckedProfilePic(true)
    }
  },[VerifiedStatus])


      
      const [imgloader, setImgLoader] =useState(false)

  const [fileimg, setFileImg] = useState(null);
  const [picFile, setPicFile] = useState(null);
  const [loader, setLoader] = useState(false)
  const [checkedVideoLink, setCheckedVideoLink] = useState(false)
  const [checkedProfilePic, setCheckedProfilePic] = useState(false)
  const [checkedPhysicalStats, setCheckedPhysicalStats] = useState(false)
  const [checkedUploadPics, setCheckedUploadPics] = useState(false)
  const [checkedMeansofID, setCheckedMeansofID] = useState(false)
  const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // await dispatch(resetScoutProfileSlice())
        // UserLogout()
    await dispatch(resetLoginSlice())
    await dispatch(resetPlayerDealSlice())
    await dispatch(resetPlayerFanDealSlice())
    await dispatch(resetPlayerHomepageSlice())
    await dispatch(resetManagerSlice())
    await dispatch(resetPaymentSlice())
    await dispatch(resetViewSlice())
    await dispatch(resetPlayerProfileSlice())
    await dispatch(resetFanDealSlice())
    await dispatch(resetFanProfileSlice())
    await dispatch(resetScoutProfileSlice())
    await dispatch(resetScoutDealSlice())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const data = [
        {id: 1, pathTo: '/afrisport/scout/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/scout/deal', pathName: 'Deals'}
    ]
    function handleChange(e) {
      // console.log(e.target.files[0])
      setPicFile(e.target.files[0])
      setFileImg(URL.createObjectURL(e.target.files[0]));
    }

    
    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const userDataInfo = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user)

    const PlayerDetails = useSelector((state)=>state?.reducer?.ScoutProfileAction?.ScoutAllProfileDetailsData?.data)

    useEffect(()=>{
      const checkingVerification = async() =>{
        setLoader(true)
        await dispatch(ProfileDetailsScout(userId))
        await dispatch(GetMarketPriceApi())
        // setFileImg(PlayerDetails?.profile_pics)
        setLoader(false)
      }
      checkingVerification()
    },[])


    const handleImgSubmit = async (e) =>{
      e.preventDefault()
      const formData = new FormData();
      formData.append('profile', picFile)
      formData.append('id', userId)
      
        setImgLoader(true)
        await dispatch(ScoutProfilePicture(formData))
        // await dispatch(ScoutProfileVerificationStatus())
        setImgLoader(false)
    }


    useEffect(() => {
      setFileImg(PlayerDetails?.profile_pics);
    }, [PlayerDetails]);

  return (  
    <div className="Scoutpage_maxWidthContainer">
    <div  className='Scoutpage_contents'>
      <ToastContainer />
        <div className='Scoutpage_AccountLogout_div'>
            <p className='Scoutpage_AccountWord'>Account</p>
            <p className='Scoutpage_AccountWord' style={{cursor:'pointer'}} onClick={handleLogout}>Logout <RxExit /></p>
        </div>
        <div className='Scoutpage_LinkPages'>
           {data.map((each, index)=>(
             <NavLink to={each?.pathTo} key={index} className={({isActive})=> (isActive ? 'Scoutpage_Profileactivepage':'Scoutpage_Profilepage')}>{each?.pathName}</NavLink>
            ))}
        </div>
    <div className='Scoutpage_ProfileContent'>
      <div className='Scoutpage_ProfileContent_editformside'>
        <div className='Scoutpage_Profile_ImgVerificationSec'>
          <div className='Scoutpage_Profile_ImgNameSec'>
            <form onSubmit={handleImgSubmit}  
            style={{display:'flex',flexDirection:'column', alignItems:'center'}} >
            <label className="ProfileName_InputImage" for='imagePlcholder'>
              <img src={fileimg} className="Scoutpage_Profile_placeholder" />
          <input 
          type='file'
           id='imagePlcholder' 
          onChange={handleChange} 
          className='Scoutpage_Profile_ImagePlaceInput' 
          />
          <div className="ImageHolder_PrifilepicImg">
            <AiFillCamera className="Profile_EditCameraImg" />
          </div>
          </label>
          
          <button type='submit' className='Scoutpage_Profileform_savebutton'>
            {imgloader ? <CircularProgress size={15} /> : <span>Save photo</span>}
            </button>
          </form>
          <div className='Scoutpage_Profile_nameVerify'>
            {PlayerDetails? <p className='Scoutpage_profile_Username'>{`${PlayerDetails?.firstname } ${PlayerDetails?.surname }`}</p>:<p className='Scoutpage_profile_Username'>{`${userDataInfo?.firstname } ${userDataInfo?.surname }`}</p>}
            <p className='Scoutpage_profile_Usertype'>Scout Account</p>
          </div>
          </div>
          {/* <Link to='/afrisport/player/viewprofile' className='Scoutpage_Profile_Viewprofilebutton'>View Profile</Link> */}
        </div>
        <ScoutProfileProfileform userId={userId} />
        <ScoutProfileUploadId userId={userId}/>
      </div>
      {/* <div className='ScoutProfile_VerificationCol'>
        <div className='ScoutProfile_VerificationDiv'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Verify Account</p>
        <p className='ScoutProfile_VerifyAccountText'>Your profile is not visible. Complete 3 more tasks to level up to</p>
        <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    <div className='ScoutProfile_VerifyAccountCheckdiv'>
      <input type='radio' checked={checkedVideoLink} />
      <p className='ScoutProfile_VerifyAccountCheck_Text'>Add a Youtube link to a Video of your showcasing skillsets</p>
    </div>
    <div className='ScoutProfile_VerifyAccountCheckdiv'>
      <input type='radio' checked={checkedProfilePic} />
      <p className='ScoutProfile_VerifyAccountCheck_Text'>Upload a Profile Picture of Your Actial face</p>
    </div>
    <div className='ScoutProfile_VerifyAccountCheckdiv'>
      <input type='radio' checked={checkedPhysicalStats} />
      <p className='ScoutProfile_VerifyAccountCheck_Text'>Add all Your Physical Stats</p>
    </div>
    <div className='ScoutProfile_VerifyAccountCheckdiv'>
      <input type='radio' checked={checkedUploadPics} />
      <p className='ScoutProfile_VerifyAccountCheck_Text'>Upload 5 pictures of yourself</p>
    </div>
    <div className='ScoutProfile_VerifyAccountCheckdiv'>
      <input type='radio' checked={checkedMeansofID} />
      <p className='ScoutProfile_VerifyAccountCheck_Text'>Upload Means of ID</p>
    </div>
    <button className='ScoutProfile_Profileform_SendRequest'>Send Request</button>
        </div>
      </div> */}
        </div>
    </div>
    </div>
  )
}

export default ScoutProfile