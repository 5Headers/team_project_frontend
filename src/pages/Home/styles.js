import { css } from "@emotion/react";

export const container = css`
  width: 100%; /* 100vw 대신 100% */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px; /* padding 포함해도 스크롤 없음 */
  box-sizing: border-box;
  gap: 30px;
  overflow: hidden; /* 스크롤 완전히 제거 */
`;

export const logo = css`
  pointer-events: none;
  user-select: none;
  color: white;
  font-size: 4vh;
  margin: 0 0 20px 0; /* input과 약간 간격 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const chatBox = css`
  width: 400px;
  height: 300px;
  margin-top: 20px; /* 화면 중앙보다 살짝 위쪽 */
  border: 1px solid #1f2b38;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  background-color: #1f2b38;
`;

export const search = (inputMoved) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${inputMoved ? "50px" : "0"}; /* 엔터 후 input 살짝 아래로 이동 */
  transition: margin-top 0.5s ease;

  input {
    width: 80vh;
    height: 6vh;
    padding: 10px 50px;
    font-size: 18px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    outline: none;
    border-radius: 9999px;
    transition: border 0.5s ease, box-shadow 0.3s ease;

    &:focus {
      border: 2px solid #3a8de6ff;
      box-shadow: 0 0 12px 4px #3a8de6ff;
    }
  }
`;

export const chatBoxWrapper = css`
  width: 400px;
  height: ${(props) => (props.showChatBox ? "300px" : "0")};
  transition: height 0.5s ease;
  overflow: hidden;
`;
