import React, { useEffect, useState } from 'react'
import '../Scout/profileform.css'
import {TbCurrencyNaira} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerProfileBusinessServiceApi, PlayerProfileFanServiceApi, PlayerProfileVerificationStatus, ProfileDetailsPlayer } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { CircularProgress } from '@mui/material'

const PlayerProfileFanService = ({userId}) => {

    const dispatch = useDispatch()
    const [loadFanService, setLoadFanService] = useState(false)
    const [imgPrice, setImgPrice] = useState('')
    const [videoPrice, setVideoPrice] = useState('')

    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)
  

    const handleSubmitFanService =  async (event) =>{
      event.preventDefault()
      const fanPricing = {}
      fanPricing.image_price = imgPrice
      fanPricing.video_price = videoPrice
      
      // console.log(fanPricing)
      setLoadFanService(true)
      await dispatch(PlayerProfileFanServiceApi(fanPricing))
      setLoadFanService(false)
    }

    const handleVideoPrice = (e) =>{
      setVideoPrice(e.target.value)
    }

    const handleImgPrice = (e) =>{
      setImgPrice(e.target.value)
    }
    

      useEffect(()=>{
        if(PlayerDetails){
          setImgPrice(PlayerDetails?.fanprice?.image_price)
          setVideoPrice(PlayerDetails?.fanprice?.video_price)
         
        }
      },[PlayerDetails])


  return (
    <form onSubmit={handleSubmitFanService} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Fan Service Price</p>
        
        
      
        <div>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Video Service </p>
                <div className='Scoutprofile_nairainput'>
                    $
                <input type='text' name='preferred' value={videoPrice}  onChange={handleVideoPrice} className='Scoutprofile_frominput' required/>
                </div>

                <p className='Scoutpage_Profile_Profileformlabelnexttext'>Photo Service </p>
                <div className='Scoutprofile_nairainput'>
                    $
                <input type='text' name='preferred' value={imgPrice}  onChange={handleImgPrice} className='Scoutprofile_frominput' required/>
                </div>
        
        </div>
        
        
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
        {loadFanService? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfileFanService



