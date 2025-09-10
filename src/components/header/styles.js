import { css } from "@emotion/react";

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

      & > li {
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
`;

export const signup = css`
  flex: content;
  color: white;
  background-color: black;
  border-radius: 9999px;
  padding: 10px 24px;
`;

export const headerIcon = css`
  color: #bfd7ea;
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
