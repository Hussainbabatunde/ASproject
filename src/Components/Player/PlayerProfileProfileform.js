import React, { useState } from 'react'
import '../Scout/profileform.css'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { PlayerProfileProfileformApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'

const PlayerProfileProfileform = ({userId}) => {

  const [profileInfo, setProfileInfo] = useState({})
  const dispatch = useDispatch()
  const [loadProfileform, setLoadProfileform] = useState(false)
  const handleProfileform = (e) =>{
    setProfileInfo({...profileInfo, [e.target.name]: e.target.value})
  }
  const userDataLogin = useSelector((state)=> state?.reducer?.LoginSlice?.logindata?.message)

  const handleSubmitProfileform =  async (event) =>{
    event.preventDefault()
    profileInfo.user_id = userId
    setLoadProfileform(true)
    await dispatch(PlayerProfileProfileformApi(profileInfo))
    setLoadProfileform(false)
  }
  const available_form = 1
  const notavailable_form = 0


  return (
    <form onSubmit={handleSubmitProfileform} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Profile Details</p>
        <p className='Scoutpage_Profile_filldetailstext'>Fill in the following details</p>
        <p className='Scoutpage_Profile_Profileformlabeltext'>Full Name</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' value={`${userDataLogin?.firstname } ${userDataLogin?.surname }`} placeholder='first name and last name' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Email Address</p>
        <input type='email' className='Scoutpage_Profile_ProfileformlabelInput' value={userDataLogin?.email} placeholder='abc@mail.com' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Phone Number</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' value={userDataLogin?.phone} placeholder='08000000000000' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Current Club</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput'  onChange={handleProfileform} name='current_club' placeholder='Name of Club' required/>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Availability</p>
        <select required name='available' onChange={handleProfileform} className='Scoutpage_Profile_ProfileformlabelInput'>
        <option disabled></option>
            <option value={available_form} >Available</option>
            <option value={notavailable_form}>Not Available</option>
        </select>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Bio of Yourself</p>
        <textarea placeholder='Write about yourself' required  name='about' onChange={handleProfileform} className='Scoutpage_Profile_Profileformlabeltextarea'></textarea>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Location</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='location' onChange={handleProfileform} placeholder='Country of Residence' required/>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Home Town</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput'  name='home_town' onChange={handleProfileform} placeholder='---' required/>

        <button type='submit' className='Scoutpage_Profileform_savebutton'>
         {loadProfileform? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfileProfileform