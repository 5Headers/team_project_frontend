import Layout from "../../components/layout/layout";
import Home from "../../pages/Home/Home";
import PickList from "../../pages/PickList/PickList";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "../AuthRouter/AuthRouter";
import Setting from "../../pages/Setting/Setting";

function MainRouter() {
  return (
    <Routes>
      {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
      <Route
        path="*"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/picklist"
        element={
          <Layout>
            <PickList />
          </Layout>
        }
      />
      <Route
        path="/setting" // 새 설정 페이지 라우트
        element={
          <Layout>
            <Setting />
          </Layout>
        }
      />
      <Route
        path="/auth/*"
        element={
          <Layout>
            <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
              <AuthRouter /> {/* 로그인/회원가입 페이지 전용 배경 적용 */}
            </div>
          </Layout>
        }
      />
    </Routes>
  );
}

export default MainRouter;
