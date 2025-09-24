import Layout from "../../components/layout/layout";
import Home from "../../pages/Home/Home";
import PickList from "../../pages/PickList/PickList";
import Setting from "../../pages/Setting/Setting";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "../AuthRouter/AuthRouter";
import Maps from "../../pages/googlemap/Maps";
import Main from "../../pages/Main/Main";

function MainRouter() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Main/>
          </Layout>
        }
      />
      {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
      <Route
        path="/search"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/setting"
        element={
          <Layout>
            <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
              <Setting />{" "}
              {/* 로그인/회원가입 페이지 전용 배경 적용, 설정에도 동일하게 적용함 */}
            </div>
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

      <Route path="/maps" element={<Maps />} />
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
      <Route
        path="/setting"
        element={
          <Layout>
            <Setting />
          </Layout>
        }
      ></Route>
    </Routes>
  );
}

export default MainRouter;