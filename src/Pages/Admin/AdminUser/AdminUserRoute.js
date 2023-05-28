import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminAllAdmins from "./AdminAllAdmins";

function AdminUserRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminAllAdmins />} />
      {/* <Route path="/profile/:id" element={<Profile />} />
      <Route path="/:id" element={<ScoutDetails />} /> */}
    </Routes>
  );
}

export default AdminUserRoute;
