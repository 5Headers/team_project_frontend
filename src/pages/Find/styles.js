import { css } from "styled-components";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 20px;
  box-sizing: border-box;
`;

/* 탭 박스 - 컨텐트 박스와 폭 동일하게 중앙 정렬 */
export const tabBox = css`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  margin: 0; /* 위쪽 마진 없고 아래쪽 조금 */
  border-bottom: 1px solid #ccc;
`;

/* 탭 버튼 */
export const tabButton = css`
  flex: 1;
  padding: 12px 0;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ccc;
  border-bottom: none;
  background: #f9f9f9;

  &:hover {
    background: #eee;
  }
`;

/* 활성화된 탭 */
export const activeTab = css`
  background: #333;
  color: white;
  font-weight: bold;
  border: 1px solid #ccc;
  border-bottom: none;
  z-index: 1;
  &:hover {
    background: black;
  }
`;

/* 컨텐츠 박스 */
export const contentBox = css`
  width: 100%;
  max-width: 600px;
  min-height: 500px;
  margin: 0 auto;
  padding: 30px 20px;
  border: 1px solid #ccc;
  border-top: none; /* 탭과 딱 붙도록 */
  background: #fff;
  box-sizing: border-box;
  text-align: left;

  display: flex;
  flex-direction: column;
  gap: 20px; /* 요소 간 간격 */
`;

/* 인풋 박스 */
export const inputBox = css`
  display: flex;
  flex-direction: column;
  gap: 20px; /* input 사이 간격 */
  height: 400px;

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

/* 제출 버튼 */
export const submitButton = css`
  margin-top: auto;
  padding: 14px 0;
  width: 100%;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: black;
  }
`;
