import React, { useState } from 'react'
import './profileform.css'

const ScoutProfileProfileform = () => {
  const [profileInfo, setProfileInfo] = useState({})
  const handleProfileform = (e) =>{
    setProfileInfo({...profileInfo, [e.target.name]: e.target.value})
  }

  const handleSubmitProfileform =  (event) =>{
    event.preventDefault()
    console.log(profileInfo)
    return false;
  }


  return (
    <form  className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Profile Details</p>
        <p className='Scoutpage_Profile_filldetailstext'>Fill in the following details</p>
        <p className='Scoutpage_Profile_Profileformlabeltext'>Full Name</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='first name and last name' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Email Address</p>
        <input type='email' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='abc@mail.com' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Phone Number</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='phone_number' placeholder='08000000000000' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Current Club</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' onChange={handleProfileform} name='current_club' placeholder='Name of Club' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Availability</p>
        <select name='available' onChange={handleProfileform} className='Scoutpage_Profile_ProfileformlabelInput'>
          <option></option>
            <option value='1'>Available</option>
            <option value='0'>Not Available</option>
        </select>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Bio of Yourself</p>
        <textarea placeholder='Write about yourself' name='about' onChange={handleProfileform} className='Scoutpage_Profile_Profileformlabeltextarea'></textarea>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Location</p>
        <input type='text' name='location' onChange={handleProfileform} className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Country of Residence' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Home Town</p>
        <input type='text' name='home_town' onChange={handleProfileform}   className='Scoutpage_Profile_ProfileformlabelInput' placeholder='---' />

        <button onClick={handleSubmitProfileform} type='button' className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default ScoutProfileProfileform