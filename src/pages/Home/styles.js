import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 전체는 항상 가운데 */
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px white, 0 0 12px #1f5fbf;
  font-style: oblique;
  font-weight: 400;
`;

export const search = (inputMoved) => css`
  width: 100%;
  display: flex;
  justify-content: center;
  transition: transform 0.5s ease;

  transform: ${inputMoved
    ? "translateY(-150px)"
    : "translateY(0)"}; /* input만 위로 이동 */

  input {
    width: 80vh;
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
  width: 400px;
  height: auto;
  transition: height 0.5s ease;
  overflow: hidden;
`;

export const chatBox = css`
  width: 400px;
  height: 300px;
  border: 1px solid #1f2b38;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  background-color: #1f2b38;
`;

export const overlay = (isSidebarOpen) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  pointer-events: ${isSidebarOpen ? "auto" : "none"};
  transition: opacity 0.3s ease;
  opacity: ${isSidebarOpen ? 1 : 0};
`;

export const sidebar = (isOpen) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #1f2b38;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 1000;
`;

export const closeIcon = css`
  cursor: pointer;
  font-size: 28px;
  margin-bottom: 20px;
`;

export const menu = css`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;
  }
`;
