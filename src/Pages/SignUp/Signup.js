import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import iconsSoccerPlayer from "../../assets/icons-soccerplayer.png";
import iconsPersonaltrainer from "../../assets/icons-personaltrainer.png";
import iconscheerleader from "../../assets/iconscheerleader.png";
import iconsManager from "../../assets/iconsmanager.png";

const Signup = () => {
  const data = [
    {
      accType: "Player",
      image: iconsSoccerPlayer,
      accDetails: "Grow and monetize your brand",
      value: "/create-account/player",
    },
    {
      accType: "Scout",
      image: iconsPersonaltrainer,
      accDetails: "Scout and book players",
      value: "/create-account/scout",
    },
    {
      accType: "Fan",
      image: iconscheerleader,
      accDetails: "Reach out to your favorite players",
      value: "/create-account/fan",
    },
    {
      accType: "Talent Manager",
      image: iconsManager,
      accDetails: "Support and manager players",
      value: "/create-account/talent-manager",
    },
  ];
  return (
    <div className="Loginpage">
      <p className="Loginpage_Companyname">
        <Link className="Loginpage_Companyname" to="/">
          AfriSport-Pro
        </Link>
      </p>
      <form className="Loginpage_formSection">
        <p className="Loginpage_formTopic">Select Account Type</p>
        {data.map((each, index) => (
          <Link
            to={each?.value}
            className="SignupPage_DifferentAcc"
            key={index}
          >
            <img src={each?.image} width="30px" height="30px" />
            <div className="SignupPage_AccTypeContent">
              <p className="SignupPage_Acctype">{each?.accType}</p>
              <p>{each?.accDetails}</p>
            </div>
          </Link>
        ))}
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
          Already have an account?{" "}
          <span className="Loginpage_SingupText">
            <Link className="Loginpage_enquireacc" to="/login">
              Log in
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
