import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MdNotifications } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Echo from "laravel-echo";
import axios from "axios";
import Pusher from "pusher-js";
import { useQuery } from "react-query";

let baseurl = process.env.REACT_APP_AFRISPORTURL;

const client = axios.create({ baseURL: baseurl });

const getNotification = () => {
  let token = localStorage.getItem("token");
  // return axios.get(`http://localhost:8000/api/get-offer-notification/${heroId}`)
  const options = { url: "offer-notification", method: "GET" };
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

const ScoutHeader = () => {
  const [openNav, setOpenNav] = useState("HomePage_ShownDetails_NavMenu");
  const [iconOpen, setIconOpen] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector(
    (state) => state?.reducer?.LoginSlice?.logindata?.data?.user?.id
  );

  const userData = useSelector((state) => state.reducer.LoginSlice?.logindata);

  // useEffect (() =>{
  //   echo.channel(`offer.${userId}`).listen('CommentNotificationEvent', function (data, err){
  //     console. log('notification data ',data)
  //   })
  //   }, [])

  const { isLoading, data, isError, error, refetch, onSuccess, onError } =
    useQuery("recent-offer", getNotification, {
      cacheTime: 0,
      refetchOnMount: true,
      refreshOnWindowFocus: true,
      refreshInterval: 300,
      refreshIntervalInBackground: true,
      enable: true,
    });

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
          <img
            src={logo}
            alt="Afrisport logo"
            className="cursor-pointer sm:w-[61px] sm:h-[20px] lg:w-[122px] lg:h-[62px]"
          />
        </Link>
        <div className="flex">
          <Link to="/filterPage" className="mx-4">
            Players
          </Link>
          {/* <p className="mx-4">Terms & Conditions</p> */}
          <Link to="/pricingpage" className="mx-4">
            Pricing
          </Link>

          <Link to="/mission" className="mx-4">
            Mission
          </Link>

          <Link to="/terms" className="mx-4">
            Terms & Conditions
          </Link>
        </div>
        <div className="Admin_wholeNavigationBar">
          <Link
            to="/afrisport/notifications"
            className="Admin_HeaderNotification_div"
          >
            <MdNotifications className="Admin_headerNotification" />
            <div className="Admin_NotificationSign"></div>
          </Link>
          <p style={{ cursor: "pointer" }} onClick={handleUserProfile}>
            <BsFillPersonFill className="Admin_headerNotification" />
          </p>
        </div>
      </div>
      <div className="Homepage_Menudisplay">
        <div className="Homepage_ShownMenuBar">
          <div className="Homepage_headerNavbar">
            <Link to="/afrisport/player/homepage">
              <img
                src={logo}
                alt="Afrisport logo"
                className="w-[81px] h-[50px]"
              />
            </Link>
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
            <Link to="/pricingpage" className="Header_login">
              Pricing
            </Link>
            <div className="Admin_HeaderNotification_div">
              <MdNotifications className="Admin_headerNotification" />
              <div className="Admin_NotificationSign"></div>
            </div>
            <p
              style={{ cursor: "pointer", marginTop: "10px" }}
              onClick={handleUserProfile}
            >
              <BsFillPersonFill className="Admin_headerNotification" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoutHeader;
