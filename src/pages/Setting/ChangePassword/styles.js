// styles.js (ChangePassword 전용 또는 content 안에서 쓰이는 스타일)
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 30px;
  padding-right: 30px;
  /* padding-down: 20px; */
  align-items: center;
  gap: 5px;
`;

export const inner = css`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
`;

export const input = css`
  width: 100%;
  height: 150px;
  padding: 20px 100px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 36px;
`;

export const button = css`
  width: 100%; /* 부모 폭 전체 사용 */
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #191970;
  color: white;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  display: block; /* 블록으로 가로 전체 사용 */
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0090c1;
  }
`;
