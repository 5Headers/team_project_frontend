import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  font-size: 40px;
`;

export const inner = css`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
`;

export const title = css`
  align-self: flex-start;
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-left: 10px;
  text-align: center;
`;

export const input = css`
  width: 100%;
  height: 150px;
  padding: 0px 20px;
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
  background-color: #ff7f50;
  color: white;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  display: block; /* 블록으로 가로 전체 사용 */
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff4500;
  }
`;
