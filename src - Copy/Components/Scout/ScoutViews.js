import React from 'react'
import './ScoutViews.css'
import { LogoutAuth } from '../../Slice/auth/Login'
import { useDispatch } from 'react-redux'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';

const ScoutViews = () => {
  const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const data = [
        {id: 1, pathTo: '/afrisport/scout/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/scout/deal', pathName: 'Deals'},
        {id: 3, pathTo: '/afrisport/scout/views', pathName: 'Views'},
        {id: 4, pathTo: '/afrisport/scout/payment', pathName: 'Payment'}
    ]
  return (
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
            <p className='Scoutpage_View_NoofScouts'>30 Scouts Visited Your Profile</p>
            <p className='Scoutpage_View_NoofEnquiry'>30 Scouts Enquired About You</p>
        </div>
    </div>
        </div>
  )
}

export default ScoutViews