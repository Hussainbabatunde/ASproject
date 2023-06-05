import React from "react";
import { Route, Routes } from "react-router-dom";

import ScoutHeader from "../../Components/Header/ScoutHeader";

import Talent_manager_Profile from "./Talent_manager_Profile";
import TalentManagerDeal from "./TalentManagerDeal";
import Talent_manager_palyer from "./Talent_manager_palyer";
import Talent_Add_Player from "./Talent_Add_Player";
import Talent_Edit_player from "./Talent_Edit_player";

function TalentmanagerRoute() {
  return (
    <div>
      <ScoutHeader />

      <Routes>
        <Route path="/profile" element={<Talent_manager_Profile />} />
        <Route path="/deal" element={<TalentManagerDeal />} />
        <Route path="/players" element={<Talent_manager_palyer />} />
        <Route path="/edit-player" element={<Talent_Edit_player />} />

        <Route path="/add-players" element={<Talent_Add_Player />} />
      </Routes>
    </div>
  );
}

export default TalentmanagerRoute;
