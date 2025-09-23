import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  font-size: 3px;
  text-align: center;
`;

export const inner = css`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
  gap: 50px;
`;

export const warning = css`
  text-align: center;
  font-size: 30px;
`;

export const title = css`
  width: 100%;
  /* align-self: flex-start; */
  height: 150px;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 60px;
  /* margin-left: 10px; */
  text-align: center;
  align-items: center;
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
  align-items: center;
  text-align: center;

  &:hover {
    background-color: #ff4500;
  }
`;
