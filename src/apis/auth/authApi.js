import { instance } from "../utils/instance";

// 현재 로그인한 사용자의 정보를 요청하는 함수
export const getPrincipalRequest = async () => {
  
    // 요청을 보낼 때마다 실행되는 인터셉터 설정
  instance.interceptors.request.use((config) => {
    // localStorage에 저장된 accessToken을 가져옴
    const accessToken = localStorage.getItem("accessToken");

    // accessToken이 존재하면 요청 헤더에 Authorization 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config; // 수정된 config 반환
  });

  try {
    // "/auth/principal" 엔드포인트로 GET 요청 → 로그인 사용자 정보 가져옴
    const response = await instance.get("/auth/principal");
    return response; // 성공 시 응답 반환
  } catch (error) {
    // 실패 시 error.response 반환 (백엔드에서 준 에러 응답)
    return error.response;
  }
};

// 회원가입 요청 함수
export const signupRequest = async (data) => {
  try {
    // "/auth/signup" 엔드포인트로 POST 요청 (data: 회원가입 정보)
    const response = await instance.post("/auth/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 로그인 요청 함수
export const signinRequest = async (data) => {
  try {
    // "/auth/signin" 엔드포인트로 POST 요청 (data: 로그인 정보)
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

//아이디(username)중복 확인