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
import { ProfileDetailsScout, ScoutProfilePicture, ScoutProfileVerificationStatus, reset as resetScoutProfileSlice } from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice";
import ScoutProfileProfileform from './ScoutProfileProfileform'
import ScoutProfileUploadId from './ScoutProfileUploadId'
import { UserLogout } from '../Player/UserLogOut'

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

  const [file, setFile] = useState(imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);
  const [checkedVideoLink, setCheckedVideoLink] = useState(false)
  const [checkedProfilePic, setCheckedProfilePic] = useState(false)
  const [checkedPhysicalStats, setCheckedPhysicalStats] = useState(false)
  const [checkedUploadPics, setCheckedUploadPics] = useState(false)
  const [checkedMeansofID, setCheckedMeansofID] = useState(false)
  const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // await dispatch(resetScoutProfileSlice())
        UserLogout()
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
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    


    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user?.id)
    const userDataInfo = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.data?.user)

    const PlayerDetails = useSelector((state)=>state?.reducer?.ScoutProfileAction?.ScoutAllProfileDetailsData?.data)

    useEffect(()=>{
      const checkingVerification = async() =>{
        await dispatch(ProfileDetailsScout(userId))
        // await dispatch(ScoutProfileVerificationStatus(userId))
        setFile(PlayerDetails?.profile_pics)
      }
      checkingVerification()
    },[])

    useEffect(()=>{
      setFile(PlayerDetails?.profile_pics)
    },[PlayerDetails])

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



  return (  
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
            <form onSubmit={handleImgSubmit}  style={{display:'flex',flexDirection:'column', alignItems:'center'}} >
            <label for='imagePlcholder'>
          <img src={file} className='Scoutpage_Profile_placeholder' width='132px' height='136px' />
          <input type='file' id='imagePlcholder' onChange={handleChange} className='Scoutpage_Profile_ImagePlaceInput' />
          </label>
          
          <button type='submit' className='Scoutpage_Profileform_savebutton'>
            {imgloader ? <CircularProgress size={15} /> : <span>Upload photo</span>}
            </button>
          </form>
          <div className='Scoutpage_Profile_nameVerify'>
            <p className='Scoutpage_profile_Username'>{`${userDataInfo?.firstname } ${userDataInfo?.surname }`}</p>
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
  )
}

export default ScoutProfile