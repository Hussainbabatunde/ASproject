import React from 'react'
import './AdminDashBoard.css'
import {RiSearchLine} from 'react-icons/ri'
import people from '../../assets/UsersThree.png'
import document from '../../assets/document.png'
import volume from '../../assets/volume.png'
import vector from '../../assets/Vector.png'
import AdminHeader from '../../Components/Header/AdminHeader'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import UseTable from '../../Components/Table/UseTable'
import Lottie from 'lottie-react';
import empty from '../../assets/lottie/emptyState.json'
import imgRecipient from '../../assets/imgRecipient.png'
import ChatCircle from '../../assets/ChatsCircle.png'
import AdminUseTable from '../../Components/Table/AdminUseTable'


const AdminDashboard = () => {

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

  const Playerheader= [
        
  {
      id: 1,
      name: 'Player name'
  },
  {
      id: 2,
      name: "Position"
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
      id: 5,
      name: 'Video'
  },
  {
      id:6,
      name:'View Details'
  }
]

const Transactionheader= [
        
  {
      id: 1,
      name: 'Date'
  },
  {
      id: 2,
      name: "Amount"
  },
  {
      id:3,
      name:'Purpose'
  },
  {
      id:4,
      name:'Transaction ID'
  }
]

const dataTable= [
  {
      id: 1,dealname: '5 Season Deal', imgRecip: imgRecipient, scoutname: 'David Dada', InitialOffer:'$12,000', CurrentOffer: '$15,000',  surname: 'Not paid', chat: ChatCircle, number: "8"
  }
]
  return (<div className='AdminDashboard'>
    {/* <AdminHeader /> */}
    <div className='AdminDashBoard_title'>
      <p className='AdminDashboard_Dashboardtext'>DashBoard</p>
      <div className='AdminDashboard_Search'>
        <input type='text' placeholder='Search Content..' className='AdminDashboard_SearchInput' />
        <RiSearchLine  className='AdminDashboard_SearchIcon'/>
      </div>
    </div>
    <div  className='AdminPage_Dashboard'>
      <div className='AdminDashboard_CategorySection'>
      <div className='AdminDashBoard_ViewCategory'>
        <img src={people} />
        <div className='AdminDashBoard_CategoryTitileDet'>
          <p style={{fontSize:'14px'}}>Pending Review</p>
          <p className='AdminDashboard_categoryNum'>10</p>
        </div>
      </div>

      <div className='AdminDashBoard_ViewCategory2'>
        <img src={document} />
        <div className='AdminDashBoard_CategoryTitileDet'>
          <p style={{fontSize:'14px'}}>Active Negotiation</p>
          <p className='AdminDashboard_categoryNum'>10</p>
        </div>
      </div>

      <div className='AdminDashBoard_ViewCategory'>
        <img src={volume} />
        <div className='AdminDashBoard_CategoryTitileDet'>
          <p style={{fontSize:'14px'}}>Active Ads</p>
          <p className='AdminDashboard_categoryNum'>20</p>
        </div>
      </div>

      <div className='AdminDashBoard_ViewCategory2'>
        <img src={vector} />
        <div className='AdminDashBoard_CategoryTitileDet'>
          <p style={{fontSize:'14px'}}>Closed Negotiation</p>
          <p className='AdminDashboard_categoryNum'>20,000</p>
        </div>
      </div>
      </div>
      <div className='AdminPage_DashboardTAbleCat'>
        <div className='AdminPage_TableTitleandLink'>
          <p className='AdminDashboard_Dashboardtext'>Active Negotiaties</p>
          <Link className='AdminDashBoard_LinkViewall'>View All</Link>
      </div>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>This is a table of recent Active negotiaties on this platform</span>
      </div>
      {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
        <AdminUseTable header={header} data={dataTable} />
        }
      </div>

      <div className='AdminPage_DashboardTAbleCat'>
        <div className='AdminPage_TableTitleandLink'>
          <p className='AdminDashboard_Dashboardtext'>Approve Players</p>
          <Link className='AdminDashBoard_LinkViewall'>View All</Link>
      </div>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>This is a table of pending players application waiting for approval on the platform</span>
      </div>
      {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
        <AdminUseTable header={Playerheader} data={dataTable} />
        }
      </div>

      <div className='AdminPage_DashboardTAbleCat'>
        <div className='AdminPage_TableTitleandLink'>
          <p className='AdminDashboard_Dashboardtext'>Transaction</p>
          <Link className='AdminDashBoard_LinkViewall'>View All</Link>
      </div>
      <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>Recent transaction made on the platform</span>
      </div>
      {dataTable?.length ===0 ? 
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                <Lottie style={{width: '200px', height:'200px'}} animationData={empty} />
        </div>
        : 
        <AdminUseTable header={Transactionheader} data={dataTable} />
        }
      </div>

    </div>
    </div>
  )
}

export default AdminDashboard