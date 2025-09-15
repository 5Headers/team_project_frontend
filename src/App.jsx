import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";
import PickList from "./pages/PickList/PickList";

function App() {
  return (
    <div>
      <Layout>
        <Home />
        {/* <PickList/> */}
      </Layout>{" "}
      {/* 배경 레이아웃 */}
    </div>
  );
}

export default App;
