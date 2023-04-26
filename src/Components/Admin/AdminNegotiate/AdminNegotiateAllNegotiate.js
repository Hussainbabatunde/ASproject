import React from 'react'
import './AdminNegotiate.css'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {RiSearchLine} from 'react-icons/ri'
import AdminUseTable from '../../Table/AdminUseTable'
import Lottie from 'lottie-react';
import empty from '../../../assets/lottie/emptyState.json'
import imgRecipient from '../../../assets/imgRecipient.png'
import ChatCircle from '../../../assets/ChatsCircle.png'


const AdminNegotiateAllNegotiate = ({handleAllNegotiate, handleSuspended, handleClosed, handleTerminated}) => {

  const header= [
        
    {
        id: 1,
        name: 'Deal name'
    },
    {
        id: 2,
        name: "Scout"
    },
    {
        id:3,
        name:'Initial Offer'
    },
    {
        id:4,
        name:'Current Offer'
    },
    {
        id: 5,
        name: 'Payment'
    },
    {
        id:6,
        name:'Active Negotiaties'
    }
]

const dataTable= [
  {
      id: 1,dealname: '5 Season Deal', imgRecip: imgRecipient, scoutname: 'David Dada', InitialOffer:'$12,000', CurrentOffer: '$15,000',  surname: 'Not paid', chat: ChatCircle, number: "8"
  }
]
  return (
    <div className='AdminPage_NegotiateTab'>
      <div className='AdminPage_NegotiateTabTitle'>
        <p className='AdminPAge_Negotiate_TabNegotiateActive' onClick={handleAllNegotiate}>All Negotiate</p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive'onClick={handleSuspended}>Suspended</p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Closed <span className='AdminPage_NegotiateTab_TabNumber'>10k</span></p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p>
      </div>
      <p className='AdminPage_NegotiateTitleText'>All Negotiates</p>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>This is a table of recent communication on the platform</span>
      </div>
      <div className='AdminPage_TableTitleandLink'>
          <button className='AdminPage_NegotiateCreateButton'>Create Negotiate</button>
          <div className='AdminDashboard_Search'>
        <input type='text' placeholder='Search name' className='AdminDashboard_SearchInput' />
        <RiSearchLine  className='AdminDashboard_SearchIcon'/>
      </div>
      </div>
      <div className='AdminTable_NegotiateTable'>
      {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
        <AdminUseTable header={header} data={dataTable} />
        }
        </div>
    </div>
  )
}

export default AdminNegotiateAllNegotiate