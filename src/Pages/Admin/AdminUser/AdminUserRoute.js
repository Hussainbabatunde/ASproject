import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminAllAdmins from "./AdminAllAdmins";

function AdminUserRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminAllAdmins />} />
    </Routes>
  );
}

export default AdminUserRoute;
