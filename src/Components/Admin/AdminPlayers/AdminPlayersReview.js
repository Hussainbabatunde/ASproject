import React from 'react'
import '../AdminNegotiate/AdminNegotiate.css'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {RiSearchLine} from 'react-icons/ri'
import AdminUseTable from '../../Table/AdminUseTable'
import Lottie from 'lottie-react';
import empty from '../../../assets/lottie/emptyState.json'
import imgRecipient from '../../../assets/imgRecipient.png'
import ChatCircle from '../../../assets/ChatsCircle.png'

const AdminPlayersReview = ({handleAllNegotiate, handleSuspended, handleClosed, handleTerminated}) => {

    const header= [
        {
            id:1,
            name:'Player Name'
        },
        {
            id:2,
            name:'Position'
        },
        {
            id:3,
            name:'Nationality'
        },
        {
            id:4,
            name:'Images'
        },
        {
            id:5,
            name:'Video'
        },
        {
            id:6,
            name: 'PlayersViewdetails'
        }
    ]

const dataTable= [
  {
      id: 1,playerName: 'mayana', position: 'striker', images: '4', nationality:'Nigerian', videos: '8',  surname: 'Not paid', chat: ChatCircle, number: "8"
  }
]
  return (
    <div className='AdminPage_NegotiateTab'>
      <div className='AdminPage_NegotiateTabTitle'>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleAllNegotiate}>All Players</p>
        <p className='AdminPAge_Negotiate_TabNegotiateActive' onClick={handleClosed}>Review <span className='AdminPage_NegotiateTab_TabNumber'>4</span></p>
        <p className='AdminPAge_Negotiate_TabNegotiateInactive' onClick={handleSuspended}>Suspended</p>
      </div>
      <div className='AdminPage_TableTitleandLink'>
      <p className='AdminPage_NegotiateTitleText'>Review</p>
          <div className='AdminDashboard_Search'>
        <input type='text' placeholder='Search name' className='AdminDashboard_SearchInput' />
        <RiSearchLine  className='AdminDashboard_SearchIcon'/>
      </div>
      </div>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>This is a table of Closed Negotiates on the platform</span>
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

export default AdminPlayersReview