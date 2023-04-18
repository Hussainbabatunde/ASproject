import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

const AdminRote = () => {
  return (
    <Routes>
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    </Routes>
  )
}

export default AdminRote