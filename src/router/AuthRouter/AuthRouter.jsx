import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/Signin";
import Find from "../../pages/Find/Find";
import Profile from "../../pages/Profile/Profile";
import OAuth2Signup from "../../pages/OAuth2Signup/OAuth2Signup";
import OAuth2Merge from "../../pages/OAuth2Merge/OAuth2Merge";
import OAuth2Signin from "../../pages/OAuth2Signin/OAuth2Signin";
import OAuth2 from"../../pages/OAuth2/OAuth2";
import EstimateDetail from "../../pages/EstimateDetail/EstimateDetail";

function AuthRouter() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/find" element={<Find />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/estimate/:id" element={<EstimateDetail />} />
      <Route path="/oauth2" element={<OAuth2 />} />
        <Route path="/oauth2/signup" element={<OAuth2Signup />} />
        <Route path="/oauth2/signin" element={<OAuth2Signin />} />
        <Route path="/oauth2/merge" element={<OAuth2Merge />} />
    </Routes>
  );
}

export default AuthRouter;
