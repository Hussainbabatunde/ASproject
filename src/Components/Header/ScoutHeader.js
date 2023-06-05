import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MdNotifications } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ScoutHeader = () => {
  const [openNav, setOpenNav] = useState("HomePage_ShownDetails_NavMenu");
  const [iconOpen, setIconOpen] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.reducer.LoginSlice?.logindata);

  const handleOpen = () => {
    setIconOpen(true);
    setOpenNav("HomePage_ShownDetails_OpenNavMenu");
  };
  const handleUserProfile = () => {
    if (userData?.data?.user_type == "player") {
      navigate("/afrisport/player/profile");
    } else if (userData?.data?.user_type == "admin") {
      navigate("/admin/admin/dashboard");
    } else if (userData?.data?.user_type == "scout") {
      navigate("/afrisport/scout/profile");
    } else if (userData?.data?.user_type == "fan") {
      navigate("/afrisport/fan/profile");
    } else if (userData?.data?.user_type == "talent-manager") {
      navigate("/afrisport/talent-manager/profile");
    }
  };

  const handleClose = () => {
    setIconOpen(false);
    setOpenNav("HomePage_ShownDetails_NavMenu");
  };
  return (
    <>
      <div className="Homepage_header">
        <Link to="/afrisport/player/homepage">
          <img src={logo} alt="Afrisport logo" />
        </Link>
        <div className="Admin_wholeNavigationBar">
          <div className="Admin_HeaderNotification_div">
            <MdNotifications className="Admin_headerNotification" />
            <div className="Admin_NotificationSign"></div>
          </div>
          <p style={{ cursor: "pointer" }} onClick={handleUserProfile}>
            <BsFillPersonFill className="Admin_headerNotification" />
          </p>
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
            <Link to="/login" className="Header_login">
              Login
            </Link>
            <Link to="/signup" className="Header_CreateAcc">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoutHeader;
