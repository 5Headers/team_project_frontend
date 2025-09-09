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

  input {
    width: 100%;
    padding: 14px 16px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s ease;

    &:focus {
      border: 1px solid #0d6efd;
    }
  }
`;

export const signinBtnBox = css`
  display: flex;
  gap: 10px;

  & > button {
    flex: 1;
    padding: 12px 0;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    color: white;
    transition: all 0.2s ease;
  }

  .signup {
    background-color: #fff;
    border: 1px solid #ced4da;
    color: #333;
  }

  .signin {
    background-color: #0d6efd;
    border: none;
    color: white;
  }

  & > button:hover {
    opacity: 0.9;
  }
`;

export const oauthBtnBox = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* 아이콘-텍스트 간격 */
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;

    /* ✅ background → background-color 로 변경 */
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
      color: #000;
    }
  }
`;
