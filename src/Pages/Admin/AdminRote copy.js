import React from "react";
import { Route, Routes } from "react-router-dom";
import "./AdminPage.css";
import AdminDashboard from "./AdminDashboard";
import AdminHeader from "../../Components/Header/AdminHeader";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import PlayersRoute from "./Players/PlayersRoute";
import ScoutRoute from "./Souts/ScoutRoute";
import TalentmanagerRoute from "./TalentManagers/TalentmanagerRoute";
import AdsRoute from "./Ads/AdsRoute";
import NegotiationRoute from "./Negotiation/NegotiationRoute";
import FanRoute from "./Fans/FanRoute";
import AdminUserRoute from "./AdminUser/AdminUserRoute";
import FinanceRoute from "./Finance/FinanceRoute";

const AdminRote = () => {
  return (
    <div>
      <AdminHeader />
      <div className="AdminMainPage">
        <AdminSidebar />
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
      </div>
    </div>
  );
};

export default AdminRote;
