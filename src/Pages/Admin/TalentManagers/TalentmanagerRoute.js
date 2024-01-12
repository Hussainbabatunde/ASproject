import React from "react";
import { Route, Routes } from "react-router-dom";
// import Profile from "./Profile";
// import AdminScouts from "../../../Components/Admin/AdminScouts/AdminScouts";
// import ScoutDetails from "./ScoutDetails";
import AdminTalentManagers from "../../../Components/Admin/AdminTalentManagers/AdminTalentManagers";
import TalentManagerDetail from "./TalentManagerDetail";
import TalentNegotiationDetails from "./TalentNegotiationDetails";

function TalentmanagerRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminTalentManagers />} />
      <Route
        path="/negotiation-detail"
        element={<TalentNegotiationDetails />}
      />

      <Route path="/:id" element={<TalentManagerDetail />} />
    </Routes>
  );
}

export default TalentmanagerRoute;
