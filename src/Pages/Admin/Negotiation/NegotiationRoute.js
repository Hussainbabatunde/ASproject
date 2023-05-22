import React from "react";
import { Route, Routes } from "react-router-dom";
// import Profile from "./Profile";
// import AdminScouts from "../../../Components/Admin/AdminScouts/AdminScouts";
// import ScoutDetails from "./ScoutDetails";

import ActiveNegotiation from "./ActiveNegotiation";

function NegotiationRoute() {
  return (
    <Routes>
      <Route path="/" element={<ActiveNegotiation />} />
    </Routes>
  );
}

export default NegotiationRoute;
