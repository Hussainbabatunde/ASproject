import React from 'react'
import ScoutHeader from '../../Components/Header/ScoutHeader'
import '../../Components/Scout/Scout.css'
import {RxExit} from 'react-icons/rx'
import { NavLink, Route, Routes } from 'react-router-dom';
import ScoutDeal from '../../Components/Scout/ScoutDeal';
import Scout from './Scout';
import ScoutProfile from '../../Components/Scout/ScoutProfile';
import { LogoutAuth } from '../../Slice/auth/Login';
import Footer from '../../Components/Homepage/Footer'
import { useDispatch } from 'react-redux';
import ScoutViews from '../../Components/Scout/ScoutViews';
import ScoutPayment from '../../Components/Scout/ScoutPayment';
import ScoutViewProfile from './ScoutViewProfile';
import PlayerProfile from '../../Components/Player/PlayerProfile';
import PlayerDeal from '../../Components/Player/PlayerDeal';
import PlayerViews from '../../Components/Player/PlayerView';
import PlayerPayment from '../../Components/Player/PlayerPayment';
import PlayerViewProfile from '../../Components/Player/PlayerViewProfile';

const PlayerRoute = () => {
    const dispatch = useDispatch()
  return (
    <div>
        <ScoutHeader />
        <Routes>
            <Route path='/player/profile' element={<PlayerProfile />} />
            <Route path='/scout/deal' element={<PlayerDeal />} />
            <Route path='/scout/views' element={<PlayerViews />} />
            <Route path='/scout/payment' element={<PlayerPayment />} />
            <Route path='/scout/viewprofile' element={<PlayerViewProfile />} />
        </Routes>
    <Footer />
    </div>
  )
}

export default PlayerRoute