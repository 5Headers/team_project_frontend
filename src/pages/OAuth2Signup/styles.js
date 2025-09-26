import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const box = css`
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const btnBox = css`
  align-items: center;
  gap: 10px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #0d6efd;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: #105bcc;
    }
  }
`;

export const errorBox = css`
  padding-left: 20px;
  & > ul {
    list-style: disc;
    & > li {
      color: #dc3545;
      font-size: 13px;
    }
  }
`;