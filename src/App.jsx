import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import AuthRouter from "./router/AuthRouter/AuthRouter";
import MainRouter from "./router/MainRouter/MainRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>

      {/* 배경 레이아웃 */}
    </div>
  );
}

export default App;
