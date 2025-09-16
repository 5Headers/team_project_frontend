import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Maps from "../../pages/googlemap/Maps";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
}

export default MainRouter;

