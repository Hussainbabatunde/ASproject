import React from "react";
import { Route, Routes } from "react-router-dom";

import Ads from "./Ads";

function AdsRoute() {
  return (
    <Routes>
      <Route path="/" element={<Ads />} />
      <Route path="/:id" element={<> </>} />
    </Routes>
  );
}

export default AdsRoute;
