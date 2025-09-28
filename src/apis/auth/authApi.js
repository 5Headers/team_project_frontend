import { instance } from "../utils/instance";

// 🔹 인터셉터 중복 등록 방지: instance.js에서 한 번만 등록하도록 권장
// 현재 로그인한 사용자의 정보를 요청하는 함수
export const getPrincipalRequest = async () => {
  try {
    const response = await instance.get("/auth/principal");
    return response; // 성공 시 응답 반환
  } catch (error) {
    return error.response;
  }
};

// 회원가입 요청 함수 & 회원가입 시 아이디 중복확인
export const signupRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 로그인 요청 함수
export const signinRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signin", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// OAuth2 소셜 회원가입 요청
export const oauth2SignupRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// OAuth2 계정 연동(merge) 요청
export const oauth2MergeRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/merge", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 아이디 중복 확인
export const checkUsernameRequest = async (username) => {
  try {
    const response = await instance.get(
      `/auth/check-username?username=${username}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// 이메일 중복 확인
export const checkEmailRequest = async (email) => {
  try {
    const response = await instance.get(`/auth/check-email?email=${email}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 회원탈퇴 요청
export const withdrawRequest = async () => {
  try {
    // 🔹 수정: JWT 토큰 헤더 명시적으로 추가
    const accessToken = localStorage.getItem("accessToken"); 
    const response = await instance.delete("/auth/withdraw", {
      headers: { Authorization: `Bearer ${accessToken}` } // 🔹 수정
    });
    return response;
  } catch (error) {
    return error.response; 
  }
};