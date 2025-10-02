/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput";
import * as s from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oauth2SignupRequest } from "../../apis/auth/authApi";

function OAuth2Signup() {
  // 입력 상태 관리
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  // URL 쿼리에서 이메일 값 가져오기 (디코딩 포함)
  useEffect(() => {
    const emailParam = searchParam.get("email");
    console.log("🔍 쿼리 emailParam:", emailParam);
    if (emailParam && emailParam !== "null") {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParam]);

  // 비밀번호 유효성 체크
  useEffect(() => {
    const newErrorMessage = {};
    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password =
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
      }
    }
    setErrorMessage(newErrorMessage);
  }, [password]);

  const signupOnClickHandler = () => {
    // 필수 입력값 체크
    if (
      name.trim().length === 0 ||
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 이메일 존재 여부 확인
    if (!email) {
      alert("이메일 정보가 확인되지 않았습니다.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 유효성 체크
    if (errorMessage.password) {
      alert(errorMessage.password);
      return;
    }

    // provider / providerUserId 체크
    const provider = searchParam.get("provider");
    const providerUserId = searchParam.get("providerUserId");
    if (!provider || !providerUserId) {
      alert("OAuth2 정보가 없습니다. 다시 시도해주세요.");
      return;
    }

    // payload 구성
    const payload = {
      name,
      username,
      password,
      email,
      provider,
      providerUserId,
    };

    console.log("📤 회원가입 payload:", payload);

    // OAuth2 회원가입 요청
    oauth2SignupRequest(payload)
      .then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div css={s.container}>
      <h1>회원가입</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type="text"
            placeholder="이름"
            state={name}
            setState={setName}
          />
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
          <AuthInput
            type="password"
            placeholder="비밀번호 확인"
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <AuthInput
            type="email"
            placeholder="이메일"
            state={email}
            setState={setEmail}
            disabled={true}
          />
        </div>
        {errorMessage.password && (
          <div css={s.errorBox}>
            <ul>
              <li>{errorMessage.password}</li>
            </ul>
          </div>
        )}
        <div css={s.btnBox}>
          <button onClick={signupOnClickHandler}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Signup;
