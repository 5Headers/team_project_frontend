/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AuthInput from "../../components/AuthInput/AuthInput";
import * as s from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oauth2SignupRequest } from "../../apis/auth/authApis";

function OAuth2Signup() {
  // 입력 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  // URL 쿼리 파라미터(provider, providerUserId, email 등)
  const [searchParam] = useSearchParams();

  // 페이지 이동을 위한 hook
  const navigate = useNavigate();

  // 회원가입 버튼 클릭 시 실행되는 함수
  const signupOnClickHandler = () => {
    // 필수 입력값 검증
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0 ||
      email.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // OAuth2 회원가입 API 요청
    oauth2SignupRequest({
      username: username,
      password: password,
      email: email,
      provider: searchParam.get("provider"), // 소셜 로그인 제공자
      providerUserId: searchParam.get("providerUserId"), // 소셜 계정 사용자 ID
    })
      .then((response) => {
        if (response.data.status === "success") {
          // 가입 성공 → 로그인 페이지로 이동
          alert(response.data.message);
          navigate("/auth/signin");
        } else if (response.data.status === "failed") {
          // 가입 실패 → 메시지 출력
          alert(response.data.message);
          return;
        }
      })
      .catch((error) => {
        // 요청 실패 시
        alert("문제가 발생했습니다. 다시 시도해주세요.");
        return;
      });
  };

  // 비밀번호 입력 시 유효성 검사
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

    setErrorMessage(newErrorMessage); // 유효성 검사 결과 저장
  }, [password]);

  // URL 쿼리에서 이메일 값을 가져와 상태에 저장
  useEffect(() => {
    setEmail(searchParam.get("email"));
  }, [searchParam]);

  return (
    <div css={s.container}>
      <h1>회원가입</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type={"text"}
            placeholder={"아이디"}
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호"}
            state={password}
            setState={setPassword}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호 확인"}
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <AuthInput
            type={"email"}
            placeholder={"이메일"}
            state={email}
            setState={setEmail}
            disabled={true}
          />
        </div>
        <div css={s.errorBox}>
          {Object.keys(errorMessage).length !== 0 ? (
            <ul>
              <li>{errorMessage.password}</li>
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div css={s.btnBox}>
          <button onClick={signupOnClickHandler}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Signup;
