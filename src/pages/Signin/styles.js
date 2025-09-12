import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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
  gap: 20px;

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
      border: 1px solid #2a2b2cff;
    }
  }
`;

export const keepLoginBox = css`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;

  input {
    margin-right: 6px;
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
    font-weight: 300;
    cursor: pointer;
    color: white;
    transition: all 0.2s ease;
  }
  .signin {
    background-color: #333;
    border: none;
    color: white;
  }

  & > button:hover {
    opacity: 0.9;
  }
`;

export const LinkBox = css`
  margin-top: 3px;
  text-align: center;

  a {
    font-size: 14px;
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;
    padding: 10px;

    &:hover {
      color: #0a58ca; /* 조금 더 진한 파란색 */
      text-decoration: underline;
    }
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
    gap: 10px;
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
    transition: border-color 0.2s ease, background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
      color: #000;
    }
  }

  /* 소셜별 hover */
  & > a.google:hover {
    border-color: #4285f4; /* 구글 블루 */
  }
  & > a.naver:hover {
    border-color: #03c75a; /* 네이버 그린 */
  }
  & > a.kakao:hover {
    border-color: #fee500; /* 카카오 옐로우 */
  }
`;
