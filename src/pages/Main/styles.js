import { css, keyframes } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
`;

export const background = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://source.unsplash.com/1920x1080/?technology,computer");
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  z-index: -1;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

export const content = (fadeIn, fadeOut) => css`
  text-align: center;
  color: #fff;
  opacity: ${fadeOut ? 0 : fadeIn ? 1 : 0};
  transform: ${fadeOut ? "translateY(-30px)" : "translateY(0)"};
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

export const logo = css`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px #1f5fbf, 0 0 16px #1f5fbf;
  animation: ${float} 3s ease-in-out infinite;
`;

export const subtitle = css`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 4px rgba(0,0,0,0.6);
`;

export const startButton = css`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.05);
  }
`;