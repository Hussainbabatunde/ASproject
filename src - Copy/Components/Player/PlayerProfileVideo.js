import React from 'react'
import '../Scout/profileform.css'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import { CircularProgress } from '@mui/material'

const PlayerProfileVideo = ({addInput, videoLoader, handleSubmitVideos, handleInputChange, inputs, removeInput}) => {
  return (
    <form onSubmit={handleSubmitVideos} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Video</p>
        <p className='Scoutpage_Profile_filldetailstext'>Share a video or more of yourself in action must be from <b>Google Drive</b></p>
        {inputs.map((input, index) => (
        <div key={index} className='Scoutpage_Profile_VideoUploadDiv'>
        <input type='text'
        value={input}
        onChange={(e) => handleInputChange(e.target.value, index)}
         className='Scoutpage_Profile_ProfileformlabelInput' placeholder='Link to Video' />

            <RiDeleteBin6Fill onClick={() => removeInput(index)} style={{fontSize: '25px', cursor:'pointer'}} />
        </div>))}
        <button type='button'  onClick={addInput} className='Scoutpage_Profileform_AddmoreVideos'>Add more</button>
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
        {videoLoader? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfileVideo