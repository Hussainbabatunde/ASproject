import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import '../SignUp/Signup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth, ResetPasswordAuth } from '../../Slice/auth/Login'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Lottie from 'lottie-react';
import footballLogo from "../../assets/footballLogo.png";
import football from '../../assets/lottie/92356-football.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    p: 4,
  };


const ResetPassword = () => {
    

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    
      const formSchema = Yup.object().shape({
        
        password: Yup.string()
          .required('Password is mandatory')
          .min(8, 'Password must be at 3 char long'),
        confirm_password: Yup.string()
          .required('Confirm Password is mandatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
      })
      const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const[queryParameter] = useSearchParams()
    
    
    const onSubmit = async (data) => {
        data.user= queryParameter.get("user")
            // console.log(data)
            setShow(true)
            await dispatch(ResetPasswordAuth(data))
            setShow(false)
    };

  return (
    <div className='Loginpage'>
         <ToastContainer />
        <p className='Loginpage_Companyname'>
        <Link className="Loginpage_companyImg" to="/">
          <img src={footballLogo} width='70px' />
        </Link>
            </p>
        <form  onSubmit={handleSubmit(onSubmit)} className='Loginpage_formSection'>
            <p className='Loginpage_formTopic'>Reset Password</p>
            
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Password</p>
                <input type='password'
                {...register('password', { required: true, minLength: 8 })}
                aria-invalid={errors.password ? 'true' : 'false'}
                 placeholder='Password' 
                 className='Loginpage_formEmailInput' 
                 />
                 <p className='error_authentication'>{errors?.password?.message}</p>
            </div>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Confirm Password</p>
                <input type='password' 
                {...register('confirm_password', { required: true, minLength: 8 })}
                aria-invalid={errors.confirm_password ? 'true' : 'false'}
                placeholder='Password' 
                className='Loginpage_formEmailInput' />
                <p className='error_authentication'>{errors?.confirm_password?.message}</p>
            </div>
            <button type='submit' className='Loginpage_formLoginButton'>Submit</button>
            <p className='Loginpage_formSignup'><span className='Loginpage_SingupText'><Link className='Loginpage_enquireacc' to='/login'>Log in</Link></span></p>
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

export default ResetPassword