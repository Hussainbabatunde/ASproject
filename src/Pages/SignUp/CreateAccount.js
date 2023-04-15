import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Signup.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CreateAccount = () => {
    let {id} = useParams()
    console.log('id ', id)
    const [phone, setPhone] = useState('')
  return (
    <div className='Loginpage'>
        <p className='Loginpage_Companyname'><Link className='Loginpage_Companyname' to='/'>AfriSport-Pro</Link></p>
        <form className='Loginpage_formSection'>
            <p className='Loginpage_formTopic'>Create your account</p>
            <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>First and Last name</p>
                <input type='text' placeholder='First and Last name' className='Loginpage_formEmailInput' />
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
            </div>
            <div className='CreateAccpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Email</p>
                <input type='text' placeholder='abc@mail.com' className='Loginpage_formEmailInput' />
            </div>
            <div className='CreateAccpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Password</p>
                <input type='password' placeholder='Password' className='Loginpage_formEmailInput' />
            </div>
            <p className='CreateAccpage_termsandPolicy'><input type='checkbox' /> <span className='CreateAccpage_TermsandPolicyText'> I agree to the AfriSport-Pro <span className='CreateAccpage_TermsofUse'>Terms of Use</span> and <span className='CreateAccpage_TermsofUse'>Privacy policy</span> </span></p>
            <button className='Loginpage_formLoginButton'>Continue</button>
            
        </form>
    </div>
  )
}

export default CreateAccount