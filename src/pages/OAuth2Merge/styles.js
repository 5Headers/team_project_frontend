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
  display: flex;
  justify-content: center;
  align-items: center;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* 아이콘-텍스트 간격 */
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background-color: #0d6efd;
    font-size: 14px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: #105bcc;
    }
  }
`;