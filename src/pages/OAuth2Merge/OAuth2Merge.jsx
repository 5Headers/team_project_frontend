/** @jsxImportSource @emotion/react */
import * as s from "./styles"; 
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { oauth2MergeRequest } from '../../apis/auth/authApi';

function OAuth2Merge() {
  // 아이디, 비밀번호 입력 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // URL 쿼리 파라미터 가져오기 (provider, providerUserId)
  const [searchParam] = useSearchParams();

  // 페이지 이동을 위한 navigate
  const navigate = useNavigate();

  const mergeOnClickHandler = () => {
    // 입력값 검증: 아이디/비밀번호 비어있으면 경고
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      // 연동 API요청 보내기
      oauth2MergeRequest({
        username: username,
        password: password,
        provider: searchParam.get("provider"), // 소셜 로그인 제공자
        providerUserId: searchParam.get("providerUserId"), // 소셜 계정 사용자 ID
      }).then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin"); // 연동 성공 → 로그인 페이지로 이동
        } else if (response.data.status === "failed") {
          alert(response.data.message);
          return;
        }
      });
    }
  };

  return (
    <div css={s.container}>
      <h1>연동하기</h1>
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
        </div>
        <div css={s.btnBox}>
          <button onClick={mergeOnClickHandler}>연동하기</button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Merge