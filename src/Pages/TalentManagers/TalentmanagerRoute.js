import React from "react";
import { Route, Routes } from "react-router-dom";

import ScoutHeader from "../../Components/Header/ScoutHeader";

import Talent_manager_Profile from "./Talent_manager_Profile";
import TalentManagerDeal from "./TalentManagerDeal";
import Talent_manager_palyer from "./Talent_manager_palyer";
import Talent_Add_Player from "./Talent_Add_Player";
import Talent_Edit_player from "./Talent_Edit_player";
import PlayerViews from "../../Components/Player/PlayerView";
import PlayerDetails from "../Admin/Players/PlayerDetails";
import Talent_PlayerDetails from "./Talent_PlayerDetails";
import Talent_manger_Request from "./Talent_manger_Request";
import PlayerDealsMade from "../../Components/TalentManagersCompnente/PlayerDealsMade";
import Footer from "../../Components/Homepage/Footer";

function TalentmanagerRoute() {
  return (
    <div>
      <ScoutHeader />

      <Routes>
        <Route path="/profile" element={<Talent_manager_Profile />} />
        <Route path="/deal" element={<TalentManagerDeal />} />

        <Route path="/request" element={<Talent_manger_Request />} />

        <Route path="/players" element={<Talent_manager_palyer />} />
        <Route path="/edit-player" element={<Talent_Edit_player />} />

        <Route path="/add-players" element={<Talent_Add_Player />} />
        <Route path="/player" element={<Talent_PlayerDetails />} />

        <Route path="/deal_detail" element={<PlayerDealsMade />} />
      </Routes>

      
      <Footer />
    </div>
  );
}

export default TalentmanagerRoute;
