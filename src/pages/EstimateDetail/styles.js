/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* ===== 컨테이너 ===== */
export const container = css`
  width: 100%;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const modalList = css`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
  width: 60%;

  li {
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between; /* 좌우 끝 정렬 */
    align-items: center;
    font-weight: 500;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export const leftSide = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const partIcon = css`
  font-size: 20px;
  color: #333;
`;

export const partName = css`
  font-weight: 500;
  color: #333;
`;

export const partPrice = css`
  font-weight: 600;
  color: #333;
`;

export const partLinkBtn = css`
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;

  &:hover {
    background-color: black;
  }
`;


/* ===== 뒤로가기 버튼 ===== */
export const modalCloseBtn = css`
  display: block;
  margin: 20px auto 0;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: black;
  }
`;
