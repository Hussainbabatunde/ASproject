import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Lottie from 'lottie-react';
import football from '../../assets/lottie/92356-football.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPasswordAuth, loginAuth } from '../../Slice/auth/Login'
import { useEffect } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 210,
  p: 4,
};

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const dispatch= useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    // console.log(data)
    setShow(true)
    await dispatch(ForgotPasswordAuth(data))
    setShow(false)
};


  return (
    <div className='Loginpage'>
    <ToastContainer />
        <p className='Loginpage_Companyname'><Link className='Loginpage_Companyname' to='/'>AfriSport-Pro</Link></p>
        <form  onSubmit={handleSubmit(onSubmit)} className='Loginpage_formSection'>
            <p className='Loginpage_formTopic'>Forgot Password</p>
            <p className='Loginpage_formTopicdetails'>Enter your email to reset your password</p>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Email Address</p>
                <input type='text'
                {...register("email", { required: true })}
                 placeholder='abc@mail.com' 
                 className='Loginpage_formEmailInput' />
                 {errors?.email && <p className='error_authentication'>Email is required</p>}
            </div>
            <button type='submit' className='Loginpage_formLoginButton'>Resets</button>
                        
            <p className='Loginpage_formSignup'>
              <span className='Loginpage_SingupText'>
                <Link style={{color:'rgba(71, 177, 67, 1)'}} to='/login'>Back to login</Link>
                </span>
                </p>
            <Modal
        open={show}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Lottie style={{width: '200px', height:'200px'}} animationData={football} />
            </Box>
        
      </Modal>
        </form>
    </div>
  )
}

export default ForgotPassword