import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  max-width: 100vw; /* 좌우 스크롤 방지 */
  height: 100vh;
  background-color: #1f2b38;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const content = css`
  flex: 1; /* 남은 공간 차지 */
  padding: 20px;
  background-color: #1f2b38; /* 자식 컴포넌트 영역 배경 */
  overflow-y: auto; /* 스크롤 가능 */
  box-sizing: border-box;
`;