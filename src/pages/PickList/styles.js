/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/* ===== PickList 컨테이너 ===== */
export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 200px;
  box-sizing: border-box;
`;

/* ===== 제목 ===== */
export const estimateTitle = css`
  text-align: center;
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: 600;
`;

/* ===== 견적 리스트 박스 ===== */
export const estimateBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 12px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 400px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.3) rgba(255,255,255,0.8);
`;

/* 크롬/사파리/엣지 스크롤 */
export const estimateBoxScrollbar = css`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.3);
    border-radius: 6px;
  }
`;

/* ===== 각 견적 카드 ===== */
export const estimateList = css`
  border: 1px solid #333;
  border-radius: 6px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f2f2f2;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    cursor: pointer;
  }
`;

export const itemNumber = css`
  width: 30px;
  flex-shrink: 0;
`;

export const itemDetails = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 10px;
`;

export const leftSide = css`
  display: flex;
  gap: 50px;
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

/* ===== 페이지네이션 ===== */
export const pagenateContainer = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    text-decoration: none;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    background: none;
    border: 1px solid #333;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: #333;
      color: #fff;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const activePage = css`
  background-color: #0d6efd;
  color: #fff;
  font-weight: 600;
`;

