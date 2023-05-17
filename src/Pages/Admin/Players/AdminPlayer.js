import React from "react";
// import "./AdminNegotiate.css";
import AdminPlayerStep from "../../../Components/Admin/AdminPlayers/AdminPlayerStep";

const AdminPlayer = () => {
  return (
    <div className="AdminDashboard">
      <div className="AdminPage_Dashboard">
        <div className="AdminPage_DashboardTAbleCat">
          <AdminPlayerStep />
        </div>
      </div>
    </div>
  );
};

export default AdminPlayer;
