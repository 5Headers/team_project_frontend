/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/AuthInput/AuthInput";
import { signinRequest } from "../../apis/auth/authApi";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const signinOnClickHandler = () => {
    if (!username.trim() || !password.trim()) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    }
    if (errorMessage.username) return alert(errorMessage.username);
    if (errorMessage.password) return alert(errorMessage.password);

    signinRequest({ username, password })
      .then((response) => {
        //  const data = await response.json();  // JSON 변환
        console.log("API 응답:", response.data);
        
        if (response.data.status === "success") {
          localStorage.setItem("accessToken", response.data.data);

          // Header 상태 즉시 반영
          window.dispatchEvent(new Event("login"));

          navigate("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("로그인 중 오류가 발생했습니다.");
      });
  };

  // 아이디 / 비밀번호 유효성 검사
  useEffect(() => {
    const newErrorMessage = {};
    if (username && !/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/.test(username))
      newErrorMessage.username = "아이디 형식에 맞지 않습니다.";
    if (
      password &&
      !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/.test(password)
    )
      newErrorMessage.password = "비밀번호 형식에 맞지 않습니다.";
    setErrorMessage(newErrorMessage);
  }, [username, password]);

  return (
    <div css={s.container}>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type="text"
            placeholder="아이디"
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호"
            state={password}
            setState={setPassword}
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
          <a href="/auth/find">ID/PW 찾기</a>
          <a href="/auth/signup">회원가입</a>
        </div>
        <div css={s.oauthBtnBox}>
          <p className="title">소셜 로그인</p>
          <div className="icons">
            <a className="google">
              <FcGoogle size={28} />
            </a>
            <a className="naver">
              <SiNaver size={28} color="#03C75A" />
            </a>
            <a className="kakao">
              <RiKakaoTalkFill size={28} color="#Fee500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
