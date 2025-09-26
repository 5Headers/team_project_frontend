/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  background-color: #121920;
  color: white;
`;

export const mapArea = css`
  flex: 2;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);

  #map {
    width: 100%;
    height: 100%;
  }
`;

export const listArea = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1f2b38;
  border: 1px solid #3a8de6;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 100%;

  scrollbar-width: thin;
  scrollbar-color: #3a8de6 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3a8de6;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const listTitle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
  color: #3a8de6;
  text-shadow: 0 0 6px rgba(58, 141, 230, 0.6);
`;

export const listItem = css`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;

  strong {
    font-size: 1rem;
    color: #fff;
  }

  span {
    font-size: 0.85rem;
    color: #ccc;
  }

  &:hover {
    background-color: #2b3a4d;
    transform: translateX(4px);
    box-shadow: 0 0 10px rgba(58, 141, 230, 0.6);
  }
`;

/* ✅ 커스텀 인포윈도우 스타일 */
export const globalStyles = css`
  /* 카카오 기본 infowindow 배경/테두리 제거 */
  .customInfoWindow {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    position: relative;
  }

  /* 내부 카드: 흰 프레임 가리도록 위로 이동 */
  .customInfoWindow .inner {
    position: relative;
    top: -12px; /* ✅ 다크 카드 위로 올려서 흰색 배경 가림 */
    background: #1f2b38;
    color: white;
    border-radius: 12px;
    padding: 12px;
    font-size: 13px;
    max-width: 240px;
    word-break: break-word;
    line-height: 1.5;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  }

  .customInfoWindow .title {
    color: #3a8de6;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }

  .customInfoWindow .address {
    display: block;
    color: #ccc;
    margin-bottom: 2px;
  }

  .customInfoWindow .phone {
    display: block;
    color: #aaa;
    margin-bottom: 6px;
  }

  .customInfoWindow .link {
    display: inline-block;
    margin-top: 4px;
    text-align: right;
    width: 100%;
    color: #3a8de6;
    text-decoration: none;
    font-weight: bold;
    font-size: 12px;
  }

  .customInfoWindow .link:hover {
    color: #5c9eff;
  }

  /* 카카오 기본 꼬리 제거 */
  .customInfoWindow:before,
  .customInfoWindow:after {
    display: none !important;
  }
`;
