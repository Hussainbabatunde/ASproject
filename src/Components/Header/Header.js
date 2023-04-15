import React, { useState } from 'react'
import logo from '../../assets/logo.png';
import './Header.css'
import { Link } from 'react-router-dom';
import {FiMenu} from 'react-icons/fi'
import {RxCross2} from 'react-icons/rx'

const Header = () => {
  const [openNav, setOpenNav] = useState('HomePage_ShownDetails_NavMenu')
  const [iconOpen, setIconOpen] = useState(false)

  const handleOpen = () =>{
    setIconOpen(true)
    setOpenNav('HomePage_ShownDetails_OpenNavMenu')
  }

  const handleClose = () =>{
    setIconOpen(false)
    setOpenNav('HomePage_ShownDetails_NavMenu')
  }
  return (<>
    <div className='Homepage_header'>
        <img src={logo} alt="Afrisport logo" />
        <div>
          <Link to='/login' className='Header_login'>Login</Link>
          <Link to='/signup' className='Header_CreateAcc'>Create Account</Link>
        </div>
    </div>
    <div className='Homepage_Menudisplay'>
      <div className='Homepage_ShownMenuBar'>
        <div className='Homepage_headerNavbar'>
            <img src={logo} alt="Afrisport logo" />
            {iconOpen ? <RxCross2 className='Homepage_MeniIcon' onClick={handleClose}/>: <FiMenu  className='Homepage_MeniIcon' onClick={handleOpen} />}
        </div>
        <div className={openNav}>
        <Link to='/login' className='Header_login'>Login</Link>
          <Link to='/signup' className='Header_CreateAcc'>Create Account</Link>
        </div>
    </div>
    </div>
    </>
  )
}

export default Header