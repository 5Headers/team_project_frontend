/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc"; // ✅ 구글 아이콘
import { SiNaver } from "react-icons/si"; // 네이버
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오

function Signin() {
  return (
    <div css={s.container}>
      <h2>로그인</h2>
      <div css={s.box}>
        <div css={s.inputBox}>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
        </div>
        <div css={s.keepLoginBox}>
          <label>
            <input type="checkbox" /> 로그인 유지
          </label>
        </div>
        <div css={s.signinBtnBox}>
          <button className="signin">로그인</button>
        </div>
        <div css={s.LinkBox}>
          <a href="/find">ID/PW 찾기</a>
          <a href="/signup">회원가입</a>
        </div>
        <div css={s.oauthBtnBox}>
          <a className="google">
            <FcGoogle size={23} />
            <span>구글 로그인</span>
          </a>
          <a className="naver">
            <SiNaver size={18} color="#03C75A" />
            <span>네이버 로그인</span>
          </a>
          <a className="kakao">
            <RiKakaoTalkFill size={20} color="#FEE500" />
            <span>카카오 로그인</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
