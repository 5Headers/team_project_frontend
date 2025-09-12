/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState(""); // 이름 상태
  const [username, setUsername] = useState(""); //아이디
  const [password, setPassword] = useState(""); //비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [email, setEmail] = useState(""); //이메일
  const [errorMessage, setErrorMessage] = useState({}); // 유효성 검사 에러 메시지 저장
  const navigate = useNavigate(); // 페이지 이동 함수

  const signupOnClickHandler = () => {
    // 1. 모든 항목 입력 여부 확인
    if (
      name.trim().length === 0 ||
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

    // 3. 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 4. 약관 동의 확인 (체크박스)
    const agree = document.querySelector('input[type="checkbox"]').checked;
    if (!agree) {
      alert("약관에 동의해야 합니다.");
      return;
    }

    alert("가입이 완료되었습니다.");

    navigate("/Signin");
  };

  //  아이디 / 비밀번호 / 이메일 유효성 검사
  useEffect(() => {
    const newErrorMessage = {};

    // 아이디 정규식 (6자리 이상, 문자+숫자+특수문자 포함)
    if (username.length > 0) {
      const usernameRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,}$/;
      if (!usernameRegex.test(username)) {
        newErrorMessage.username =
          "아이디는 최소 6자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.";
      }
    }

    // 비밀번호 정규식 검사 (8~16자, 영문자 + 숫자 + 특수문자 포함)
    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password =
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
      }
    }

    // 이메일 정규식 검사 (올바른 이메일 형식인지 확인)
    if (email.length > 0) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      if (!emailRegex.test(email)) {
        newErrorMessage.email = "이메일 형식에 맞게 입력해주세요.";
      }
    }

    // 새로운 에러 메시지 상태 업데이트
    setErrorMessage(newErrorMessage);
  }, [username, password, email]);

  return (
    <div css={s.container}>
      <h2>회원가입</h2>
      <div css={s.box}>
        <div css={s.inputBox}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div css={s.idWrapper}>
            <input
              type="text"
              placeholder="아이디(6자 이상)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button>중복 확인</button>
          </div>
          <input
            type="password"
            placeholder="비밀번호(문자 숫자 특수문자 포함 8자이상)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
