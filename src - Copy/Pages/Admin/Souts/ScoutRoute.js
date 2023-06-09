import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import AdminScouts from "../../../Components/Admin/AdminScouts/AdminScouts";
import ScoutDetails from "./ScoutDetails";
import ScoutNegotiationDetails from "./ScoutNegotiationDetails";

function ScoutRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminScouts />} />

      <Route path="/negotiation-detail" element={<ScoutNegotiationDetails />} />
      <Route path="/profile/:id" element={<Profile />} />

      <Route path="/:id" element={<ScoutDetails />} />
    </Routes>
  );
}

export default ScoutRoute;
