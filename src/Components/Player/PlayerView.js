import React, { useEffect, useState } from 'react'
import '../Scout/ScoutViews.css'
import { LogoutAuth } from '../../Slice/auth/Login'
import { useDispatch, useSelector } from 'react-redux'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import { ProfileVisitsNumber } from '../../Slice/Player/PlayerView/PlayerViewSlice'
import { Skeleton } from '@mui/material'
import { UserLogout } from './UserLogOut'
import { reset as resetLoginSlice } from "../../Slice/auth/Login";
import {reset as resetPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import {reset as resetPlayerFanDealSlice} from "../../Slice/Player/PlayerDeal/PlayerFanDealSlice"
import {reset as resetPlayerHomepageSlice} from "../../Slice/Player/PlayerHomePage/GetAllPlayersHomePage"
import {reset as resetManagerSlice} from "../../Slice/Player/PlayerManager/PlayerManagerSlice"
import {reset as resetPaymentSlice} from "../../Slice/Player/PlayerPayment/PaymentSlice"
import {reset as resetViewSlice} from "../../Slice/Player/PlayerView/PlayerViewSlice"
import {reset as resetPlayerProfileSlice} from "../../Slice/Player/Playerprofile/PlayerProfileSlice"
import {reset as resetFanDealSlice} from "../../Slice/Fan/FanDealsApiPage/FanDealSlice"

import {reset as resetFanProfileSlice} from "../../Slice/Fan/ProfileFanSlice/ProfileFanSlice"

import {reset as resetScoutProfileSlice} from "../../Slice/Scout/ProfileScoutSlice/ProfileScoutSlice"

import {reset as resetScoutDealSlice} from "../../Slice/Scout/ScoutDealsApiPage/ScoutDealSlice"

const PlayerViews = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // UserLogout()
    await dispatch(resetLoginSlice())
    await dispatch(resetPlayerDealSlice())
    await dispatch(resetPlayerFanDealSlice())
    await dispatch(resetPlayerHomepageSlice())
    await dispatch(resetManagerSlice())
    await dispatch(resetPaymentSlice())
    await dispatch(resetViewSlice())
    await dispatch(resetPlayerProfileSlice())
    await dispatch(resetFanDealSlice())
    await dispatch(resetFanProfileSlice())
    await dispatch(resetScoutProfileSlice())
    await dispatch(resetScoutDealSlice())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const visitProfileNumber = useSelector((state)=> state?.reducer?.PlayerVisitSlice?.ProfileVisitsdata)

    useEffect(()=>{
      const VisitsDetailsGotten = async () =>{
        setLoading(true)
        await dispatch(ProfileVisitsNumber())
        setLoading(false)
      }
      VisitsDetailsGotten()
    },[])
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Scout Deals'},
        // {id: 3, pathTo: '/afrisport/player/fandeal', pathName: 'Fan Deals'},
        {id: 4, pathTo: '/afrisport/player/managerdeal', pathName: 'Talent Manager Request'},
        {id: 5, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 6, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]
  return (
    <div className="Scoutpage_maxWidthContainer">
    <div  className='Scoutpage_contents'>
    <div className='Scoutpage_AccountLogout_div'>
        <p className='Scoutpage_AccountWord'>Account</p>
        <p className='Scoutpage_AccountWord' style={{cursor:'pointer'}} onClick={handleLogout}>Logout <RxExit /></p>
    </div>
    <div className='Scoutpage_LinkPages'>
       {data.map((each, index)=>(
         <NavLink to={each?.pathTo} key={index} className={({isActive})=> (isActive ? 'Scoutpage_Profileactivepage':'Scoutpage_Profilepage')}>{each?.pathName}</NavLink>
        ))}
    </div>
    <div className='Scoutpage_DealContent'>
        <div className='Scoutpage_ViewContent'>
            <p className='Scoutpage_ViewDaysframe'>Last 30 days</p>
            {loading == true ? <Skeleton variant="rounded" width='90%' height={22} />  : <p className='Scoutpage_View_NoofScouts'>{visitProfileNumber?.total_views} Scouts Visited Your Profile</p>}
            {/* <p className='Scoutpage_View_NoofEnquiry'>30 Scouts Enquired About You</p> */}
        </div>
    </div>
        </div>
        </div>
  )
}

export default PlayerViews