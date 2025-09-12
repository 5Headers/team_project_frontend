/** @jsxImportSource @emotion/react */
import Header from "../header/Header";
import * as s from "./styles";

function Layout({ children }) {
  return (
    <div css={s.container}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
