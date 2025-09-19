import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080", // 백엔드 주소
});