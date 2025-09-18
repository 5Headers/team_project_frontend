// App.jsx
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import MainRouter from "./router/MainRouter/MainRouter.jsx";

function App() {
  const [likedItems, setLikedItems] = useState([]);

  const addLikedItem = (item) => {
    setLikedItems(prev => [...prev, item]);
  };

  return (
    <BrowserRouter>
      <Layout likedItems={likedItems} addLikedItem={addLikedItem}>
        <MainRouter likedItems={likedItems} addLikedItem={addLikedItem} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
