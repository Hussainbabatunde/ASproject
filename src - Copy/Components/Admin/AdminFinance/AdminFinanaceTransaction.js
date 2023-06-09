import React from 'react'
import {AiOutlineInfoCircle} from 'react-icons/ai'

const AdminFinanaceTransaction = () => {
  return (
    <div className='AdminDashboard'>
    <div className='AdminPage_Dashboard'>
        <div className='AdminPage_DashboardTAbleCat'>
        <p className='AdminPage_NegotiateTitleText'>Transaction</p>
        <div className='AdminPage_TableInfo'>
        <AiOutlineInfoCircle style={{fontSize: '18px'}}/>
        <span className='AdminPage_TableInfoText'>Recent transaction made on the platform</span>
      </div>
            </div>
    </div>
    </div>
  )
}

export default AdminFinanaceTransaction