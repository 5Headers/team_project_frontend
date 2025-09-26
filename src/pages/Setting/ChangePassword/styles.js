import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px; /* 좌우 여백 */
  font-size: 20px; /* 전체 폰트 통일 */
  overflow-x: hidden; /* 혹시 모를 수평 스크롤 제거 */
`;

export const title = css`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px; /* 기존보다 약간 더 늘림 */
  text-align: center;
`;

export const inner = css`
  width: 100%;
  max-width: 600px; /* 화면 너무 넓어도 적당히 제한 */
  margin: -70px auto 0 auto; /* 중앙 정렬 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 요소 간 간격 */
  box-sizing: border-box;
  font-size: 30px; /* 내부 폰트 통일 */
`;

export const input = css`
  width: 100%;
  height: 150px;
  padding: 0 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 20px; /* 입력창 폰트 통일 */
`;

export const button = css`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: none;
  background-color: #ff7f50;
  color: white;
  font-size: 20px; /* 버튼 폰트 통일 */
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff4500;
  }
`;

export const uploadButton = css`
  padding: 15px 30px;
  border-radius: 10px;
  background-color: #145fafff;
  color: white;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #1e79daff;
    box-shadow: 0 0 10px #4e9df1ff, 0 0 20px #4e9df1ff;
    transform: translateY(-2px);
  }
`;
