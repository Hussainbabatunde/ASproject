import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { RxEyeClosed } from "react-icons/rx";
import { BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Lottie from "lottie-react";
import football from "../../assets/lottie/92356-football.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "../../Slice/auth/Login";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 210,
  p: 4,
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.reducer.LoginSlice?.logindata);

  // useEffect( ()=>{
  //     if(userData?.data?.user_type == 'player'){
  //       navigate('/afrisport/player/profile')
  //     }
  //     else if(userData?.data?.user_type == 'admin'){
  //       navigate('/admin/admin/dashboard')
  //     }
  //     else if(userData?.data?.user_type == 'scout'){
  //       navigate('/afrisport/scout/profile')
  //     }
  //     else if(userData?.data?.user_type == 'manager'){
  //       navigate('/afrisport/manager/profile')
  //     }
  //   }, [userData, navigate])

  useEffect(() => {
    if (userData?.data?.user_type == "player") {
      console.log("player");
      navigate("/afrisport/player/profile");
    } else if (userData?.data?.user_type == "admin") {
      navigate("/admin/dashboard");
    } else if (userData?.data?.user_type == "scout") {
      navigate("/afrisport/scout/profile");
    } else if (userData?.data?.user_type == "talent-manager") {
      navigate("/afrisport/talent-manager/profile");
    }
  }, []);

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data)
    setShow(true);
    await dispatch(loginAuth(data));
    setShow(false);
  };

  const [showPassword, setShowPassword] = useState("password");

  const displayPassowrd = () => {
    setShowPassword("text");
  };

  const hidePassowrd = () => {
    setShowPassword("password");
  };

  // const handleSubmit= () =>{
  //     navigation('/scout/profile')
  // }
  return (
    <div className="Loginpage">
      <ToastContainer />
      <p className="Loginpage_Companyname">
        <Link className="Loginpage_Companyname" to="/">
          AfriSport-Pro
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="Loginpage_formSection">
        <p className="Loginpage_formTopic">Login to your account</p>
        <p className="Loginpage_formTopicdetails">
          Securely login to AfriSport-Pro
        </p>
        <div className="Loginpage_formInputfield">
          <p className="Loginpage_formEmailaddr">Email Address</p>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="abc@mail.com"
            className="Loginpage_formEmailInput"
          />
          {errors?.email && (
            <p className="error_authentication">Email is required</p>
          )}
        </div>
        {/* <div className='Loginpage_formInputfield'>
                <p className='Loginpage_formEmailaddr'>Password</p>
                <input type='password' placeholder='Password' className='Loginpage_formEmailInput' />
            </div> */}
        <div className="CreateAccpage_formInputfield">
          <p className="Loginpage_formEmailaddr">Password</p>
          <div className="Loginpage_formPasswordInput">
            <input
              type={showPassword}
              {...register("password", { required: true })}
              placeholder="Password"
              className="Loginpage_PasswordInput"
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
          {errors?.password && (
            <p className="error_authentication">Password is required</p>
          )}
        </div>
        <p className="Loginpage_formForgotPassword">
          <Link style={{ color: "#0D0D9C" }} to="/forgotPassword">
            Forgot Password?
          </Link>
        </p>
        <button className="Loginpage_formLoginButton" onClick={handleSubmit}>
          Log in
        </button>
        <div className="Loginpage_formOrSection">
          <div className="Loginpage_formHrLine"></div>
          <p>or</p>
          <div className="Loginpage_formHrLine"></div>
        </div>
        <div className="Login_GoogleSignin">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <p className="Loginpage_formSignup">
          Don't have an account?{" "}
          <span className="Loginpage_SingupText">
            <Link className="Loginpage_enquireacc" to="/signup">
              Sign up
            </Link>
          </span>
        </p>
        <Modal
          open={show}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Lottie
              style={{ width: "200px", height: "200px" }}
              animationData={football}
            />
          </Box>
        </Modal>
      </form>
    </div>
  );
};

export default Login;
