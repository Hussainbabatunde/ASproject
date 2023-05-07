import React from 'react'
import './profileform.css'

const ScoutProfileVideo = () => {
  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Video</p>
        <p className='Scoutpage_Profile_filldetailstext'>Share a video or more of yourself in action must be from <b>Google Drive</b></p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Link to Video' />
        
        <button type='button' className='Scoutpage_Profileform_savebutton'>Save</button>
    </form>
  )
}

export default ScoutProfileVideo