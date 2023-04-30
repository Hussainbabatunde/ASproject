import React from 'react'
import './AdminSidebar.css'
import { NavLink } from 'react-router-dom'
import {RxDashboard} from 'react-icons/rx'
import {IoIosPaper} from 'react-icons/io'
import {MdGroups} from 'react-icons/md'
import {RiFileEditFill} from 'react-icons/ri'
import {GiMeepleGroup, GiHouse} from 'react-icons/gi'
import {BsPersonLinesFill, BsFillPeopleFill} from 'react-icons/bs'
import {ImExit} from 'react-icons/im'
import {AiFillBank} from 'react-icons/ai'


const AdminSidebar = () => {
  const data = [
    {id: 1, pathTo: '/admin/admin/dashboard', pathName: 'Dashboard', pathIcon: <RxDashboard />},
    {id: 2, pathTo: '/admin/admin/negotiate', pathName: 'Negotiate', pathIcon: <IoIosPaper />},
    {id: 3, pathTo: '/admin/admin/ads', pathName: 'Ads', pathIcon: <RiFileEditFill />},
    {id: 4, pathTo: '/admin/admin/players', pathName: 'Players', pathIcon: <MdGroups />},
    {id: 5, pathTo: '/admin/admin/scouts', pathName: 'Scout', pathIcon: <BsPersonLinesFill />},
    {id: 6, pathTo: '/admin/admin/fans', pathName: 'Fans', pathIcon: <BsPersonLinesFill />},
    {id: 7, pathTo: '/admin/admin/talentManager', pathName: 'Talent Manager', pathIcon: <BsFillPeopleFill />},
    {id: 8, pathTo: '/admin/admin/admins', pathName: 'Admins', pathIcon: <GiMeepleGroup />},
    {id: 9, pathTo: '/admin/admin/finance', pathName: 'Finance', pathIcon: <AiFillBank />},
]
  return (
    <div className='SuperAdmin_Sidebar'>
      <div>
      {data.map((each, index)=>(
      <NavLink to={each?.pathTo} 
      key={index} 
      className={({isActive})=> (isActive ? 'SuperAdmin_SidebarNavLink':'SuperAdmin_SidebarInactiveNavLink')}
      > {each?.pathIcon}<span className='SuperAdmin_SidebarText'>{each?.pathName}</span>
      </NavLink>
      ))}
      <NavLink  
      className='SuperAdmin_SidebarInactiveNavLink'
      > <ImExit /><span className='SuperAdmin_SidebarText'>Logout</span>
      </NavLink>
      </div>
      
    </div>
  )
}

export default AdminSidebar