import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import trophy from "../../assets/lottie/107653-trophy.json";
import Lottie from 'lottie-react';
import './VerifySignup.css'
import footballLogo from "../../assets/footballLogo.png";
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const VerifiedSignup = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        const clearSignup = () =>{
            dispatch(dispatch({ type: "RESET" }));
        }
        clearSignup()
    },[])
  return (
    <div className="Loginpage">
        <ToastContainer />
      <p className="Loginpage_Companyname">
      <Link className="Loginpage_companyImg" to="/">
          <img src={footballLogo} width='70px' />
        </Link>
      </p>
        <div className="VerifySignupDiv">
        <Lottie
              style={{ width: "200px", height: "200px" }}
              animationData={trophy}
            />
            <p>Check your mail to Verify your account.</p>
        </div>
    </div>
  )
}

export default VerifiedSignup