// utils/instance.js
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ 모든 요청에 accessToken 자동으로 붙게 설정
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
