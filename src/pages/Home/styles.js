import { css, keyframes } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  overflow: hidden;
  position: relative;
`;

export const logo = css`
  pointer-events: none;
  user-select: none;
  color: white;
  font-size: 4vh;
  margin: 0 0 20px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6), 0 0 6px white, 0 0 12px #1f5fbf;
  font-weight: 400;
`;

export const search = (inputMoved) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  transition: transform 0.5s ease, top 0.5s ease;
  position: ${inputMoved ? "fixed" : "relative"};
  top: ${inputMoved ? "120px" : "auto"};
  z-index: 900;

  input {
    width: 90%;
    max-width: 800px;
    height: 6vh;
    padding: 10px 50px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 9999px;
    outline: none;
    box-sizing: border-box;
    transition: border 0.5s ease, box-shadow 0.3s ease;

    &:focus {
      border: 2px solid #3a8de6ff;
      box-shadow: 0 0 12px 4px #3a8de6ff;
    }
  }
`;

export const chatBoxWrapper = css`
  width: 100%;
  max-width: 900px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  position: relative; /* 하트 기준 */
`;

export const chatBox = css`
  width: 100%;
  border: 1px solid #1f2b38;
  border-radius: 8px;
  padding: 10px;
  background-color: #1f2b38;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 60vh;
  overflow-y: auto;
  position: relative;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const userMessage = css`
  position: relative;
  background-color: #3a8de6ff;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  margin: 6px 0;
  max-width: 85%;
  align-self: flex-end;
  word-break: break-word;
  box-sizing: border-box;
  white-space: pre-wrap;
`;

export const gptMessage = css`
  background-color: #2b3a4d;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  margin: 6px 0;
  max-width: 85%;
  align-self: flex-start;
  word-break: break-word;
  box-sizing: border-box;
  white-space: pre-wrap;
`;

/* 기존 하트 아이콘 스타일 (버튼 위치) */
export const heartIconBottom = css`
  position: absolute;
  right: 0;
  bottom: -40px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s ease;
`;

/* ---------------- 모달 관련 CSS ---------------- */

export const modalBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
`;

export const modalContent = css`
  width: 90%;
  max-width: 400px;
  background-color: #1f2b38;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 0 12px rgba(0,0,0,0.8);
  color: white;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #3a8de6ff;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border: 2px solid #3a8de6ff;
      box-shadow: 0 0 12px 2px #3a8de6ff;
    }
  }
`;

export const modalButtons = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 6px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;

    &:first-of-type {
      background-color: #3a8de6ff;
      color: white;
    }
    &:last-of-type {
      background-color: #ccc;
      color: #333;
    }
  }
`;

/* ------------------ 작은 하트 flying 애니메이션 ------------------ */

/*
  --dx: 수평 이동(px), 음수는 왼쪽, 양수는 오른쪽
  --size: 하트 폰트 크기
*/
const heartFloat = keyframes`
  0% {
    transform: translateY(0) scale(0.5) rotate(0deg);
    opacity: 0;
  }
  10% {
    transform: translateY(-5px) scale(1.4) rotate(-15deg);
    opacity: 1;
  }
  20% {
    transform: translateY(-10px) scale(1) rotate(10deg);
  }
  100% {
    transform: translateY(-120px) scale(1.2) rotate(0deg);
    opacity: 0;
  }
`;

export const flyingHeart = css`
  position: absolute;
  right: 0;
  bottom: -40px; /* FaHeart 바로 위 */
  font-size: var(--size, 16px);
  color: #ff4d6d;
  pointer-events: none;
  animation: ${heartFloat} 1.6s ease-in-out forwards;
  will-change: transform, opacity;
`;
