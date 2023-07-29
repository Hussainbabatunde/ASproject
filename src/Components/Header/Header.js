import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [openNav, setOpenNav] = useState("HomePage_ShownDetails_NavMenu");
  const [iconOpen, setIconOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIconOpen(true);
    setOpenNav("HomePage_ShownDetails_OpenNavMenu");
  };

  const handleClose = () => {
    setIconOpen(false);
    setOpenNav("HomePage_ShownDetails_NavMenu");
  };
  return (
    <>
      <div className="Homepage_header">
        <img
          src={logo}
          className=" cursor-pointer"
          alt="Afrisport logo"
          onClick={() => navigate("/")}
        />
        <div className="flex">
          <Link to='/filterPage' className="mx-4">Players</Link>
          <p className="mx-4">About-us</p>
          <p className="mx-4">Pricing</p>
        </div>
        <div>
        
          <Link to="/login" className="Header_login">
            Login
          </Link>
          <Link to="/signup" className="Header_CreateAcc">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="Homepage_Menudisplay">
        <div className="Homepage_ShownMenuBar">
          <div className="Homepage_headerNavbar">
            <img src={logo} alt="Afrisport logo" />
            {iconOpen ? (
              <RxCross2 className="Homepage_MeniIcon" onClick={handleClose} />
            ) : (
              <FiMenu className="Homepage_MeniIcon" onClick={handleOpen} />
            )}
          </div>
          <div className={openNav}>
          <Link to="/filterPage" className="Header_login">
            Players
          </Link>
          <Link to="/login" className="Header_login">
            About Us
          </Link>
          <Link to="/login" className="Header_login">
            Pricing
          </Link>
            <Link to="/login" className="Header_login">
              Login
            </Link>
            <Link to="/signup" className="Header_CreateAcc">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
