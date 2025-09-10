import Header from "./components/header/Header";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Layout>
       <Home/> 
      </Layout> {/* 배경 레이아웃 */}
    </div>
  );
}

export default App;
