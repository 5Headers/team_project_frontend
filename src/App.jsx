import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";
import Header from "./components/header/Header";
import MainRouter from "./router/MainRouter/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
 

  return (
    <BrowserRouter>
        <AuthRouter />
      </BrowserRouter>
  );
}

export default App;
