import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './AdminPage.css'
import AdminDashboard from './AdminDashboard'
import AdminHeader from '../../Components/Header/AdminHeader'
import AdminSidebar from '../../Components/Admin/AdminSidebar'

const AdminRote = () => {
  return (
    <div>
        <AdminHeader />
        <div className='AdminMainPage'>
            <AdminSidebar />
    <Routes>
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    </Routes>
    </div>
    </div>
  )
}

export default AdminRote