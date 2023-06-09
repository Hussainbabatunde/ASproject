import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin_Fans from "./Admin_Fans";
import FanDetails from "./FanDetails";

function FanRoute() {
  return (
    <Routes>
      <Route path="/" element={<Admin_Fans />} />
      <Route path="/:id" element={<FanDetails />} />
    </Routes>
  );
}

export default FanRoute;
