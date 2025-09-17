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