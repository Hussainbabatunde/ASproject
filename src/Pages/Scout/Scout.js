import React from 'react'
import ScoutHeader from '../../Components/Header/ScoutHeader'
import '../../Components/Scout/Scout.css'
import {RxExit} from 'react-icons/rx'
import { NavLink } from 'react-router-dom';
import ScoutProfile from '../../Components/Scout/ScoutProfile';
// import ScoutDashBoard from '../../Components/Scout/ScoutDashBoard'

const Scout = () => {
  const data = [
    {id: 1, pathTo: '/scout/profile', pathName: 'Profile'},
    {id: 2, pathTo: '/scout/deal', pathName: 'Deals'},
    {id: 3, pathTo: '/scoutViews', pathName: 'Views'},
    {id: 4, pathTo: '/scoutPayment', pathName: 'Payment'}
]
  return (
    <div>
      <ScoutHeader />
      <div  className='Scoutpage_contents'>
        <div className='Scoutpage_AccountLogout_div'>
            <p className='Scoutpage_AccountWord'>Account</p>
            <p className='Scoutpage_AccountWord'>Logout <RxExit /></p>
        </div>
        <div className='Scoutpage_LinkPages'>
           {data.map((each, index)=>(
             <NavLink to={each?.pathTo} key={index} className={({isActive})=> (isActive ? 'Scoutpage_Profileactivepage':'Scoutpage_Profilepage')}>{each?.pathName}</NavLink>
            ))}
        </div>
        <ScoutProfile />
    </div>
    </div>
  )
}

export default Scout