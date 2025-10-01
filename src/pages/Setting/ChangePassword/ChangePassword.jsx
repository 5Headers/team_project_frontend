/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate import
import * as s from "./styles";
import { changePasswordRequest } from "../../../apis/account/accountApis";
import { getPrincipalRequest } from "../../../apis/auth/authApi";

function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async () => {
    if (!currentPwd || !newPwd) {
      alert("모든 필드를 입력해주세요");
      return;
    }

    // ✅ 새 비밀번호 정규식 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    if (!passwordRegex.test(newPwd)) {
      alert(
        "새 비밀번호는 8~16자이며, 영문자, 숫자, 특수문자(!@#$%^&*?_)를 모두 포함해야 합니다."
      );
      return;
    }

    setLoading(true);

    try {
      // 로그인한 사용자 정보 가져오기
      const principalRes = await getPrincipalRequest();
      if (principalRes.data.status !== "success") {
        alert("사용자 정보를 가져올 수 없습니다.");
        return;
      }

      const userId = principalRes.data.data.userId;

      // 비밀번호 변경 API 요청
      const response = await changePasswordRequest({
        userId: userId,
        oldPassword: currentPwd,
        newPassword: newPwd,
      });

      if (response.data.status === "success") {
        alert(response.data.message);

        // 로그아웃 처리 후 로그인 페이지 이동
        localStorage.removeItem("accessToken");
        navigate("/auth/signin");
      } else {
        alert(response.data.message || "비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
        <button css={s.button} onClick={handleChange} disabled={loading}>
          {loading ? "처리중..." : "비밀번호 변경"}
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
