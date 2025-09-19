/** @jsxImportSource @emotion/react */
import * as s from "../styles";

function Logout() {
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>로그아웃</h2>
      <p css={s.desc}>현재 계정에서 로그아웃하시겠습니까?</p>
      <button css={s.button} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default Logout;
