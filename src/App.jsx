import { BrowserRouter } from "react-router-dom";
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
