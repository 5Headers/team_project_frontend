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
  align-items: center; /* p랑 아이콘들 모두 가운데 정렬 */
  gap: 10px;

  .title {
    font-size: 12px;
    text-align: center;
    color: #666;
  }
  .icons {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 45px;
  }

  & > .icons > a {
    width: 50px;
    height: 50px;
    border-radius: 50%; /* 원형 */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8f9fa;
    }
  }

  /* 소셜별 hover */
  & > .icons > a.google:hover {
    border-color: #4285f4;
  }
  & > .icons > a.naver:hover {
    border-color: #03c75a;
  }
  & > .icons > a.kakao:hover {
    border-color: #fee500;
  }
`;
