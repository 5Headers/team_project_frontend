import { css } from "@emotion/react";

export const header = css`
  height: 60px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 0px;
  padding-right: 20px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    & > ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;

      & > li {
        color: #bfd7ea;
        cursor: pointer;
        list-style: none;

        & > a {
          text-decoration: none;
          color: #bfd7ea;
        }
      }
    }
  }
`;

export const login = css`
  flex: content;
  background-color: white;
  border-radius: 70%/50%;
  //내일 할꺼 : 이거 width랑 height 조절해서 자연스럽게 직사각형 양쪽에 반원 그리기
`;

export const signup = css`
  flex: content;
  background-color: black;
  border-radius: 70%/50%;
`;

export const headerIcon = css`
  display: flex;
  background-color: #5c5c5c;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  border-radius: 50%;
  border: 1px solid #5c5c5c;
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  margin-right: auto;
`;
