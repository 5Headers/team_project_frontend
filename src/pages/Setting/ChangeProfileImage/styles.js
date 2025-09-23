// styles.js
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  font-size: 36px;
  text-align: center;
`;

export const inner = css`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
  gap: 50px;
`;

export const title = css`
  width: 100%;
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: center;
  align-items: center;
`;

export const preview = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const input = css`
  width: 100%;
  height: 150px;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 32px;
  text-align: center;
`;

export const button = css`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #ff7f50;
  color: white;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  display: block;
  text-align: center;
  align-items: center;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff4500;
  }
`;
