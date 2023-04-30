import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './AdminPage.css'
import AdminDashboard from './AdminDashboard'
import AdminHeader from '../../Components/Header/AdminHeader'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminNegotiate from './AdminNegotiate'
import AdminPlayer from './AdminPlayer'
import AdminScouts from '../../Components/Admin/AdminScouts/AdminScouts'
import AdminFinance from '../../Components/Admin/AdminFinance/AdminFinance'
import AdminFinanaceTransaction from '../../Components/Admin/AdminFinance/AdminFinanaceTransaction'
import AdminAdmins from '../../Components/Admin/AdminAdmins/AdminAdmins'
import AdminTalentMangersStep from '../../Components/Admin/AdminTalentManagers/AdminTalentManagersStep'
import AdminTalentManagers from '../../Components/Admin/AdminTalentManagers/AdminTalentManagers'

const AdminRote = () => {
  return (
    <div>
        <AdminHeader />
        <div className='AdminMainPage'>
            <AdminSidebar />
    <Routes>
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    <Route path='/admin/negotiate' element={<AdminNegotiate />} />
    <Route path='/admin/players' element={<AdminPlayer />} />
    <Route path='/admin/scouts' element={<AdminScouts />} />
    <Route path='/admin/finance' element={<AdminFinance />} />
    <Route path='/admin/finance/transaction' element={<AdminFinanaceTransaction />} />
    <Route path='/admin/admins' element={<AdminAdmins />} />
    <Route path='/admin/talentManager' element={<AdminTalentManagers />} />
    </Routes>
    </div>
    </div>
  )
}

export default AdminRote