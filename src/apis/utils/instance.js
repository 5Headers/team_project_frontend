// apis/utils/instance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Spring 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 자동으로 Authorization 헤더 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 로그인 시 저장한 토큰
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { instance };
