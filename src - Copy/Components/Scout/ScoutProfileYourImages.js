import React, { useState } from 'react'
import './profileform.css'
import imgPlaceHolder from '../../assets/imageplaceholder.png'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {FaRegImages} from 'react-icons/fa'

const ScoutProfileYourImages = () => {

    const [images, setImages] = useState([]);
    const [uploaded2, setUploaded2] = useState(false)
    const handleMultipleImages =(evnt)=>{
        const selectedFIles =[];
        const targetFiles =evnt.target.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file)=>{
           return selectedFIles.push(URL.createObjectURL(file))
        })
        setImages(selectedFIles);
        setUploaded2(true)
      }


  return (
    <form className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Upload ID</p>
        <p className='Scoutpage_Profile_filldetailstext'>Verification by means of ID, International Passport, NIN</p>
        <label for='YourImages' className='Scoutpage_Profileform_SelectImage' >Select Images</label>
        <input type='file' id='YourImages' onChange={handleMultipleImages} multiple className='Scoutpage_Profile_ImagePlaceInput' />
        
        {uploaded2 && 
        
        images.map((url)=>{
            return (<div className='Scoutpage_Profileform_ImgIploaded'>
            <div className='Scoutpage_Profileform_UploadIDImg'>
                <img src={url} width='100px' height='100px' />
                <p style={{marginLeft: '20px'}}> 100 x 100</p>
            </div>
            <RiDeleteBin6Fill style={{fontSize: '25px'}} />
        </div>)})
        }
        
        <button type='button' className='Scoutpage_Profileform_uploadButton'><FaRegImages style={{fontSize:'18px', marginRight:'5px'}} /> Upload Photo</button>
    </form>
  )
}

export default ScoutProfileYourImages