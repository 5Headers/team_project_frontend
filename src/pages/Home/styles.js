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
  position: relative;
`;

export const logo = css`
  pointer-events: none;
  user-select: none;
  color: white;
  font-size: 4vh;
  margin: 0 0 20px 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px white, 0 0 12px #1f5fbf;
  font-weight: 400;
`;

export const chatBoxWrapper = css`
  width: 100%;
  max-width: 900px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  position: relative;
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

/* 클릭 가능한 하트 아이콘 (하단) */
export const heartIconBottom = css`
  position: absolute;
  right: 0;
  bottom: -40px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s ease;
  pointer-events: auto; /* 클릭 가능 */
`;

export const modalBackdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
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
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.8);
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

export const splitInputWrapper = css`
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 800px;
  height: 50px;
  padding: 0 15px;
  border-radius: 9999px;
  background-color: #1f2b38;
  border: 1px solid #3a8de6ff;
  box-sizing: border-box;
  gap: 8px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 12px 2px #3a8de6ff;
    transform: scale(1.02);
  }

  svg {
    font-size: 24px;
    color: #3a8de6ff;
    cursor: pointer;
  }
`;

export const splitInput = css`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: #1f2b38; /* select/input 배경 통일 */
  color: white;
  font-size: 16px;
  padding: 0 10px;
  border-radius: 9999px;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const budgetWrapper = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const budgetInput = css`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 16px;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const budgetUnitSelect = css`
  border: 1px solid #3a8de6ff;
  border-radius: 6px;
  background-color: #1f2b38;
  color: white;
  padding: 2px 6px;
  font-size: 14px;
`;

const heartFloatNatural = keyframes`
  0% {
    transform: translateY(0) translateX(var(--dx, 0)) scale(0.5) rotate(0deg);
    opacity: 0;
  }
  10% {
    transform: translateY(-5px) translateX(var(--dx, 0)) scale(1.4) rotate(-15deg);
    opacity: 1;
  }
  20% {
    transform: translateY(-10px) translateX(var(--dx, 0)) scale(1) rotate(10deg);
  }
  100% {
    transform: translateY(-120px) translateX(var(--dx, 0)) scale(1.2) rotate(0deg);
    opacity: 0;
  }
`;

/* 올라가는 하트 (장식용) */
export const flyingHeart = css`
  position: fixed; /* 화면 전체 기준 */
  left: var(--x, 0);
  top: var(--y, 0);
  font-size: var(--size, 16px);
  color: #ff4d6d;
  pointer-events: none;
  animation: ${heartFloatNatural} 1.6s ease-in-out forwards;
  will-change: transform, opacity;
`;

// 목적 선택 select 스타일
export const purposeSelectWrapper = css`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

export const purposeSelect = css`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #3a8de6ff; /* 테두리 색상 */
  background-color: #1f2b38;
  color: white;
  font-size: 14px;
  cursor: pointer;
  appearance: none; /* 기본 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  z-index: 10;

  &:focus {
    border: 1px solid #5c9eff;
    box-shadow: 0 0 10px rgba(58, 141, 230, 0.5);
    outline: none;
  }
`;

export const dropdownArrow = css`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #bfd7ea;
  font-size: 14px;
`;

export const purposeOptionsMenu = css`
  position: absolute;
  top: 45px; /* select 높이 + 간격 */
  left: 0;
  width: 100%;
  background-color: #1f2b38;
  border: 1px solid #3a8de6ff;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;

  li {
    list-style: none;
    padding: 10px 12px;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #121920ff;
      color: #b0e0ff;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6,
        0 0 12px #1f5fbf;
    }
  }
`;

export const customPurposeWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const clearX = css`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: #bfd7ea;
  transition: color 0.2s ease;

  &:hover {
    color: #ff4d6d;
  }
`;

export const heartWrapper = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 160px; /* 하트 애니메이션 높이 고려 */
  pointer-events: none;
  overflow: visible; /* 반드시 visible로 */
`;

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
    opacity: 0.6;
  }
  40% { 
    transform: translateY(-6px);
    opacity: 1;
  }
`;

// GPT 입력 중 점 스타일
export const jumpingDots = css`
  display: inline-flex;
  margin-left: 6px;

  span {
    display: inline-block;
    font-size: 1.2em;
    animation: ${bounce} 1.4s infinite;
  }

  span:nth-of-type(1) {
    animation-delay: 0s;
  }
  span:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  span:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

export const dontShowWrapper = css`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #3a8de6ff;
  }

  span {
    font-size: 14px;
    color: white;
    user-select: none;
  }
`;
