import { css } from "@emotion/react";

export const container = css`
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListBox = css`
  display: flex;
  width: 500px; /* 필요에 따라 조정 */
  gap: 10px; /* ImgBox와 TitleBox 사이 간격 */
  cursor: pointer;
  border: 2px solid #1f2b38;
  margin-bottom: 10px;

  :hover {
    border: 2px solid #3a8de6ff;
    box-shadow: 0 0 12px 4px #3a8de6ff;
  }
`;

export const ImgBox = css`
  width: 100px;
  height: 100px;
  background-color: #ff6666;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px; /* ul과의 간격 */
  box-sizing: border-box;
`;

export const TitleBox = css`
  flex: 1; /* 남은 공간 차지 */
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: flex-start; /* 위에서 아래로 배치 */
  padding: 10px;
`;

export const TitleText = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px; /* 제목과 내용 사이 간격 */
`;

export const ExportText = css`
  font-size: 14px;
  color: #ccc;
`;

/* 페이지네이션 스타일 */
export const pagination = css`
  display: flex;
  gap: 5px;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    border: 1px solid #1f2b38;
    background-color: #1f2b38;
    color: white;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #3a8de6ff;
      border-color: #3a8de6ff;
    }
  }
`;

export const activePage = css`
  background-color: #3a8de6ff !important;
  border-color: #3a8de6ff !important;
`;
