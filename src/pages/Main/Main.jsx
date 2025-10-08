/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

export default function Landing() {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    // 버튼 누르면 fadeOut 활성화
    setFadeOut(true);

    // fadeOut transition 끝난 후 페이지 이동
    setTimeout(() => navigate("/search"), 600); // 0.6s = styles.js transition과 동일
  };

  return (
    <div css={s.container}>
      <div css={s.background}></div>
      <div css={s.content(fadeIn, fadeOut)}>
        <h1 css={s.logo}>✨ NuroPC ✨</h1>
        <p css={s.subtitle}>나만의 맞춤 PC 추천 서비스</p>
        {isLoggedIn && (
          <button css={s.startButton} onClick={handleStartClick}>
            시작하기
          </button>
        )}
      </div>
    </div>
  );
}