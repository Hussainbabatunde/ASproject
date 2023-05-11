import React, { useEffect, useState } from 'react'
import './AdminAdmins.css'
import {RiSearchLine} from 'react-icons/ri'
import Lottie from 'lottie-react';
import {AiOutlineInfoCircle} from 'react-icons/ai'
import empty from '../../../assets/lottie/emptyState.json'
import imgRecipient from '../../../assets/imgRecipient.png'
import AdminUseTable from '../../Table/AdminUseTable';
import AdminPermissionModal from './AdminPermissionModal';
import { useDispatch, useSelector } from 'react-redux';
import { AdminAllPermissionsRequest, AdminDeletePermissionsRequest, AdminGetAllPermissionsRequest, AdminGetIndividualPermissionsRequest, AdminPutIndividualPermissionsRequest } from '../../../Slice/Admin/AdminAllAdmins/AdminPermissionSlice';
import { ToastContainer } from 'react-toastify';
import EditAdminPermissionModal from './EditPermissionModal';

const AdminPermissions = () => {

  const header= [
    {
        id: 0,
        name: 'S/N'
    },
    {
        id:1,
        name:'Permission name'
    },
    {
        id:2,
        name:'Description'
    },
    {
        id:3,
        name:'EditDeletePermissions'
    }
]

useEffect(()=>{
    const getPermissions = async () =>{
        dispatch(AdminGetAllPermissionsRequest())
    }
    getPermissions()
},[])


const dataTable= useSelector((state) => state?.reducer?.AdminAllAdminSlice?.GetAdminPermissiondata?.data  )
const UserInitialInfo= useSelector((state) => state?.reducer?.AdminAllAdminSlice?.GetAdminPermissionIndidata?.data  )

useEffect(()=>{
  if (UserInitialInfo){
    setName(UserInitialInfo)
  }
},[UserInitialInfo])


const [show, setShow] = useState(false);
const [showEdit, setShowEdit] = useState(false);
const [info , setInfo] = useState({})
const [loader, setLoader] = useState(false)
const [loaderEdit, setLoaderEdit] = useState(false)
const [deleteinfo, setDeleteInfo] = useState(false)
const [deletingIndex, setDeletingIndex] = useState(null);
const [name, setName] = useState({})
const [fetcher, setFetcher] = useState(false)
const [describe, setDescribe] = useState('')
const dispatch = useDispatch()


const handleChange= (e)=>{
    setInfo({...info, [e.target.name]: e.target.value})
}

const handleEditChange= (e)=>{
    setName({...name, [e.target.name]: e.target.value})
}

const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoader(true)
    await dispatch(AdminAllPermissionsRequest(info))
    await dispatch(AdminGetAllPermissionsRequest())
    setLoader(false)
    setShow(false)
}

const handleEditSubmit = async(e) =>{
    e.preventDefault()
    const data= {
      id: name?.id,
      name: name?.name,
      description: name?.description
    }
    // console.log('name name ', name)
    // console.log('data sent', data)
    setLoaderEdit(true)
    await dispatch(AdminPutIndividualPermissionsRequest(data))
    await dispatch(AdminGetAllPermissionsRequest())
    setLoaderEdit(false)
    setShowEdit(false)
    
}

const handleDelete = async(id, index) =>{
    // console.log('delete id', id)
    setDeletingIndex(index);
    setDeleteInfo(true)
    await dispatch(AdminDeletePermissionsRequest(id))
    setDeletingIndex(null)
    await dispatch(AdminGetAllPermissionsRequest())
    setDeleteInfo(false)
}
const handleShow= ()=>{
  setShow(true)
}
const handleEditShow= async (id)=>{
    setShowEdit(true)
    setFetcher(true)
    await dispatch(AdminGetIndividualPermissionsRequest(id))
    setFetcher(false)
    console.log('edit id ', id)
  }
const handleHide = () => {
  setShow(false)
}
const handleEditHide = () => {
    setShowEdit(false)
  }


  return (
    <div className='AdminDashboard'>
        <ToastContainer />
    <div className='AdminPage_Dashboard'>
        <div className='AdminPage_DashboardTAbleCat'>
          <button className='Adminpage_CreateAdmins' onClick={handleShow}>Create Permission</button>
    
        <div className='AdminPage_TableTitleandLink'>
      <p className='AdminPage_NegotiateTitleText'>Admin Permissions</p>
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
        <AdminUseTable header={header} handleEditShow={handleEditShow} handleEditSubmit={handleEditSubmit} deletingIndex={deletingIndex} deleteinfo={deleteinfo} handleDelete={handleDelete} data={dataTable} />
        }
        </div>
        <AdminPermissionModal loader={loader} title='Create Permission' handleChange={handleChange} handleSubmit={handleSubmit} show={show} handleShow={handleShow} handleHide={handleHide} />
        <EditAdminPermissionModal name={name} describe={describe} fetcher={fetcher} loader={loaderEdit} title='Edit Permission' handleChange={handleEditChange} handleSubmit={handleEditSubmit} show={showEdit} handleHide={handleEditHide} />
      </div>
      </div>
    </div>
  )
}

export default AdminPermissions