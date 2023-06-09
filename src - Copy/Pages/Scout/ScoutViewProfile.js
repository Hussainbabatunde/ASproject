import React from 'react'
import './ScoutViewProfile.css'
import { Link } from 'react-router-dom'
import {GrFormNext} from 'react-icons/gr'
import {BsShareFill} from 'react-icons/bs'
import imgPlaceholder from '../../assets/imgPlaceholder.png'
import {BsFillPatchCheckFill, BsHouseDoor, BsDot} from 'react-icons/bs'
import {MdOutlineDashboard} from 'react-icons/md'
import {SlLocationPin} from 'react-icons/sl'
import {RiDashboardLine} from 'react-icons/ri'
import PlayerImg from '../../assets/Player1.png'


const ScoutViewProfile = () => {
  return (
    <div className='ScoutViewProfile'>
        <div className='ScoutViewProfile_navigation'>
            <div className='ScoutViewProfile_navigationprogress'>
                <Link to='/afrisport/scout/profile' className='ScoutViewProfile_navigationback'>Back</Link>
                <GrFormNext style={{fontSize:'16px'}} />
                <p className='ScoutViewProfile_navigationprofile'>Profile</p>
            </div>
            <Link className='ScoutViewProfile_share'> <BsShareFill style={{color:'rgba(150, 150, 150, 1)'}} /> <span style={{color:'rgba(150, 150, 150, 1)', marginLeft:'10px'}}>Share</span></Link>
        </div>
        <div className='ScoutViewProfile_UserProfileSection'>
          <div className='ScoutViewProfile_UserProfiledetailsSection'>
            <img src={imgPlaceholder} alt='image placeholder' className='ScoutViewProfile_UserProfileImage' />
            <div>
              <p className='ScoutViewProfile_UserProfiledetailsUsername'>Bola Bazz <BsFillPatchCheckFill style={{fontSize:'22px', color:'#0F7BEF', marginLeft:'10px'}} /></p>
              <p className='ScoutViewProfile_UserProfileScore'>Score: 60/100</p>
              <p className='ScoutViewProfile_UserProfileCurrentlyAvailable'>Currently Available</p>
              <div className='ScoutViewProfile_UserProfilePositionSection'>
                <p className='ScoutViewProfile_UserProfilePosition'>Striker</p>
                <p className='ScoutViewProfile_UserProfilePosition'>Midfielders</p>
                </div>

                <p className='ScoutViewProfile_UserProfilePricerange'>Contract: $30000 - $6000</p>
            </div>
          </div>

          <button className='ScoutViewProfile_AdvertiseProfile'>Advertise Profile</button>
        </div>
        <div className='ScoutViewProfile_AboutSection'>
            <p className='ScoutViewProfile_AboutTopicText'>About</p>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'>66</p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Biography</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Former Previous Club, Bola Bazz is a legendary football player known for his incredible speed and precision on the field. With a long list of accolades, he remains one of the most dominant forces in the sport to this day.</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><MdOutlineDashboard /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Current Club</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Dynamite Africa</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><SlLocationPin /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Location</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Nigeria, Lagos.</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><BsHouseDoor /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Hometown</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Ketu, Lagos.</p>
              </div>
            </div>
            <div className='ScoutViewProfile_AboutSectionInfo'>
              <p className='ScoutViewProfile_AboutSectionIcon'><RiDashboardLine /></p>
              <div>
                <p className='ScoutViewProfile_AboutSectionIconTopic'>Interest</p>
                <p className='ScoutViewProfile_AboutSectionIconText'>Gamming, Singing.</p>
              </div>
            </div>
            <p className='ScoutViewProfile_PhysicalStatsText'>Physical Stats</p>
            <div className='ScoutViewProfile_PhysicalStatsInfo'>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Gender: Male</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Height: 67ft</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Language: English</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Weight: 48kg</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Religion: Christian</p>
              <p className='ScoutViewProfile_PhysicalStatsGender'>Stronger foot: Right</p>
            </div>
        </div>
        <p className='ScoutViewProfile_PhysicalStatsText'>Images <BsDot style={{fontSize:'25px'}}/> 6 </p>
        <div className='ScoutViewProfile_ImageSection'>
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
            <img src={PlayerImg} className='ScoutViewProfile_Image' />
        </div>
        <p className='ScoutViewProfile_PhysicalStatsText'>Video <BsDot style={{fontSize:'25px'}}/> 4 </p>
    </div>
  )
}

export default ScoutViewProfile