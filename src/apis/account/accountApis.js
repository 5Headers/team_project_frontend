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


export const changeProfileImg = async (data) => {
	try {
		const response = await instance.post(
			"/auth/profile",
			data
		);
		return response;
	} catch (error) {
		return error.response;
	}
};