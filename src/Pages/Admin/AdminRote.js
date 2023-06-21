import React from "react";
import AdminHeader from "../../Components/Header/AdminHeader";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
// import "./AdminSidebar.css";
import { NavLink, Route, Routes } from "react-router-dom";
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

import "./AdminPage.css";
import AdminDashboard from "./AdminDashboard";

import PlayersRoute from "./Players/PlayersRoute";
import ScoutRoute from "./Souts/ScoutRoute";
import TalentmanagerRoute from "./TalentManagers/TalentmanagerRoute";
import AdsRoute from "./Ads/AdsRoute";
import NegotiationRoute from "./Negotiation/NegotiationRoute";
import FanRoute from "./Fans/FanRoute";
import AdminUserRoute from "./AdminUser/AdminUserRoute";
import FinanceRoute from "./Finance/FinanceRoute";

function AdminRote() {
  let data = [1, 2, 3, 4, 5, 6];
  return (
    <div className="h-screen w-screen bg-gray-200 overflow-hidden">
      <div className="h-[12%] ">
        <AdminHeader />
      </div>

      <div className="flex flex-grow">
        <div className="w-[20%] xl:w-[18%] bg-[#262626] h-screen ">
          <AdminSidebar />
        </div>

        <div className="flex-grow overflow-y-auto ">
          <div
            className="p-5 scrolabr"
            style={{ maxHeight: "calc(100vh - 70px)" }}
          >
            <Routes>
              <Route path="/*" element={<AdminUserRoute />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/players/*" element={<PlayersRoute />} />
              <Route path="/scouts/*" element={<ScoutRoute />} />
              <Route path="/fans/*" element={<FanRoute />} />
              <Route path="/talentManager/*" element={<TalentmanagerRoute />} />
              <Route path="/Ads/*" element={<AdsRoute />} />
              <Route path="/negotiations/*" element={<NegotiationRoute />} />
              <Route path="/finance/*" element={<FinanceRoute />} />
            </Routes>
            <div className="mt-10">1</div>

            {/* Remaining content */}
          </div>
          {/* Your remaining content */}
        </div>
      </div>
    </div>
  );
}

export default AdminRote;
