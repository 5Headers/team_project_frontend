import "./App.css";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Header from "./components/header/Header";
import Signup from "./pages/Signup/Signup";
import MainRouter from "./router/MainRouter/MainRouter";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./router/AuthRouter/AuthRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter>
  );
}

export default App;
