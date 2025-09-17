import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/Signin";
import Find from "../../pages/Find/Find";
import Profile from "../../pages/Profile/Profile";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/find" element={<Find />} />
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default AuthRouter;
