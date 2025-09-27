/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const onlineList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const onlineItem = css`
  background-color: #f0f8ff;
  padding: 10px 15px;
  border-radius: 8px;
  a {
    text-decoration: none;
    color: #0077cc;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;