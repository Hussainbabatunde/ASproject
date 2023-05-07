import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerProfilePhysicalStatsApi } from '../../Slice/Player/Playerprofile/PlayerProfileSlice'
import { CircularProgress } from '@mui/material'

const PlayerProfilePhysicalStats = ({userId}) => {

  const [physicalStats, setPhysicalStats] = useState({})
  const dispatch = useDispatch()
  const [loadProfileStats, setLoadProfileStats] = useState(false)
  const handlePhysicalStats = (e) =>{
    setPhysicalStats({...physicalStats, [e.target.name]: e.target.value})
  }

  const handleSubmitPhysicalStats =  async (event) =>{
    event.preventDefault()
    physicalStats.user_id = userId
    // console.log(physicalStats)
    setLoadProfileStats(true)
    await dispatch(PlayerProfilePhysicalStatsApi(physicalStats))
    setLoadProfileStats(false)
  }


  return (
    <form onSubmit={handleSubmitPhysicalStats} className='Scoutpage_ProfileforContent'>
        <p className='Scoutpage_Profile_Profiledetailstext'>Physical Stats</p>
        <p className='Scoutpage_Profile_Profileformlabeltext'>Gender</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='gender' onChange={handlePhysicalStats} placeholder='Male/Female' required />
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Height</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='height' onChange={handlePhysicalStats} placeholder='Feets' required/>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Weight</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='weight' onChange={handlePhysicalStats} placeholder='Kg' required/>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Language</p>
        <input type='text' className='Scoutpage_Profile_ProfileformlabelInput' name='language' onChange={handlePhysicalStats} placeholder='---' required/>
        <p className='Scoutpage_Profile_Profileformlabelnexttext'>Strong foot</p>
        <select required name='strong_foot' onChange={handlePhysicalStats} className='Scoutpage_Profile_ProfileformlabelInput'>
            <option disabled></option>
            <option value='Left'>Left</option>
            <option value='Right'>Right</option>
        </select>
        
        <button type='submit' className='Scoutpage_Profileform_savebutton'>
        {loadProfileStats? <CircularProgress size={15} /> : <span>Save</span>}
          </button>
    </form>
  )
}

export default PlayerProfilePhysicalStats