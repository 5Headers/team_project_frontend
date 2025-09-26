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
  /* 카카오 기본 InfoWindow 배경/프레임 제거 */
  .customInfoWindow {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }

  /* ✅ 카카오맵이 자동으로 넣는 꼬리, 배경, 닫기 버튼 제거 */
  .customInfoWindow .info,
  .customInfoWindow .bg,
  .customInfoWindow .close,
  .customInfoWindow .tail,
  .customInfoWindow .tailBorder,
  .customInfoWindow:before,
  .customInfoWindow:after {
    display: none !important;
    content: none !important;
  }

  /* ✅ 다크카드 */
  .customInfoWindow .inner {
    position: relative;
    background: #1f2b38;
    color: white;
    border-radius: 12px;
    padding: 16px 16px 20px 16px;
    font-size: 14px;
    min-width: 260px;
    max-width: 320px;
    word-break: break-word;
    line-height: 1.6;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.7);
  }

  /* ✅ 커스텀 닫기 버튼 */
  .customInfoWindow .inner .custom-close {
    position: absolute;
    top: 6px;
    right: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #ccc;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .customInfoWindow .inner .custom-close:hover {
    color: #ff4d6d;
  }

  /* ✅ 타이틀 */
  .customInfoWindow .title {
    color: #3a8de6;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
    padding-right: 20px; /* 닫기 버튼 영역 확보 */
  }

  .customInfoWindow .address {
    color: #ccc;
    margin-bottom: 4px;
    display: block;
  }

  .customInfoWindow .phone {
    color: #aaa;
    margin-bottom: 6px;
    display: block;
  }

  .customInfoWindow .link {
    color: #3a8de6;
    font-weight: bold;
    font-size: 13px;
    text-decoration: none;
    display: inline-block;
    margin-top: 6px;
    text-align: right;
    width: 100%;
  }

  .customInfoWindow .link:hover {
    color: #5c9eff;
  }
`;
