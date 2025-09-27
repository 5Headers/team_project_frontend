import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #1f2b38;
  font-size: 30px;
  color: #bfd7ea;

  overflow-x: hidden; /* ← 수평 스크롤 제거 */
  box-sizing: border-box;
`;

export const inner = css`
  width: 100%;
  padding: 0 20px; /* 좌우 패딩 */
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 90px;
  flex: 1;
  box-sizing: border-box;
`;

export const title = css`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;

  /* 메뉴 버튼 열 기준 x좌표 중앙 정렬 대신 padding/align 조정 */
  position: relative;
  left: 0;
  text-align: center;

  color: mintcream;
  text-shadow: 0 0 8px #3a8de6, 0 0 12px #1f5fbf;
`;

export const main = css`
  display: flex;
  gap: 30px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start; /* space-between → flex-start로 변경 */
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* 추가: 혹시 모를 넘침 방지 */
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 250px;

  button {
    width: 100%;
    height: 60px;
    font-size: 20px;
    padding: 15px 20px;
    border: none;
    background-color: transparent;
    color: #bfd7ea;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.3s ease;
    text-align: center;

    &:hover,
    &.active {
      background-color: #121920ff;
      color: mintcream;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6,
        0 0 12px #1f5fbf;
    }
  }
`;

export const content = css`
  flex: 1;
  max-width: calc(100% - 250px - 30px); /* 메뉴 + gap 고려 */
  min-height: 0;
  background-color: #1f2b38;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  /* overflow-y: auto; */
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden; /* ← 중요 */

  /* 오른쪽 구분선 제거 or 조정 */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -30px; /*오른쪽 완전히 숨겨지도록 설정함 */
    width: 2px;
    height: 100%;
    background-color: #3a8de6;
    box-shadow: 0 0 6px #3a8de6, 0 0 12px #1f5fbf;
  }

  h2 {
    margin-bottom: 20px;
    color: mintcream;
    text-shadow: 0 0 4px #3a8de6;
  }

  input {
    max-width: 500px;
    width: 100%;
    padding: 8px 12px;
    margin: 0 auto 20px;
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
    height: 70px;
    font-size: 25px;
    display: block;
    text-align: center;
    background-color: #174270ff;
    color: mintcream;
  }

  button {
    width: 25%;
    max-width: 200px;
    height: 80px;
    font-size: 20px;
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
    background-color: #145fafff;
    color: white;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    margin-top: 30px;

    :hover {
      background-color: #1e79daff;
      box-shadow: 0 0 10px #4e9df1ff, 0 0 20px #4e9df1ff;
      transform: translateY(-2px);
    }
  }
`;

export const verticalDivider = css`
  width: 2px;
  height: 700px;
  background-color: #3a8de6;
  box-shadow: 0 0 6px #3a8de6, 0 0 12px #1f5fbf, 0 0 20px #1f5fbf;
  border-radius: 1px;
`;
