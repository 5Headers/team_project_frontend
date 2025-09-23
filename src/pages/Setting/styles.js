import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  max-width: 1700px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 40px;
  background-color: #f9f9f9;
  font-size: 30px;
  height: 100vh;
`;

export const inner = css`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
  gap: 50px;
`;

export const title = css`
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: center;
`;

export const main = css`
  display: flex;
  gap: 100px;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  height: calc(100vh - 87px);
  flex: 1;
  min-height: 0;
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 200px;

  button {
    width: 260px;
    height: 70px;
    font-size: 20px;
    padding: 15px 20px;
    border: none;
    background-color: #ffb6c1;
    color: beige;
    cursor: pointer;
    border-radius: 7px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background-color: #ff1493;
    }

    &.active {
      background-color: #ffc0cb;
    }
  }
`;

export const content = css`
  flex: 1;
  width: 100%;
  min-height: 0;
  max-height: 450px;
  background-color: #222;
  padding: 30px 40px 30px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
  overflow-y: auto;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 80%;
    padding: 8px 12px;
    margin: 0 auto 20px;
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
    height: 70px;
    font-size: 50px;
    display: block;
    text-align: center;
  }

  button {
    width: 25%;
    height: 80px;
    font-size: 30px;
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
    background-color: #ff7f50;
    color: white;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
`;
