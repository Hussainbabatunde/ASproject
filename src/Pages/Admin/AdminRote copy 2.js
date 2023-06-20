import React from "react";
import AdminHeader from "../../Components/Header/AdminHeader";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
// import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoIosPaper } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { GiMeepleGroup, GiHouse } from "react-icons/gi";
import {
  BsPersonLinesFill,
  BsFillPeopleFill,
  BsChevronDown,
} from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { AiFillBank } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { LogoutAuth } from "../../Slice/auth/Login";

function AdminRote() {
  return (
    <div className="h-screen w-screen bg-gray-200 overflow-hidden">
      <div className="h-[12%] ">
        <AdminHeader />
      </div>

      <div className="flex flex-grow">
        <div className="w-1/4 bg-[#262626] h-screen ">
          <AdminSidebar />
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="debug">
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
            <h1>Main Content</h1>
          </div>
          {/* Your remaining content */}
        </div>
      </div>
    </div>
  );
}

export default AdminRote;
