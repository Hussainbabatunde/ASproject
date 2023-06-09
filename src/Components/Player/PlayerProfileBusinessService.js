import React, { useEffect, useState } from 'react'
import '../Scout/profileform.css'
import {TbCurrencyNaira} from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerProfileBusinessServiceApi, PlayerProfileVerificationStatus, ProfileDetailsPlayer } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { CircularProgress } from '@mui/material'

const PlayerProfileBusinessService = ({userId}) => {
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
// console.log('player details ', PlayerDetails)
   

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
        pricingBusiness.minimum = `${amtActual}`
        pricingBusiness.maximum = `${amtActual}`
      }
      else if(priceType == 'open'){
        pricingBusiness.minimum = 'open'
        pricingBusiness.maximum = 'open'
      }
      else if(priceType == 'free'){
        pricingBusiness.minimum = 'free'
        pricingBusiness.maximum = 'free'
      }
      // console.log('tunde ',pricingBusiness)
      setLoadBusinessService(true)
      await dispatch(PlayerProfileBusinessServiceApi(pricingBusiness))
      await dispatch(PlayerProfileVerificationStatus(userId))
      await dispatch(ProfileDetailsPlayer())
      setLoadBusinessService(false)
    }

    const handleRadioButtonChange = () => {
        setIsChecked(!isChecked);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setPriceType('range')
      }; 
      const handleRadioButtonChange2 = () => {
        setIsChecked2(!isChecked2);
        setIsChecked(false);
        setIsChecked3(false);
        setIsChecked4(false);
        setPriceType('actual')
      };
      const handleRadioButtonChange3 = () => {
        setIsChecked3(!isChecked3);
        setIsChecked(false);
        setIsChecked2(false);
        setIsChecked4(false);
        setPriceType('open')
      };
      const handleRadioButtonChange4 = () => {
        setIsChecked4(!isChecked4);
        setIsChecked2(false);
        setIsChecked3(false);
        setIsChecked(false);
        setPriceType('free')
      };

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
          if(PlayerDetails?.price?.service_type == 'actual'){
            setAmtActual(PlayerDetails?.price?.amount)
            setPriceType(PlayerDetails?.price?.service_type)
            // handleRadioButtonChange2()
            setIsChecked2(true);
            setIsChecked(false)
            setIsChecked3(false);
            setIsChecked4(false);
          }
          if(PlayerDetails?.price?.service_type == 'open'){
            setAmtActual(PlayerDetails?.price?.amount)
            setPriceType(PlayerDetails?.price?.service_type)
            setIsChecked3(true);
            setIsChecked(false);
            setIsChecked2(false);
            setIsChecked4(false);
          }
          if(PlayerDetails?.price?.service_type == 'free'){
            setAmtActual(PlayerDetails?.price?.amount)
            setPriceType(PlayerDetails?.price?.service_type)
            setIsChecked4(true);
            setIsChecked2(false);
            setIsChecked3(false);
            setIsChecked(false);
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
        <p className='Scoutpage_Profile_Profiledetailstext'>Business Service Price</p>
        <p className='Scoutpage_Profile_filldetailstext'>Select what the price for your service to <b>scouts</b></p>
        <div className='Scoutpage_Profile_radiolabel'>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange} checked={isChecked} value='range'/> Range</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange2} checked={isChecked2} value='actual'/> Actual</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange3} checked={isChecked3} value='open'/> Open</label>
            <label className='Scoutpage_Profile_Profileformradiolabel'><input type='radio' onClick={handleRadioButtonChange4} checked={isChecked4} value='free'/> Free</label>
        </div>
        {priceType == 'range' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>You won't go below this price</p>
        <div className='Scoutpage_Profile_fromtoBusiness'>
            <div className='Scoutpage_Profile_fromBusiness'>
                <b>From</b>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' name='from' value={amtStatedfrom} className='Scoutprofile_frominput' onChange={handleAmountFrom} required/>
                </div>
            </div>
            <div className='Scoutpage_Profile_fromBusiness'>
                <b>To</b>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' name='to' value={amtStatedTo} className='Scoutprofile_frominput' onChange={handleAmountTo} required/>
                </div>
            </div>
        </div>
        </div>}
        {priceType == 'actual' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>This is your Price and it's none negotiable</p>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Preferred </p>
                <div className='Scoutprofile_nairainput'>
                    <TbCurrencyNaira style={{fontSize:"18px"}} />
                <input type='text' name='preferred' value={amtActual}  onChange={handleAmtActual} className='Scoutprofile_frominput' required/>
                </div>
        
        </div>}
        {priceType == 'open' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>Our Team will evaluate your profile and fix an amount</p>        
        </div>}
        {priceType == 'free' && 
        <div>
        <p className='Scoutpage_Profile_filldetailstext'>You are not charging a price.  </p>        
        </div>}
        
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
        {loadBusinessService? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfileBusinessService



