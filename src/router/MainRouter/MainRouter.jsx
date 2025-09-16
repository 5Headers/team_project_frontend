import Home from "../../pages/Home/Home";
import PickList from "../../pages/PickList/PickList";
import { Route, Routes } from "react-router-dom";

function MainRouter() {
  return (
    <Routes>
      {/* Routes: 여러 개의 Route를 감싸주는 컨테이너 역할 */}
      <Route path="/" element={<Home />} />
      <Route path="/picklist" element={<PickList />} />
    </Routes>
  );
}

export default MainRouter;
