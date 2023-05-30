import React, { useEffect, useState } from 'react'
import '../Scout/profileform.css'
import {TbCurrencyNaira} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerProfileBusinessServiceApi, PlayerProfileVerificationStatus, ProfileDetailsPlayer } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { CircularProgress } from '@mui/material'

const PlayerProfileFanService = ({userId}) => {
    const [priceType, setPriceType] = useState('range')
    const [isChecked, setIsChecked] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [pricingBusiness, setPricingBusiness] = useState({})
    const [amtStatedfrom, setAmtStatedFrom] = useState('')
    const [amtStatedTo, setAmtStatedTo] = useState('')
    const [amtActual, setAmtActual] = useState('')
    const dispatch = useDispatch()
    const [loadBusinessService, setLoadBusinessService] = useState(false)

    const PlayerDetails = useSelector((state)=>state?.reducer?.PlayerProfileSlice?.AllProfileDetailsData?.data)

   

    // const handleChangeBusinessPricing = (e) =>{
    //   setAmtStated({...amtStated, [e.target.name]: e.target.value})
    // }
    const handleSubmitPhysicalStats =  async (event) =>{
      event.preventDefault()
      pricingBusiness.user_id = userId
      pricingBusiness.service_type = priceType
      if(priceType == 'range'){
        pricingBusiness.minimum = amtStatedfrom
        pricingBusiness.maximum = amtStatedTo
      }
      else if(priceType == 'actual'){
        pricingBusiness.amount = `${amtActual}`
      }
      else if(priceType == 'open'){
        pricingBusiness.amount = ''
      }
      else if(priceType == 'free'){
        pricingBusiness.amount = ''
      }
      // console.log(pricingBusiness)
      setLoadBusinessService(true)
      await dispatch(PlayerProfileBusinessServiceApi(pricingBusiness))
      await dispatch(PlayerProfileVerificationStatus(userId))
      await dispatch(ProfileDetailsPlayer())
      setLoadBusinessService(false)
    }

    

      useEffect(()=>{
        if(PlayerDetails){
          if(PlayerDetails?.price?.service_type == 'range'){
            setPriceType(PlayerDetails?.price?.service_type)
          // const myString = PlayerDetails?.price?.amount;
          setAmtStatedFrom(PlayerDetails?.price?.minimum)
          setAmtStatedTo(PlayerDetails?.price?.maximum)
          setIsChecked2(false);
          setIsChecked3(false);
          setIsChecked4(false);
        }
         
         
        // setAvailable(PlayerDetails?.bio?.available)
        // setAbout(PlayerDetails?.bio?.about)
        }
      },[PlayerDetails])

      const handleAmountFrom = (e) =>{
        setAmtStatedFrom(e.target.value)
      }
      const handleAmountTo = (e) =>{
        setAmtStatedTo(e.target.value)
      }
      const handleAmtActual = (e) =>{
        setAmtActual(e.target.value)
      }

  return (
    <form onSubmit={handleSubmitPhysicalStats} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Fan Service Price</p>
        
        
      
        <div>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Video Service </p>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' name='preferred' value={amtActual}  onChange={handleAmtActual} className='Scoutprofile_frominput' required/>
                </div>

                <p className='Scoutpage_Profile_Profileformlabelnexttext'>Photo Service </p>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' name='preferred' value={amtActual}  onChange={handleAmtActual} className='Scoutprofile_frominput' required/>
                </div>
        
        </div>
        
        
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
        {loadBusinessService? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfileFanService



