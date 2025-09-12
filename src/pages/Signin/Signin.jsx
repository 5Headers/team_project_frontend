/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc"; // ✅ 구글 아이콘
import { SiNaver } from "react-icons/si"; // 네이버
import { RiKakaoTalkFill } from "react-icons/ri"; // 카카오
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );

  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const signinOnClickHandler = () => {
    // 1. 입력값 확인
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }

    // 2. 유효성 검사 확인
    if (errorMessage.username) {
      alert(errorMessage.username);
      return;
    }
    if (errorMessage.password) {
      alert(errorMessage.password);
      return;
    }

    // 3. 로그인 성공 시 이동
    alert("로그인 성공!");
    navigate("/"); // 홈 화면 이동
  };

  // 아이디 / 비밀번호 유효성 검사
  useEffect(() => {
    const newErrorMessage = {};

    // 아이디 정규식 (6자리 이상, 문자+숫자+특수문자 포함)
    if (username.length > 0) {
      const usernameRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,}$/;
      if (!usernameRegex.test(username)) {
        newErrorMessage.username = "아이디 형식에 맞지 않습니다.";
      }
    }

    // 비밀번호 정규식 (8~16자, 문자+숫자+특수문자 포함)
    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password = "비밀번호 형식에 맞지 않습니다.";
      }
    }

    setErrorMessage(newErrorMessage);
  }, [username, password]);

  return (
    <div css={s.container}>
      <h2>로그인</h2>
      <div css={s.box}>
        <div css={s.inputBox}>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem("username", e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              localStorage.setItem("password", e.target.value);
            }}
          />
        </div>
        <div css={s.keepLoginBox}>
          <label>
            <input type="checkbox" /> 로그인 유지
          </label>
        </div>
        <div css={s.signinBtnBox}>
          <button className="signin" onClick={signinOnClickHandler}>
            로그인
          </button>
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
