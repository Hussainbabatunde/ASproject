import React from "react";
import { Route, Routes } from "react-router-dom";

import ActiveNegotiation from "./ActiveNegotiation";
import NegotiationDetails from "./NegotiationDetails";

function NegotiationRoute() {
  return (
    <Routes>
      <Route path="/" element={<ActiveNegotiation />} />
      <Route path="/:id" element={<NegotiationDetails />} />
    </Routes>
  );
}

export default NegotiationRoute;
