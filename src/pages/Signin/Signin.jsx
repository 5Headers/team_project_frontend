/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc"; // ✅ 구글 아이콘
import { SiNaver } from "react-icons/si"; // 네이버
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오

function Signin() {
  return (
    <div css={s.container}>
      <h1>로그인</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div css={s.signinBtnBox}>
          <button style={{ backgroundColor: "#6c757d" }}>회원가입</button>
          <button style={{ backgroundColor: "#0d6efd" }}>로그인</button>
        </div>
        <div css={s.oauthBtnBox}>
          <a>
            <FcGoogle size={20} />
            <span>구글로 로그인</span>
          </a>
          <a>
            <SiNaver size={20} color="#03C75A" />
            <span>네이버로 로그인</span>
          </a>
          <a>
            <RiKakaoTalkFill size={20} color="#FEE500" />
            <span>카카오로 로그인</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
