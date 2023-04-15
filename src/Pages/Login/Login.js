import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'

const Login = () => {
  return (
    <div className='Loginpage'>
        <p className='Loginpage_Companyname'><Link className='Loginpage_Companyname' to='/'>AfriSport-Pro</Link></p>
        <form className='Loginpage_formSection'>
            <p className='Loginpage_formTopic'>Login to your account</p>
            <p className='Loginpage_formTopicdetails'>Securely login to AfriSport-Pro</p>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Email Address</p>
                <input type='text' placeholder='abc@mail.com' className='Loginpage_formEmailInput' />
            </div>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Password</p>
                <input type='password' placeholder='Password' className='Loginpage_formEmailInput' />
            </div>
            <p className='Loginpage_formForgotPassword'><Link style={{color:'#0D0D9C'}} to='/forgotPassword'>Forgot Password?</Link></p>
            <button className='Loginpage_formLoginButton'>Log in</button>
            <div className='Loginpage_formOrSection'>
                <div className='Loginpage_formHrLine'></div>
                <p>or</p>
                <div className='Loginpage_formHrLine'></div>
            </div>
            <div className='Login_GoogleSignin'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />
                </div>
            <p className='Loginpage_formSignup'>Don't have an account?  <span className='Loginpage_SingupText'><Link style={{color:'rgba(71, 177, 67, 1)'}} to='/signup'>Sign up</Link></span></p>
        </form>
    </div>
  )
}

export default Login