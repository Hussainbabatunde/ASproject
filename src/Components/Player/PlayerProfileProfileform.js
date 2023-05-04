import React from 'react'
import '../Scout/profileform.css'

const PlayerProfileProfileform = () => {
  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Profile Details</p>
        <p className='Scoutpage_Profile_filldetailstext'>Fill in the following details</p>
        <p className='Scoutpage_Profile_Profileformlabeltext'>Full Name</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='first name and last name' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Email Address</p>
        <input type='email' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='abc@mail.com' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Phone Number</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='08000000000000' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Current Club</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Name of Club' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Availability</p>
        <select className='Scoutpage_Profile_ProfileformlabelInput'>
            <option>Available</option>
            <option>Not Available</option>
        </select>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Bio of Yourself</p>
        <textarea placeholder='Write about yourself' className='Scoutpage_Profile_Profileformlabeltextarea'></textarea>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Location</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Country of Residence' />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Home Town</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='---' />
        <button className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default PlayerProfileProfileform