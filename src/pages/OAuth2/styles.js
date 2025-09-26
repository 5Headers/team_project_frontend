import { css } from "@emotion/react";

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200px;
  gap: 50px;
`;

export const card = css`
  width: 400px;
  height: 250px;
  border: 1px solid #dbdbdb;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2 ease;

  & > h3 {
    margin: 0;
    font-size: 32px;
    color: #333;
  }

  & > p {
    margin: 0;
    word-break: keep-all;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;
