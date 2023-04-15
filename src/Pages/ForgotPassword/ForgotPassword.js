import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='Loginpage'>
        <p className='Loginpage_Companyname'><Link className='Loginpage_Companyname' to='/'>AfriSport-Pro</Link></p>
        <form className='Loginpage_formSection'>
            <p className='Loginpage_formTopic'>Forgot Password</p>
            <p className='Loginpage_formTopicdetails'>Enter your email to reset your password</p>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Email Address</p>
                <input type='text' placeholder='abc@mail.com' className='Loginpage_formEmailInput' />
            </div>
            <button className='Loginpage_formLoginButton'>Resets</button>
                        
            <p className='Loginpage_formSignup'><span className='Loginpage_SingupText'><Link style={{color:'rgba(71, 177, 67, 1)'}} to='/login'>Back to login</Link></span></p>
        </form>
    </div>
  )
}

export default ForgotPassword