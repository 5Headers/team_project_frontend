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
      border-radius: 50%;
      object-fit: cover;
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
    margin-bottom: 5px;
  }

  & > p {
    margin-bottom: 10px;
  }

  & > button {
    border: none;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    background-color: #333;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-right: 10px;

    &:hover {
      background-color: black;
    }
  }
`;

/* ===== 견적 리스트 ===== */
export const estimateContainer = css`
  margin-top: 20px;
`;

export const estimateTitle = css`
  text-align: center;
  margin-bottom: 10px;
`;

export const estimateBox = css`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 15px;
`;

export const estimateList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const estimateItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const itemNumber = css`
  width: 30px;
  flex-shrink: 0;
`;

export const itemDetails = css`
  display: flex;
  justify-content: space-between; /* 좌측: 목적+가격, 우측: 생성날짜 */
  align-items: center;
  width: 100%;
`;

export const leftSide = css`
  display: flex;
  gap: 50px; /* 목적과 가격 간격 */
  font-weight: bold;
`;

export const createdAt = css`
  color: #666;
  font-weight: bold;
  margin-left: 20px;
`;


export const deleteBtn = css`
  background-color: transparent;
  color: #333;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

export const pagenateContainer = css`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 40px;

  a {
    text-decoration: none;
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }
`;

export const activePage = css`
  color: #0d6efd;
  font-weight: 600;
`;

