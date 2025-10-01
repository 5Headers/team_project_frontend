/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

// 컨테이너
export const container = css`
  padding: 30px;
  max-width: 950px;
  margin: auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
`;

// 로고
export const logo = css`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

// 스크롤 영역
export const scrollWrapper = css`
  max-height: 78vh;
  overflow-y: auto;
  padding: 20px 20px 30px 40px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

// 애니메이션
const fadeSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(15px) scale(0.97);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
`;

const hoverLift = keyframes`
  0% { transform: translateY(0) scale(1); filter: brightness(1); }
  50% { transform: translateY(-5px) scale(1.03); filter: brightness(1.08); }
  100% { transform: translateY(0) scale(1); filter: brightness(1); }
`;

// 온라인 아이템
export const onlineItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b3a4d;
  padding: 16px 20px;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  margin-bottom: 14px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.2s ease;

  &:hover {
    animation: ${hoverLift} 0.5s ease 1; /* 자연스럽게 한 번만 튀기도록 */
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45);
    background-color: #394b63;
  }

  a {
    z-index: 2;
    pointer-events: auto;
  }
`;

// 부품 정보
export const partInfo = css`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

// 아이콘
export const partIcon = css`
  font-size: 20px;
  color: #ffd166;
  transition: transform 0.25s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.25);
    color: #ffea85;
  }
`;

// 부품 이름
export const partName = css`
  font-weight: 600;
  font-size: 16px;
  color: #e0e0ff;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

// 부품 가격
export const partPrice = css`
  font-weight: 500;
  font-size: 14px;
  color: #a0c4ff;
  transition: color 0.2s ease;

  &:hover {
    color: #d0e0ff;
  }
`;

// 링크 버튼
export const partLink = css`
  text-decoration: none;
  background-color: #3a8de6ff;
  color: white;
  font-weight: 500;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 10px;
  transition: background 0.25s ease, transform 0.2s ease;

  &:hover {
    background-color: #5c9eff;
    transform: scale(1.05);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
  }
`;
// 총 예산
export const totalPrice = css`
  margin-top: 20px;
  padding: 16px 22px;
  font-size: 18px;
  font-weight: 700;
  background-color: #3a5a80; /* 카드보다 밝게, 눈에 잘 띄도록 */
  border-radius: 14px;
  text-align: center;
  color: #f8f7f4ff; /* 강조 색 유지 */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35); /* 카드 그림자와 동일 */
`;
