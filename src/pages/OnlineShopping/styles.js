/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

// 컨테이너
export const container = css`
  padding: 20px;
  max-width: 900px;
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
  animation: 0.8s ease-out fadeIn;
`;

// 스크롤 영역
export const scrollWrapper = css`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

// 타이틀 & 서브타이틀
export const title = css`
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
`;

export const subtitle = css`
  font-size: 1.4rem;
  margin-bottom: 12px;
  font-weight: 600;
  color: #a0c4ff;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

// 애니메이션
const fadeSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
`;

const hoverPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// 온라인 아이템
export const onlineItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2b3a4d;
  padding: 15px 20px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
  margin-bottom: 12px;
  cursor: pointer;
- animation: ${fadeSlideUp} 0.5s ease forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
    background-color: #394b63;
-   animation: ${hoverPulse} 0.6s ease infinite;
  }

  a {
    z-index: 2;
    pointer-events: auto;
  }
`;

// 부품 이미지
export const partGIF = css`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 12px;
  object-fit: contain;
  animation: ${fadeSlideUp} 0.5s ease forwards;
`;

// 부품 정보
export const partInfo = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 아이콘
export const partIcon = css`
  font-size: 18px;
  color: #ffd166;
  transition: transform 0.3s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.2);
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
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #5c9eff;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  }
`;
