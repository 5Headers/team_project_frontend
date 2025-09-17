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
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;

    &:focus {
      border-color: #333;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
    }
  }
`;

export const idWrapper = css`
  position: relative;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding-right: 10px; /* 버튼 공간 확보 */
    box-sizing: border-box;
  }

  button {
    gap: 20px;
    position: absolute;
    right: 5px;
    margin: auto 0;
    top: 50%;
    transform: translateY(-50%);
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    background-color: #333;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      background-color: black;
      opacity: 0.9;
    }
  }
`;

export const agreeBox = css`
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  margin-top: 10px;

  input[type="checkbox"] {
    margin-right: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }
`;

export const joinBox = css`
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #333;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background-color: black;
      opacity: 0.9;
    }
  }
`;
