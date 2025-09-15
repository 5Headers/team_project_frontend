import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  overflow: hidden;
  position: relative;
`;

export const logo = css`
  pointer-events: none;
  user-select: none;
  color: white;
  font-size: 4vh;
  margin: 0 0 20px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6), 0 0 6px white, 0 0 12px #1f5fbf;
  font-weight: 400;
`;

export const search = (inputMoved) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  transition: transform 0.5s ease, top 0.5s ease;
  position: ${inputMoved ? "fixed" : "relative"};
  top: ${inputMoved ? "120px" : "auto"};
  z-index: 1000;

  input {
    width: 90%;
    max-width: 800px;
    height: 6vh;
    padding: 10px 50px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 9999px;
    outline: none;
    box-sizing: border-box;
    transition: border 0.5s ease, box-shadow 0.3s ease;

    &:focus {
      border: 2px solid #3a8de6ff;
      box-shadow: 0 0 12px 4px #3a8de6ff;
    }
  }
`;

export const chatBoxWrapper = css`
  width: 100%;
  max-width: 900px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  position: relative; /* 하트 위치 기준 */
`;

export const chatBox = css`
  width: 100%;
  border: 1px solid #1f2b38;
  border-radius: 8px;
  padding: 10px;
  background-color: #1f2b38;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 60vh;
  overflow-y: auto;
  position: relative;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const userMessage = css`
  position: relative;
  background-color: #3a8de6ff;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  margin: 6px 0;
  max-width: 85%;
  align-self: flex-end;
  word-break: break-word;
  box-sizing: border-box;
  white-space: pre-wrap;
`;

export const gptMessage = css`
  background-color: #2b3a4d;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  margin: 6px 0;
  max-width: 85%;
  align-self: flex-start;
  word-break: break-word;
  box-sizing: border-box;
  white-space: pre-wrap;
`;

export const heartIconBottom = css`
  position: absolute;
  right: 0;          /* chatBox 오른쪽 끝 */
  bottom: -20px;     /* chatBox 아래에서 20px 아래 */
  font-size: 24px;
  cursor: pointer;
  transition: color 0.2s ease;
`;

//내일 오면 input overlay 설정