// import React from "react";
// import { Route, Routes } from "react-router-dom";
// // import Profile from "./Profile";
// // import AdminScouts from "../../../Components/Admin/AdminScouts/AdminScouts";
// // import ScoutDetails from "./ScoutDetails";
// import AdminTalentManagers from "../../../Components/Admin/AdminTalentManagers/AdminTalentManagers";
// import TalentManagerDetail from "./TalentManagerDetail";

// export default TalentmanagerRoute;

import React from "react";
import { Route, Routes } from "react-router-dom";

import ScoutHeader from "../../Components/Header/ScoutHeader";

import Talent_manager_Profile from "./Talent_manager_Profile";

function TalentmanagerRoute() {
  return (
    <div>
      <ScoutHeader />

      <Routes>
        <Route path="/profile" element={<Talent_manager_Profile />} />
      </Routes>
    </div>
  );
}

export default TalentmanagerRoute;
