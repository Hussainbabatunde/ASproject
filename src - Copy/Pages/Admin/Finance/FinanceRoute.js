import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminFinance from "../../../Components/Admin/AdminFinance/AdminFinance";
import AdminFinanaceTransaction from "../../../Components/Admin/AdminFinance/AdminFinanaceTransaction";

function FinanceRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminFinance />} />
      <Route path="/transaction" element={<AdminFinanaceTransaction />} />

      {/* <Route path="/profile/:id" element={<Profile />} /> */}
      {/* <Route path="/:id" element={<TalentManagerDetail />} /> */}
    </Routes>
  );
}

export default FinanceRoute;
