import React, { useState } from 'react'
import '../Scout/ScoutProfile.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { ScoutProfilePicture } from '../../Slice/Scout/Scoutprofile/ScoutProfileSlice'
import { LogoutAuth } from '../../Slice/auth/Login'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import PlayerProfileProfileform from './PlayerProfileProfileform'
import PlayerProfileBusinessService from './PlayerProfileBusinessService'
import PlayerProfileUploadId from './PlayerProfileUploadId'
import PlayerProfileYourImages from './PlayerProfileYourImages'
import PlayerProfileVideo from './PlayerProfileVideo'
import PlayerProfilePhysicalStats from './PlayerProfilePhysicalStats'
import { PlayerProfilePicture } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { ToastContainer } from 'react-toastify'

const PlayerProfile = () => {

  const progress = '70';

  const Parentdiv = {
        height: '1rem',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: '#91BE3F',
       borderRadius:40,
        textAlign: 'right',
        marginTop: 10
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }

      
      const [imgloader, setImgLoader] =useState(false)

  const [file, setFile] = useState(imgPlaceHolder);
  const [picFile, setPicFile] = useState(null);
  const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Deals'},
        {id: 3, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 4, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]
    function handleChange(e) {
      // console.log(e.target.files[0])
      setPicFile(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    const userId = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.message?.id)
    // console.log('user ', userId)

    const handleImgSubmit = async (e) =>{
      e.preventDefault()
      const formData = new FormData();
      formData.append('profile', picFile)
      formData.append('id', userId)
      
        setImgLoader(true)
        await dispatch(PlayerProfilePicture(formData))
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
            <p className='Scoutpage_profile_Username'>clement bazuaye <span className='Scoutpage_Profile_Verificationstatus'>(not Verified)</span></p>
            <p className='Scoutpage_profile_Usertype'>Player Account</p>
          </div>
          </div>
          <Link to='/afrisport/player/viewprofile' className='Scoutpage_Profile_Viewprofilebutton'>View Profile</Link>
        </div>
        <PlayerProfileProfileform userId={userId} />
        <PlayerProfilePhysicalStats userId={userId} />
        <PlayerProfileBusinessService userId={userId} />
        <PlayerProfileUploadId userId={userId}/>
        <PlayerProfileYourImages />
        <PlayerProfileVideo />
      </div>
      <div className='ScoutProfile_VerificationCol'>
        <div className='ScoutProfile_VerificationDiv'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Verify Account</p>
        <p className='ScoutProfile_VerifyAccountText'>Your profile is not visible. Complete 3 more tasks to level up to</p>
        <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    <button className='ScoutProfile_Profileform_SendRequest'>Send Request</button>
        </div>
      </div>
        </div>
    </div>
  )
}

export default PlayerProfile