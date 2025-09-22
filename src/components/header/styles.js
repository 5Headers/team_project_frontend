import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 70px;
  background-color: #1f2b38;
  position: relative;
`;

// FiMenu 자연스럽게 나타나게
export const fixedMenuIconWrapper = (isOpen) => css`
  position: fixed;
  top: 17px;
  left: 15px;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: #5c5c5c;
  border-radius: 50%;
  font-size: 17px;
  border: 1px solid #5c5c5c;
  cursor: pointer;

  transition: all 0.1s ease-in-out;
  opacity: ${isOpen ? 0 : 1};
  transform: ${isOpen ? "translateX(20px)" : "translateX(0)"};
  pointer-events: ${isOpen ? "none" : "auto"};
`;

export const header = css`
  height: 70px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  padding: 17px 15px;
  padding-right: 30px;
  border-bottom: 1px solid #5c5c5c;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    & > ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;

      & > li,
      button {
        list-style: none;
        cursor: pointer;
        z-index: 1;

        & > a {
          text-decoration: none;
          color: #bfd7ea;
        }
      }
    }
  }
`;

export const login = css`
  background-color: white;
  color: black;
  border-radius: 9999px;
  padding: 10px 24px;
  :hover {
    background-color: #dadadaff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), 0 0 6px #384e66ff,
      0 0 12px #384e66ff;
    transform: translateY(-1px);
  }
`;

export const signup = css`
  color: white;
  background-color: black;
  border-radius: 9999px;
  padding: 10px 24px;
  :hover {
    background-color: #0e0e0eff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1), 0 0 6px #161f29ff,
      0 0 12px #161f29ff;
    transform: translateY(-1px);
  }
`;

export const headerIcon = (isRotated) => css`
  color: #bfd7ea;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  border-radius: 50%;
  border: 1px solid #5c5c5c;
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: ${isRotated ? "rotate(90deg)" : "rotate(0deg)"};
`;

// 사이드바
export const sidebar = (isOpen) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #1f2b38;
  color: white;
  padding: 0px;
  box-sizing: border-box;
  transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 1000;
  padding-top: 40px;
  text-align: center;
  align-items: center;
  line-height: 50px;

  ul {
    list-style: none;
    padding: 0;
    font-size: larger;
    border-top: 1px solid #405d7cff;
    border-bottom: 1px solid #405d7cff;
    li {
      width: 250px;
      height: 50px;
      cursor: pointer;

      :hover {
        background-color: #121920ff;
        color: mintcream;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6,
          0 0 12px #1f5fbf;
      }
    }
  }
`;

// GoTriangleLeft 위치 유지 + 자연스럽게 나타나고 사라짐
export const sidebarToggle = (isOpen) => css`
  position: absolute;
  top: 20px;
  right: -20px;
  background-color: #5c5c5c;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  border: 1px solid #5c5c5c;

  transition: all 0.2s ease-in-out;
  opacity: ${isOpen ? 1 : 0};
  transform: ${isOpen ? "translateX(0)" : "translateX(20px)"};
  pointer-events: ${isOpen ? "auto" : "none"};
`;

export const overlay = (isSidebarOpen) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* 사이드바보다 아래 */
  pointer-events: ${isSidebarOpen ? "auto" : "none"};
  transition: opacity 0.3s ease;
  opacity: ${isSidebarOpen ? 1 : 0};
`;

export const headerSlidingMenu = (isOpen) => css`
  position: absolute;
  top: 70px; /* Header 바로 아래 */
  right: 15px;
  width: 180px;
  background-color: #1f2b38;
  border: 1px solid #5c5c5c;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2001;

  /* 부드러운 슬라이드 + 페이드 */
  transform: ${isOpen ? "translateY(0)" : "translateY(-10px)"};
  opacity: ${isOpen ? 1 : 0};
  transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.3s ease;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 12px 15px;
      cursor: pointer;
      color: #bfd7ea;
      text-align: left;
      font-size: 14px;
      transition: background-color 0.2s ease;

      :hover {
        background-color: #121920ff;
        color: mintcream;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6,
          0 0 12px #1f5fbf;
      }
    }
  }
`;

export const sidebarItem = (isActive) => css`
  width: 250px;
  height: 50px;
  cursor: pointer;
  background-color: ${isActive ? "#121920ff" : "transparent"};
  color: ${isActive ? "mintcream" : "white"};
  text-shadow: ${isActive
    ? "1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6, 0 0 12px #1f5fbf"
    : "none"};

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: #121920ff;
    color: mintcream;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px #3a8de6,
      0 0 12px #1f5fbf;
  }
`;
