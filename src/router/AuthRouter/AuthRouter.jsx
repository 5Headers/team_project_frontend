import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/Signin";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<Signin />} />
    </Routes>
  );
}

export default AuthRouter;
