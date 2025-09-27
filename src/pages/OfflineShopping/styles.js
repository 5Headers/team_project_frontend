/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const offlineList = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const offlineBranch = css`
  background-color: #fff4e6;
  padding: 15px;
  border-radius: 8px;
  ul {
    margin-top: 10px;
    li {
      margin-bottom: 5px;
    }
  }
`;
