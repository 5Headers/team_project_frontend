import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MainRouter from "./router/MainRouter/MainRouter.jsx";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainRouter />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
