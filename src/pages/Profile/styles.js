import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 200px;
  box-sizing: border-box;
`;

export const profileContainer = css`
  width: 100%;
  min-height: 700px;
  display: flex;
  flex-direction: column;
`;

export const profileHeader = css`
  width: 100%;
  height: 200px;
  display: flex;
`;

export const profileImgBox = css`
  width: 250px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #dbdbdb;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* 이미지 비율 유지하며 꽉 채우기 */
    }
  }
`;

export const profileInfoBox = css`
  width: calc(100% - 250px);
  height: 100%;
  padding: 30px 40px;
  box-sizing: border-box;
  color: #333;

  & > h3 {
    font-size: 24px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 15px;

    & > p {
      margin: 0;
    }

    & > button {
      border: none;
      padding: 3px 5px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 4px;
      background-color: #0d6efd;
      color: white;
      cursor: pointer;
    }
  }
`;

export const profileBox = css`
  width: 100%;
  height: 500px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

export const profileTab = (tabChild) => css`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;

  & > ul {
    display: flex;

    & > li {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      padding: 0 14px;
      border-right: 1px solid #dbdbdb;
      box-sizing: border-box;
      color: #333;
      cursor: pointer;

      &:nth-of-type(${tabChild}) {
        border-bottom: 1px solid white;
      }

      &:hover {
        background-color: #f2f2f2;
        font-weight: 600;
      }
    }
  }
`;

export const profileMain = css`
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
