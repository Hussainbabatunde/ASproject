import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPlayer from "./AdminPlayer";
import PlayerDetails from "./PlayerDetails";

function PlayersRoute() {
  return (
    <Routes>
      <Route path="/" element={<AdminPlayer />} />
      <Route path="/:id" element={<PlayerDetails />} />
    </Routes>
  );
}

export default PlayersRoute;
