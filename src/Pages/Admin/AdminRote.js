import React from "react";
import { Route, Routes } from "react-router-dom";
import "./AdminPage.css";
import AdminDashboard from "./AdminDashboard";
import AdminHeader from "../../Components/Header/AdminHeader";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import AdminNegotiate from "./AdminNegotiate";
import AdminPlayer from "./Players/AdminPlayer";
import AdminScouts from "../../Components/Admin/AdminScouts/AdminScouts";
import AdminFinance from "../../Components/Admin/AdminFinance/AdminFinance";
import AdminFinanaceTransaction from "../../Components/Admin/AdminFinance/AdminFinanaceTransaction";
import AdminAdmins from "../../Components/Admin/AdminAdmins/AdminAdmins";
import AdminTalentMangersStep from "../../Components/Admin/AdminTalentManagers/AdminTalentManagersStep";
import AdminTalentManagers from "../../Components/Admin/AdminTalentManagers/AdminTalentManagers";
import AdminNegotiateAllNegotiate from "../../Components/Admin/AdminNegotiate/AdminNegotiateAllNegotiate";
import AdminNegotiateSuspended from "../../Components/Admin/AdminNegotiate/AdminNegotiateSuspended";
import AdminNegotiateClosed from "../../Components/Admin/AdminNegotiate/AdminNegotiateClosed";
import AdminNegotiateTerminated from "../../Components/Admin/AdminNegotiate/AdminNegotiateTerminated";
import AdminAllAdmins from "../../Components/Admin/AdminAdmins/AdminAllAdmins";
import AdminRoles from "../../Components/Admin/AdminAdmins/AdminRoles";
import AdminPermissions from "../../Components/Admin/AdminAdmins/AdminPermissions";
import Privilege from "../../Components/Admin/AdminAdmins/Privilege";
import Authorization from "./Authorization";
import PlayersRoute from "./Players/PlayersRoute";

const AdminRote = () => {
  return (
    <div>
      <AdminHeader />
      <div className="AdminMainPage">
        <AdminSidebar />
        <Routes>
          <Route path="/" element={<AdminAllAdmins />} />
          <Route path="/players/*" element={<PlayersRoute />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/authorization" element={<Authorization />} />

          <Route path="/admin/negotiate" element={<AdminNegotiate />} />
          <Route path="/admin/scouts" element={<AdminScouts />} />
          <Route path="/admin/finance" element={<AdminFinance />} />
          <Route
            path="/admin/finance/transaction"
            element={<AdminFinanaceTransaction />}
          />

          <Route path="/admin/admins" element={<AdminAdmins />} />
          {/* <Route path="/admin/admins/alladmins" element={<AdminAllAdmins />} /> */}
          <Route path="/admin/admins/roles" element={<AdminRoles />} />
          <Route
            path="/admin/admins/permission"
            element={<AdminPermissions />}
          />
          <Route path="/admin/admins/privilege" element={<Privilege />} />
          <Route
            path="/admin/talentManager"
            element={<AdminTalentManagers />}
          />
          <Route
            path="/admin/negotiate/allnegotiate"
            element={<AdminNegotiateAllNegotiate />}
          />
          <Route
            path="/admin/negotiate/suspended"
            element={<AdminNegotiateSuspended />}
          />
          <Route
            path="/admin/negotiate/closed"
            element={<AdminNegotiateClosed />}
          />
          <Route
            path="/admin/negotiate/terminated"
            element={<AdminNegotiateTerminated />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRote;
