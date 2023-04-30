import React, { useState } from 'react'
import './ScoutProfile.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import { Link } from 'react-router-dom'
import Profileform from './Profileform'
import PhysicalStats from './PhysicalStats'
import BusinessService from './BusinessService'

const ScoutProfile = () => {

  const [file, setFile] = useState(imgPlaceHolder);
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  return (  
    <div className='Scoutpage_ProfileContent'>
      <div className='Scoutpage_ProfileContent_editformside'>
        <div className='Scoutpage_Profile_ImgVerificationSec'>
          <div className='Scoutpage_Profile_ImgNameSec'>
            <label for='imagePlcholder' >
          <img src={file} className='Scoutpage_Profile_placeholder' width='132px' height='136px' />
          <input type='file' id='imagePlcholder' onChange={handleChange} className='Scoutpage_Profile_ImagePlaceInput' />
          </label>
          <div className='Scoutpage_Profile_nameVerify'>
            <p className='Scoutpage_profile_Username'>clement bazuaye <span className='Scoutpage_Profile_Verificationstatus'>(not Verified)</span></p>
            <p className='Scoutpage_profile_Usertype'>Player Account</p>
          </div>
          </div>
          <Link className='Scoutpage_Profile_Viewprofilebutton'>View Profile</Link>
        </div>
        <Profileform />
        <PhysicalStats />
        <BusinessService />
      </div>
    </div>
  )
}

export default ScoutProfile