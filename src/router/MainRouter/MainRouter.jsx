import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import AuthRouter from "../AuthRouter/AuthRouter"; // 기존 AuthRouter 포함

function MainRouter() {
  return (
    <Routes>
      {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default MainRouter;

