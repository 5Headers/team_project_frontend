import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";
import AuthRouter from "./router/AuthRouter/AuthRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
