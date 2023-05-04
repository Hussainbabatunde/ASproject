import React from 'react'
import ScoutHeader from '../../Components/Header/ScoutHeader'
import '../../Components/Scout/Scout.css'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import ScoutProfile from '../../Components/Scout/ScoutProfile';
import { useDispatch } from 'react-redux';
import { LogoutAuth } from '../../Slice/auth/Login';
import ScoutViewProfile from './ScoutViewProfile';
import Footer from '../../Components/Homepage/Footer';
// import ScoutDashBoard from '../../Components/Scout/ScoutDashBoard'

const Scout = () => {
  const data = [
    {id: 1, pathTo: '/scout/profile', pathName: 'Profile'},
    {id: 2, pathTo: '/scout/deal', pathName: 'Deals'},
    {id: 3, pathTo: '/scoutViews', pathName: 'Views'},
    {id: 4, pathTo: '/scoutPayment', pathName: 'Payment'}
]

const dispatch= useDispatch()

const LogOut = async () => {
  await dispatch(LogoutAuth())
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
  // navigate('/login')
};
  return (
    <div>
      <ScoutHeader />
      <Routes>
        <Route path='/scout/viewprofile' element={<ScoutViewProfile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default Scout