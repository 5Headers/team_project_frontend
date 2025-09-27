import axios from "axios";
import { instance } from "../utils/instance";

// 비밀번호 변경 요청 API
export const changePasswordRequest = async (data) => {
  try {
    const response = await instance.post("/account/change/password", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 이메일 인증 메일 전송 API
export const sendmailRequest = async (data) => {
  try {
    const response = await instance.post("/mail/send", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 프로필 이미지 변경 요청 API
export const changeProfileImg = async (data) => {
  try {
    const response = await instance.post("/account/change/profileimg", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 아이디 찾기 API (이름 + 이메일)
export const findIdRequest = async (name, email) => {
  try {
    const response = await instance.post(
      `/account/find-id?name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// 비밀번호 찾기 API (username + 이메일)
export const resetPasswordRequest = async (data) => {
  try {
    // data = { username: "아이디", email: "이메일" }
    const response = await instance.post("/account/reset-password", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//회원탈퇴 
// userId를 받아서 삭제 요청
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        // JWT 사용 시 Authorization 헤더 추가
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data; // ApiRespDto 반환 {status, message, data}
  } catch (error) {
    console.error("회원탈퇴 API 오류:", error);
    throw error;
  }
};