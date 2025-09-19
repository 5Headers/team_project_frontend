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
  width: 500px;
  gap: 10px;
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
  margin: 10px;
  box-sizing: border-box;
`;

export const TitleBox = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
`;

export const TitleText = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ExportText = css`
  font-size: 14px;
  color: #ccc;
`;

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
