/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import { getPrincipalRequest, withdrawUserRequest } from "../../../apis/auth/authApi";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getPrincipalRequest();
      if (response.data.status === "success") {
        setUser(response.data.data);
      }
    };
    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    const confirm1 = window.confirm("정말로 계정을 삭제하시겠습니까?");
    if (!confirm1) return;

    const confirm2 = window.confirm(
      "삭제된 계정은 복원할 수 없습니다. 계속 진행할까요?"
    );
    if (!confirm2) return;

    try {
      const response = await withdrawUserRequest();

      if (response.data.status === "success") {
        // ✅ 로그아웃 처리 + Header 갱신 이벤트
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event("logout"));

        alert("계정이 삭제되었습니다. 이용해주셔서 감사합니다.");
        navigate("/"); // 메인 페이지 이동
      } else {
        alert("회원탈퇴 실패: " + response.data.message);
      }
    } catch (error) {
      alert("회원탈퇴 요청 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>회원탈퇴</h2>
      {user && (
        <p css={s.warning}>
          {user.username}님. 계정을 삭제하면 모든 정보가 삭제됩니다.
        </p>
      )}
      <button css={s.button} onClick={handleDeleteAccount}>
        회원탈퇴
      </button>
    </div>
  );
}

export default DeleteAccount;


