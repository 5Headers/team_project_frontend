/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/AuthInput/AuthInput";
import { signupRequest } from "../../apis/auth/authApi"; // ✅ signupRequest import

function Signup() {
  // const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const signupOnClickHandler = () => {
    // 1. 모든 항목 입력 여부 확인
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0 ||
      email.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 비밀번호와 확인 비밀번호 일치 여부 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2. 비밀번호, 이메일 유효성 검사 결과 확인
    if (errorMessage.password) {
      alert(errorMessage.password);
      return;
    }
    if (errorMessage.email) {
      alert(errorMessage.email);
      return;
    }

    // 3. 약관 동의 확인
    const agree = document.querySelector('input[type="checkbox"]').checked;
    if (!agree) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    // 4. 회원가입 API 요청
    signupRequest({
      username,
      password,
      email,
    })
      .then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/signin"); // 로그인 페이지 이동
        } else if (response.data.status === "failed") {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("회원가입 요청 중 오류:", error);
        alert("문제가 발생했습니다. 다시 시도해주세요.");
      });

    console.log("아이디:", username);
    console.log("비밀번호:", password);
    console.log("비밀번호 확인:", confirmPassword);
    console.log("이메일:", email);
  };

  //  아이디 / 비밀번호 / 이메일 유효성 검사
  useEffect(() => {
    const newErrorMessage = {};

    if (username.length > 0) {
      const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
      if (!usernameRegex.test(username)) {
        newErrorMessage.username =
          "아이디는 최소 6자 이상이며, 영문자와 숫자를 포함해야 합니다.";
      }
    }

    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password =
          "비밀번호는 8~16자, 영문자, 숫자, 특수문자를 포함해야 합니다.";
      }
    }

    if (email.length > 0) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        newErrorMessage.email = "이메일 형식에 맞게 입력해주세요.";
      }
    }

    setErrorMessage(newErrorMessage);
  }, [username, password, email]);

  return (
    <div css={s.container}>
      <h2>회원가입</h2>
      <div css={s.box}>
        <div css={s.inputBox}>
          {/* <AuthInput
            type="text"
            placeholder="이름"
            state={name}
            setState={setName}
          /> */}
          <div css={s.idWrapper}>
            <AuthInput
              type="text"
              placeholder="아이디(6자 이상)"
              state={username}
              setState={setUsername}
            />
            <button>중복 확인</button>
          </div>
          <AuthInput
            type="password"
            placeholder="비밀번호(문자 숫자 특수문자 포함 8자이상)"
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
          />
        </div>

        <div css={s.agreeBox}>
          <label>
            <input type="checkbox" /> 서비스 이용 약관 및 개인정보 처리방침에
            동의합니다.
          </label>
        </div>
        <div css={s.joinBox}>
          <button onClick={signupOnClickHandler}>가입완료</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
