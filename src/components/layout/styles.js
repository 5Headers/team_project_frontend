import { css } from "@emotion/react";

export const container = css`
  width: 100%; /* 100vw 대신 */
  max-width: 100vw; /* 좌우 스크롤 방지 */
  height: 100vh;
  background-color: #1f2b38;
  overflow: hidden;
  box-sizing: border-box;
`;
