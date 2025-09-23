import { css } from "@emotion/react";

export const container = css`
  flex: 1;
  width: 100%;
  max-width: 1700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 0;
  padding-left: 100px;
  background-color: #f9f9f9;
  font-size: 30px;
  height: 100%;
  text-align: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const inner = css`
  width: 100%;
  padding-left: 160px;
  padding-right: 40px;
  text-align: center;
  gap: 60px;
`;

export const title = css`
  /* align-self: center; */
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 50px;
  /* margin-left: 10px; */
  text-align: center;
`;

export const main = css`
  display: flex;
  gap: 100px;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 20px;
  height: calc(100vh - 87px);
  flex: 1;
  min-height: 0;
`;

export const menu = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 200px;

  button {
    width: 260px;
    height: 70px;
    font-size: 20px;
    padding: 15px 20px;
    border: none;
    background-color: #002147;
    color: beige;
    cursor: pointer;
    border-radius: 7px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background-color: #4682b4;
    }

    &.active {
      background-color: #5f9ea0;
    }
  }
`;

export const content = css`
  flex: 1; /* 남는 공간 전부 사용 */
  width: 100%; /* flex와 함께 사용하면 폭 자동 */
  min-height: 0;
  max-height: 450px;
  background-color: #222;
  padding: 70px 40px 20px 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: center;
  color: white;
  overflow-y: auto;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    max-width: 600px;
    padding-left: 100px;
    /* margin: 0 auto 20px; */
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    box-sizing: border-box;
    height: 70px;
    font-size: 50px;
    display: block;
    text-align: center;
    align-items: center;
  }

  button {
    width: 25%;
    height: 80px;
    font-size: 20px;
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
    background-color: #191970;
    color: white;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 20px;
    justify-content: center;

    &:hover {
      background-color: #0090c1;
    }
  }
`;
