import { instance } from "../utils/instance";



// ✅ 비밀번호 변경 요청 API (토큰 필요)
export const changePasswordRequest = async (data) => {
  try {
    const response = await instance.post("/account/change/password", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ✅ 이메일 인증 메일 전송 API (토큰 불필요)
export const sendmailRequest = async (data) => {
  try {
    const response = await instance.post("/mail/send", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ✅ 기존 프로필 이미지 변경 요청 API
// ✅ 기존 프로필 이미지 변경 요청 API
export const changeProfileImg = async (data) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("👉 토큰 확인:", token);   // ✅ 추가

    const response = await instance.post("/account/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ✅ 보완된 프로필 이미지 변경 요청 API (update 버전)
export const updateProfileImg = async (data) => {
  try {
    const response = await instance.post("/account/profile/update", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// ✅ 아이디 찾기 API (토큰 불필요)
export const findIdRequest = async (name, email) => {
  try {
    const response = await instance.post(
      `/account/find-id?name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}`,
      null,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// ✅ 비밀번호 재설정 요청 API (토큰 불필요)
export const resetPasswordRequest = async (data) => {
  try {
    const response = await instance.post("/account/reset-password", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
