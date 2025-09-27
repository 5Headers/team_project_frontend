import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import AuthRouter from "./router/AuthRouter/AuthRouter";
import MainRouter from "./router/MainRouter/MainRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // React Query의 클라이언트 인스턴스 생성
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </QueryClientProvider>
      {/* 배경 레이아웃 */}
    </div>
  );
}

export default App;
