import React from "react";
import { Route, Routes } from "react-router-dom";
import Maps from "../../pages/googlemap/Maps";
import Home from "../../pages/home/Home";


function MainRouter() {
  return (
    <Routes>
      {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
}

export default MainRouter;
