import React, { useState } from 'react'
import '../Scout/profileform.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {FaRegImages} from 'react-icons/fa'

const PlayerProfileUploadId = () => {

    const [file, setFile] = useState(imgPlaceHolder);
    const [uploaded, setUploaded] = useState(false)
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        setUploaded(true)
    }

  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Upload ID</p>
        <p className='Scoutpage_Profile_filldetailstext'>Verification by means of ID, International Passport, NIN</p>
        <label for='UploadId' className='Scoutpage_Profileform_SelectImage' >Select Image</label>
        <input type='file' id='UploadId' onChange={handleChange} className='Scoutpage_Profile_ImagePlaceInput' />
        
        {uploaded && <div className='Scoutpage_Profileform_ImgIploaded'>
            <div className='Scoutpage_Profileform_UploadIDImg'>
                <img src={file} width='100px' height='100px' />
                <p style={{marginLeft: '20px'}}> 100 x 100</p>
            </div>
            <RiDeleteBin6Fill style={{fontSize: '25px'}} />
        </div>}
        
        <button className='Scoutpage_Profileform_uploadButton'><FaRegImages style={{fontSize:'18px', marginRight:'5px'}} /> Upload Photo</button>
    </form>
  )
}

export default PlayerProfileUploadId