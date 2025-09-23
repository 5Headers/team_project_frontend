/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/AuthInput/AuthInput";
import {
  signupRequest,
  checkUsernameRequest,
  checkEmailRequest,
} from "../../apis/auth/authApi"; // 회원가입 + 중복확인 요청

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  // 중복 확인 여부 체크
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const navigate = useNavigate();

  // 아이디 중복 확인
  const checkUsernameHandler = async () => {
    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await checkUsernameRequest(username);
      if (response.data.status === "success") {
        alert("사용 가능한 아이디입니다.");
        setUsernameChecked(true);
      } else {
        alert(response.data.message); // 이미 사용중
        setUsernameChecked(false);
      }
    } catch (error) {
      console.error(error);
      alert("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 이메일 중복 확인
  const checkEmailHandler = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await checkEmailRequest(email);
      if (response.data.status === "success") {
        alert("사용 가능한 이메일입니다.");
        setEmailChecked(true);
      } else {
        alert(response.data.message);
        setEmailChecked(false);
      }
    } catch (error) {
      console.error(error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입
  const signupOnClickHandler = async () => {
    // 1. 모든 항목 입력 여부 확인
    if (!name || !username || !password || !confirmPassword || !email) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 유효성 검사
    if (errorMessage.name ||  errorMessage.username || errorMessage.password || errorMessage.email) {
      alert("입력값을 다시 확인해주세요.");
      return;
    }

    // 중복 확인 여부
    if (!usernameChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (!emailChecked) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    // 약관 동의 확인
    const agree = document.querySelector('input[type="checkbox"]').checked;
    if (!agree) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    // 2. 회원가입 API 요청
    try {
      const response = await signupRequest({ name, username, password, email });
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate("/auth/signin"); // 로그인 페이지 이동
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류:", error);
      alert("회원가입 중 문제가 발생했습니다.");
    }
  };

  // 유효성 검사
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
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type="name"
            placeholder="이름"
            state={name}
            setState={setName}
          />
          <div css={s.idWrapper}>
            <AuthInput
              type="text"
              placeholder="아이디(6자 이상)"
              state={username}
              setState={setUsername}
            />
            <button onClick={checkUsernameHandler}>중복 확인</button>
          </div>

          <AuthInput
            type="password"
            placeholder="비밀번호(문자, 숫자, 특수문자 포함 8~16자)"
            state={password}
            setState={setPassword}
          />
          <AuthInput
            type="password"
            placeholder="비밀번호 확인"
            state={confirmPassword}
            setState={setConfirmPassword}
          />

          <div css={s.idWrapper}>
            <AuthInput
              type="email"
              placeholder="이메일"
              state={email}
              setState={setEmail}
            />
            <button onClick={checkEmailHandler}>중복 확인</button>
          </div>
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
