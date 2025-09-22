import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 */
  justify-content: center; /* 수직 중앙 */
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
  font-size: 25px;
`;

export const title = css`
  align-self: flex-start; /* 타이틀 왼쪽 정렬 */
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const main = css`
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 900px;
  align-items: flex-start; /* 메뉴+콘텐츠 상단 기준 정렬 */
  justify-content: center; /* 전체 중앙 배치 */
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 200px;

  button {
    padding: 10px 15px;
    border: none;
    background-color: #0077ff;
    color: beige;
    cursor: pointer;
    border-radius: 7px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background-color: #005ffc;
    }

    &.active {
      background-color: #005ffc;
    }
  }
`;

export const content = css`
  flex: 1;
  background-color: #222;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 콘텐츠 세로 중앙 */
  align-items: flex-start; /* 콘텐츠 왼쪽 정렬 */
  color: white;

  h2 {
    margin-bottom: 20px;
  }

  input {
    display: block;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
  }

  button {
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
    background-color: #0077ff;
    color: white;
    cursor: pointer;
  }
`;
