import React from 'react'
import './AdminTalentManagers.css'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {RiSearchLine} from 'react-icons/ri'
import AdminUseTable from '../../Table/AdminUseTable'
import Lottie from 'lottie-react';
import empty from '../../../assets/lottie/emptyState.json'
import imgRecipient from '../../../assets/imgRecipient.png'
import ChatCircle from '../../../assets/ChatsCircle.png'


const AdminTalentManagerAllManagers = ({handleAllNegotiate, handleSuspended, handleClosed, handleTerminated}) => {

  const header= [
    {
        id:1,
        name:'Scout'
    },
    {
        id:2,
        name:'Number of Player'
    },
    {
        id:3,
        name:'Closed Negotiate'
    },
    {
        id:4,
        name:'SuspendMessageView'
    }
]

const dataTable= [
  {
      id: 1, imgRecip: imgRecipient, scoutname: 'Jerry Oloti' , activeNegotiate:'20', closedNegotiate:'15', recentNegotiate:'league ball'
  }
]
  return (
    <div className='AdminPage_NegotiateTab'>
      <div className='AdminPage_NegotiateTabTitle'>
        <p className='AdminPAge_Negotiate_TalentManagerNegotiateActive' onClick={handleAllNegotiate}>All Talent Managers</p>
        {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleClosed}>Review <span className='AdminPage_NegotiateTab_TabNumber'>4</span></p> */}
        <p className='AdminPAge_Negotiate_TabNegotiateInactive'onClick={handleSuspended}>Suspended</p>
        {/* <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleTerminated}>Terminated</p> */}
      </div>
      
      <div className='AdminPage_TableTitleandLink'>
      <p className='AdminPage_NegotiateTitleText'>Talent Managers</p>
          <div className='AdminDashboard_Search'>
        <input type='text' placeholder='Search name' className='AdminDashboard_SearchInput' />
        <RiSearchLine  className='AdminDashboard_SearchIcon'/>
      </div>
      </div>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>This is a table of recent communication on the platform</span>
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

export default AdminTalentManagerAllManagers