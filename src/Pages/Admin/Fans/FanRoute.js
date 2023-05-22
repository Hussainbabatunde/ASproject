import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPlayer from "./AdminPlayer";
import PlayerDetails from "./PlayerDetails";
import Profile from "./Profile";
import Profile_review from "./Profile_review";

function PlayersRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminPlayer />} />
    </Routes>
  );
}

export default PlayersRoute;
