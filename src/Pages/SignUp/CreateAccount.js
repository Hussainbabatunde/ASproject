import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Signup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux'
import { RegisterAuth } from '../../Slice/auth/Login'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Lottie from 'lottie-react';
import footballLogo from "../../assets/footballLogo.png";
import football from '../../assets/lottie/92356-football.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { RxEyeClosed } from 'react-icons/rx'
import { BsEyeFill } from 'react-icons/bs'
import { ScaleLoader } from 'react-spinners'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    p: 4,
  };


const CreateAccount = () => {
    
//   console.log('env file',process.env.REACT_APP_AFRISPORTURL)

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [checkedRadio, setCheckedRadio] = useState(false)
    const navigate = useNavigate();
    const userData = useSelector((state)=> state.reducer.LoginSlice?.registerData )

    useEffect( ()=>{
        if(userData?.message == 'Registration Successful. Email Verification Link sent to your email'){
          navigate('/verify')
        }
      }, [userData, navigate])

    
      const formSchema = Yup.object().shape({
        fullname: Yup.string().required('First and last name is required'),
        email: Yup.string().email().required(),
        password: Yup.string()
          .required('Password is mandatory')
          .min(8, 'Password must be atleast 8 characters long'),
        confirm_password: Yup.string()
          .required('Confirm Password is mandatory')
          .oneOf([Yup.ref('password')], 'Passwords does not match'),
      })
      const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    
    let {id} = useParams()
    // console.log('id ', id)
    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState(false)  
    const [showPassword, setShowPassword] = useState("password");

    const displayPassowrd = () => {
      setShowPassword("text");
    };
  
    const hidePassowrd = () => {
      setShowPassword("password");
    };

    const [showPassword2, setShowPassword2] = useState("password");

    const displayPassowrd2 = () => {
      setShowPassword2("text");
    };
  
    const hidePassowrd2 = () => {
      setShowPassword2("password");
    };
    
    
    const onSubmit = async (data) => {
        data.user_type= id
        data.phone = phone
        if(phone?.length < 7){
            setPhoneErr(true)
        }else{
          if(checkedRadio){
            // console.log(checkedRadio)
            setShow(true)
            await dispatch(RegisterAuth(data))
            setShow(false)
          }
        }
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
            <p className='Loginpage_formTopic'>Create your account</p>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>First and Last name</p>
                <input type='text' 
                aria-invalid={errors.fullname ? 'true' : 'false'}
                {...register("fullname", { required: true })} 
                placeholder='First and Last name' 
                className='Loginpage_formEmailInput' />
                <p className='error_authentication'>{errors?.fullname?.message}</p>
            </div>
            <div className='CreateAccpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Phone number</p>
                <div className='CreateAccpage_PhoneInputSec'>
                <PhoneInput
                    country={'us'}
                    value={phone}
                    inputStyle={{ width: '100%' }}
                    onChange={phone => setPhone(phone)}
                    />
                    </div>
                   {phoneErr && <p className='error_authentication'>Phone number is required</p>}
            </div>
            <div className='CreateAccpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Email</p>
                <input type='text'
                aria-invalid={errors.email ? 'true' : 'false'}
                 {...register("email", { required: true })} 
                 placeholder='abc@mail.com' 
                 className='Loginpage_formEmailInput' />
                <p className='error_authentication'>{errors?.email?.message}</p>
            </div>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Password</p>
                <div className="Loginpage_formPasswordInput">
                <input type={showPassword}
                {...register('password', { required: true, minLength: 8 })}
                aria-invalid={errors.password ? 'true' : 'false'}
                 placeholder='Password' 
                 className='Loginpage_PasswordInput' 
                 />
                 {showPassword == "password" && (
              <RxEyeClosed
                onClick={displayPassowrd}
                style={{ fontSize: "16px" }}
              />
            )}
            {showPassword == "text" && (
              <BsEyeFill onClick={hidePassowrd} style={{ fontSize: "16px" }} />
            )}
                 </div>
                 <p className='error_authentication'>{errors?.password?.message}</p>
            </div>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Confirm Password</p>
                
                <div className="Loginpage_formPasswordInput">
                <input type={showPassword2} 
                {...register('confirm_password', { required: true, minLength: 8 })}
                aria-invalid={errors.confirm_password ? 'true' : 'false'}
                placeholder='Password' 
                className='Loginpage_PasswordInput' />
                {showPassword2 == "password" && (
              <RxEyeClosed
                onClick={displayPassowrd2}
                style={{ fontSize: "16px" }}
              />
            )}
            {showPassword2 == "text" && (
              <BsEyeFill onClick={hidePassowrd2} style={{ fontSize: "16px" }} />
            )}
                </div>
                <p className='error_authentication'>{errors?.confirm_password?.message}</p>
            </div>
            <p className='CreateAccpage_termsandPolicy'><input type='checkbox' required value={checkedRadio} onChange={()=> setCheckedRadio(!checkedRadio)} /> <span className='CreateAccpage_TermsandPolicyText'> I agree to the AfriSport-Pro <span className='CreateAccpage_TermsofUse'>Terms of Use</span> and <span className='CreateAccpage_TermsofUse'>Privacy policy</span> </span></p>
            <button type='submit' className='Loginpage_formLoginButton'>
            {show? <ScaleLoader
                                  color="white"
                                  size={10}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                /> 
                                :  
                                <span>Submit</span> }
            </button>
            <p className='Loginpage_formSignup'>Already have an account?  <span className='Loginpage_SingupText'><Link className='Loginpage_enquireacc' to='/login'>Log in</Link></span></p>
            {/* <Modal
        open={show}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Lottie style={{width: '200px', height:'200px'}} animationData={football} />
            </Box>
        
      </Modal> */}
        </form>
    </div>
  )
}

export default CreateAccount