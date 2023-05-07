import React, { useState } from 'react'
import '../Scout/profileform.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {FaRegImages} from 'react-icons/fa'
import { PlayerProfileUploadIdApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'

const PlayerProfileUploadId = ({userId}) => {

    const [fileUploadId, setFileUploadId] = useState(imgPlaceHolder);
    const [uploadId, setUploadId] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const [loadUploadId, setLoadUploadId] = useState(false)
    const dispatch = useDispatch()
    function handleUploadIdChange(e) {
        setUploadId(e.target.files[0])
        setFileUploadId(URL.createObjectURL(e.target.files[0]));
        setUploaded(true)
    }

    const handleUploadIdSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('identification', uploadId)
        formData.append('id', userId)
        
        setLoadUploadId(true)
          await dispatch(PlayerProfileUploadIdApi(formData))
          setLoadUploadId(false)
      }

  return (
    <form onSubmit={handleUploadIdSubmit} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Upload ID</p>
        <p className='Scoutpage_Profile_filldetailstext'>Verification by means of ID, International Passport, NIN</p>
        <label for='UploadId' className='Scoutpage_Profileform_SelectImage' >Select Image</label>
        <input type='file' id='UploadId' onChange={handleUploadIdChange} className='Scoutpage_Profile_ImagePlaceInput' />
        
        {uploaded && <div className='Scoutpage_Profileform_ImgIploaded'>
            <div className='Scoutpage_Profileform_UploadIDImg'>
                <img src={fileUploadId} width='100px' height='100px' />
                <p style={{marginLeft: '20px'}}> 100 x 100</p>
            </div>
            <RiDeleteBin6Fill style={{fontSize: '25px'}} />
        </div>}
        
        <button type='submit' className='Scoutpage_Profileform_uploadButton'><FaRegImages style={{fontSize:'18px', marginRight:'5px'}} />
        {loadUploadId ? <CircularProgress size={15} /> : <span>Upload photo</span>}
         </button>
    </form>
  )
}

export default PlayerProfileUploadId