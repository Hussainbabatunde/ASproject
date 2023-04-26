import React from 'react'
import ScoutHeader from '../../Components/Header/ScoutHeader'
import '../../Components/Scout/Scout.css'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import ScoutDeal from '../../Components/Scout/ScoutDeal';
import Scout from './Scout';
import ScoutProfile from '../../Components/Scout/ScoutProfile';
import { LogoutAuth } from '../../Slice/auth/Login';
import { useDispatch } from 'react-redux';
import ScoutViews from '../../Components/Scout/ScoutViews';
import ScoutPayment from '../../Components/Scout/ScoutPayment';

const ScoutRoute = () => {
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
    <div>
        <ScoutHeader />
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
        <Routes>
            <Route path='/scout/profile' element={<ScoutProfile />} />
            <Route path='/scout/deal' element={<ScoutDeal />} />
            <Route path='/scout/views' element={<ScoutViews />} />
            <Route path='/scout/payment' element={<ScoutPayment />} />
        </Routes>
        </div>
    </div>
  )
}

export default ScoutRoute