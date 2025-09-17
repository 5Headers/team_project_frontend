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
  margin-top: 120px;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  gap: 35px;

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
    background-color: black;
  }
`;

export const LinkBox = css`
  margin-top: 3px;
  text-align: center;

  a {
    font-size: 14px;
    color: black;
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
    gap: 75px;
  }

  & > .icons > a {
    width: 48px;
    height: 48px;
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
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 그림자 추가 */
    }
  }

  /* 소셜별 hover */
  & > .icons > a.google:hover {
    border-color: #4285f4;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.8);
  }
  & > .icons > a.naver:hover {
    border-color: #03c75a;
    box-shadow: 0 4px 12px rgba(3, 199, 90, 0.8);
  }
  & > .icons > a.kakao:hover {
    border-color: #fee500;
    box-shadow: 0 4px 12px rgba(254, 229, 0, 0.8);
  }
`;
