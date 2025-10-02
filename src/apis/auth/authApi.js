import { instance } from "../utils/instance";
import profileImageDefault from "../../assets/기본프로필.png"; // ✅ 기본 프로필 이미지 경로

// 현재 로그인한 사용자의 정보 요청
export const getPrincipalRequest = async () => {
  try {
    const response = await instance.get("/auth/principal");
    return response;
  } catch (error) {
    return error.response;
  }
};

// 회원가입 요청
export const signupRequest = async (data) => {
  try {
    return await instance.post("/auth/signup", data);
  } catch (error) {
    return error.response;
  }
};

// 로그인 요청 (✅ 수정됨)
export const signinRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signin", data);

    if (response.data?.status === "success") {
      const token = response.data?.data?.token;
      const user = response.data?.data?.user; // 서버에서 내려주는 유저 정보

      // ✅ 토큰 저장
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      // ✅ 프로필 이미지 저장
      if (user?.profileImg) {
        localStorage.setItem("userProfile", user.profileImg);
      } else {
        localStorage.setItem("userProfile", profileImageDefault);
      }

      // ✅ 이벤트 발행 → Header/Profile 즉시 반영
      window.dispatchEvent(new Event("login"));
      window.dispatchEvent(new Event("profileUpdate"));
    }

    return response;
  } catch (error) {
    return error.response;
  }
};

// OAuth2 회원가입
export const oauth2SignupRequest = async (data) => {
  try {
    return await instance.post("/oauth2/signup", data);
  } catch (error) {
    return error.response;
  }
};

// OAuth2 계정 연동
export const oauth2MergeRequest = async (data) => {
  try {
    return await instance.post("/oauth2/merge", data);
  } catch (error) {
    return error.response;
  }
};

// 아이디 중복 확인
export const checkUsernameRequest = async (username) => {
  try {
    return await instance.get(`/auth/check-username?username=${username}`);
  } catch (error) {
    return error.response;
  }
};

// 이메일 중복 확인
export const checkEmailRequest = async (email) => {
  try {
    return await instance.get(`/auth/check-email?email=${email}`);
  } catch (error) {
    return error.response;
  }
};

// 회원 탈퇴
export const withdrawUserRequest = async () => {
  try {
    return await instance.delete("/auth/withdraw");
  } catch (error) {
    return error.response;
  }
};
