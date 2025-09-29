import { css } from "@emotion/react";

export const container = css`
  max-width: 800px;
  margin:  auto; /* 상하 여백 40px, 좌우 자동 중앙 */
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #333;

  display: flex;
  flex-direction: column;
  align-items: center; /* 내부 내용도 중앙 정렬 */
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
  

  li {
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-weight: 500;

    &:last-of-type {
      border-bottom: none;
    }
  }

  /* 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

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
