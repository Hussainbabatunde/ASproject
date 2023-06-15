import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminFinance from "../../../Components/Admin/AdminFinance/AdminFinance";
import AdminFinanaceTransaction from "../../../Components/Admin/AdminFinance/AdminFinanaceTransaction";

function FinanceRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminFinanaceTransaction />} />
      <Route path="/:id" element={<AdminFinance />} />
    </Routes>
  );
}

export default FinanceRoute;
