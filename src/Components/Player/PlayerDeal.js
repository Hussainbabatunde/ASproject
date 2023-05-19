import React, { useEffect, useState } from 'react'
import '../Scout/Scout.css';
import {RxExit} from 'react-icons/rx'
import { NavLink } from 'react-router-dom';
import ScoutHeader from '../Header/ScoutHeader';
import { Table } from 'react-bootstrap';
import UseTable from '../Table/UseTable';
import imgRecipient from '../../assets/imgRecipient.png'
import Lottie from 'lottie-react';
import empty from '../../assets/lottie/emptyState.json'
import { LogoutAuth } from '../../Slice/auth/Login';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import football from '../../assets/lottie/92356-football.json'
import { useDispatch, useSelector } from 'react-redux';
import { PlayerDealsApi } from '../../Slice/Player/PlayerDeal/PlayerDealSlice';
import { reset as resetPlayerProfileSlice } from "../../Slice/Player/Playerprofile/PlayerProfileSlice";
import {reset as resetGetAllPlayerDealSlice} from "../../Slice/Player/PlayerDeal/PlayerDealSlice"
import { UserLogout } from './UserLogOut';

const PlayerDeal = () => {
    const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        // await dispatch(resetPlayerProfileSlice())
        // await dispatch(resetGetAllPlayerDealSlice())
        UserLogout()
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const data = [
        {id: 1, pathTo: '/afrisport/player/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/afrisport/player/deal', pathName: 'Deals'},
        {id: 3, pathTo: '/afrisport/player/views', pathName: 'Views'},
        {id: 4, pathTo: '/afrisport/player/payment', pathName: 'Payment'}
    ]

    const header= [
        
      {
          id: 1,
          name: 'Deal name'
      },
      {
          id: 2,
          name: "Recipient"
      },
      {
          id:3,
          name:'Details'
      },
      {
          id:4,
          name:'Amount'
      },
      {
          id: 5,
          name: 'Payment'
      },
      {
          id:6,
          name:'Status'
      },
      {
          id:7,
          name:''
      }
  ]
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    p: 4,
  };
  
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const DealSlice = async ()=>{
        setShow(true)
        await dispatch(PlayerDealsApi())
        setShow(false)
    }
    DealSlice()
  },[])

//   const dataTable= [
//     {
//         id: 1,dealname: '5 Season Deal', imgRecip: imgRecipient, recipient: 'David Dada', firstname:'tunde', surname: 'kunle',  email: 'mayana@mail.com', role: "teacher", user_type: "teacher", description: 'jhkjhkjjj jjjjjjjjj jjjjjj jjjjkhk  iuhhiuhiuh uhiuhiyu8gu  ygug'
//     }
// ]

const dataTable = useSelector((state)=> state?.reducer?.GetAllPlayerDealSlice?.PlayerDealData)
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
          {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
            <UseTable header={header} data={dataTable} />
        }
        </div>
        <Modal
        open={show}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Lottie style={{width: '200px', height:'200px'}} animationData={football} />
            </Box>
        
      </Modal>
        </div>
  )
}

export default PlayerDeal