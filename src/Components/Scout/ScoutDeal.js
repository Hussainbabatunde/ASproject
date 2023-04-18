import React from 'react'
import './Scout.css';
import {RxExit} from 'react-icons/rx'
import { NavLink } from 'react-router-dom';
import ScoutHeader from '../Header/ScoutHeader';
import { Table } from 'react-bootstrap';
import UseTable from '../Table/UseTable';
import imgRecipient from '../../assets/imgRecipient.png'
import Lottie from 'lottie-react';
import empty from '../../assets/lottie/emptyState.json'
import { LogoutAuth } from '../../Slice/auth/Login';
import { useDispatch } from 'react-redux';

const ScoutDeal = () => {
    const dispatch = useDispatch()
    const handleLogout = async () =>{
        await dispatch(LogoutAuth())
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    const dataLink = [
        {id: 1, pathTo: '/scout/profile', pathName: 'Profile'},
        {id: 2, pathTo: '/scout/deal', pathName: 'Deals'},
        {id: 3, pathTo: '/scoutViews', pathName: 'Views'},
        {id: 4, pathTo: '/scoutPayment', pathName: 'Payment'}
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

  const dataTable= [
    // {
    //     id: 1,dealname: '5 Season Deal', imgRecip: imgRecipient, recipient: 'David Dada', firstname:'tunde', surname: 'kunle',  email: 'mayana@mail.com', role: "teacher", user_type: "teacher"
    // }
]
  return (
        <div className='Scoutpage_DealContent'>
          {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
        <UseTable header={header} data={dataTable} />
        }
        </div>
  )
}

export default ScoutDeal