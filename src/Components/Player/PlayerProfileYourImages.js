import React, { useState } from 'react'
import '../Scout/profileform.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {FaRegImages} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { CircularProgress } from '@mui/material'
import { PlayerProfileVerificationStatus, PlayerYourImagesApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { toast } from 'react-toastify'

const PlayerProfileYourImages = ({userId}) => {

    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploaded2, setUploaded2] = useState(false)
    const [loadYourImages, setLoadYourImages] = useState(false)
    const dispatch = useDispatch()
    // const handleMultipleImages =(evnt)=>{
    //     const selectedFIles =[];
    //     const targetFiles =evnt.target.files;
    //     const targetFilesObject= [...targetFiles]
    //     targetFilesObject.map((file)=>{
    //        return selectedFIles.push(URL.createObjectURL(file))
    //     })
    //     setImages(selectedFIles);
    //     setUploaded2(true)
    //   }

    const handleMultipleImages = (e) => {
            setUploaded2(true)
        const files = Array.from(e.target.files);
        if (files.length > 0) {
          setImages([...images, ...files]);
          Promise.all(
            files.map((file) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
              });
            })
          ).then((results) => {
            setPreviewUrls([...previewUrls, ...results]);
          });
        }
      };

      const handleYourImagesSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData();
        if (images.length < 5){
          toast.error("Upload 5 pictures of Yourself", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
        for(let i =0; i < images.length; i++){
        formData.append('user_images[]', images[i])
    }
  
        formData.append('id', userId)
        // for (const [name, value] of formData.entries()) {
        //     console.log(`${name}: ${value}`);
        //   }
        setLoadYourImages(true)
          await dispatch(PlayerYourImagesApi(formData))
          await dispatch(PlayerProfileVerificationStatus(userId))
          setLoadYourImages(false)
  }
      }

      const handleDeleteImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        console.log('images ',images)
      
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
      };


  return (
    <form onSubmit={handleYourImagesSubmit} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Your Images</p>
        <p className='Scoutpage_Profile_filldetailstext'>Please provide different images of yourself, a standard photo and you on the field.</p>
        <label for='YourImages' className='Scoutpage_Profileform_savebutton' >Select Images</label>
        <input type='file' id='YourImages' onChange={handleMultipleImages} multiple className='Scoutpage_Profile_ImagePlaceInput' />
        
        {uploaded2 && 
        
        previewUrls.map((url, index)=>{
            return (<div className='Scoutpage_Profileform_ImgIploaded'>
            <div className='Scoutpage_Profileform_UploadIDImg'>
                <img src={url} width='100px' height='100px' />
                <p style={{marginLeft: '20px'}}> 100 x 100</p>
            </div>
            <RiDeleteBin6Fill onClick={() => handleDeleteImage(index)} style={{fontSize: '25px', cursor:'pointer'}} />
        </div>)})
        }
        
        <button type='submit' className='Scoutpage_Profileform_uploadButton'><FaRegImages style={{fontSize:'18px', marginRight:'5px'}} />
        {loadYourImages ? <CircularProgress size={15} /> : <span>Upload photo</span>}
         </button>
    </form>
  )
}

export default PlayerProfileYourImages