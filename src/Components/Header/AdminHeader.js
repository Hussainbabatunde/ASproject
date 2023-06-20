import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "./AdminHeader.css";
import footballLogo from "../../assets/logo-img.png";
import AdminImg from "../../assets/AdminImg.png";

const AdminHeader = () => {
  return (
    <div className="Adminpage_Header ">
      <div className="AdminPage_NavMainHeader">
        <GiHamburgerMenu className="AdminPage_MenuSidebar" />
        <div className="AdminPage_MainHeaderRightSide">
          <img src={footballLogo} alt="logo" width="100px" height="40px" />
          <p className="AdminPage_SuperAdminText">Super-Admin</p>
        </div>
      </div>
      <div className="AdminPage_MainHeaderLefttSide">
        <img
          src={AdminImg}
          alt="logo"
          width="40px"
          height="40px"
          className="AdminPage_FootballLogo"
        />
        <p className="AdminPage_SuperAdminText">CB</p>
      </div>
    </div>
  );
};

export default AdminHeader;
