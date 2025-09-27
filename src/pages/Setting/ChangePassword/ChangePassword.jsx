/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import { changePasswordRequest } from "../../../apis/account/accountApis";

function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const navigate = useNavigate();

  const handleChange = async () => {
    if (!currentPwd || !newPwd) {
      alert("모든 필드를 입력해주세요");
      return;
    }

    try {
      const data = {
        oldPassword: currentPwd,
        newPassword: newPwd,
      };

      const response = await changePasswordRequest(data);

      if (response?.data?.status === "success") {
        alert(response.data.message);
        navigate("/auth/signin"); // 비밀번호 변경 후 로그인 페이지 이동
      } else {
        alert(response.data.message || "비밀번호 변경 실패");
      }
    } catch (error) {
      console.error(error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={s.container}>
      <div css={s.inner}>
        <h2>비밀번호 변경</h2>
        <input
          css={s.input}
          type="password"
          placeholder="현재 비밀번호"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />
        <input
          css={s.input}
          type="password"
          placeholder="새로운 비밀번호"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <button css={s.button} onClick={handleChange}>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
