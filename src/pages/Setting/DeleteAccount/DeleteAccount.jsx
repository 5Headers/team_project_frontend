/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { getPrincipalRequest, withdrawUserRequest } from "../../../apis/auth/authApi";

function DeleteAccount() {
  const [user, setUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getPrincipalRequest();
        const currentUser = res.data?.data;

        if (!currentUser) {
          alert("사용자 정보를 가져올 수 없습니다.");
          navigate("/auth/signin");
          return;
        }

        setUser(currentUser);
      } catch (err) {
        console.error(err);
        alert("사용자 정보 조회 실패");
        navigate("/auth/signin");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmMsg = `${user.username} 계정을 삭제하시겠습니까?\n삭제된 계정은 복원할 수 없습니다.`;
    if (!window.confirm(confirmMsg)) return;

    setIsDeleting(true);
    try {
      const response = await withdrawUserRequest(); // 계정 삭제 API 호출

      if (response.data?.status === "success") {
        // localStorage/세션 제거
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        sessionStorage.removeItem("userProfile");

        // 헤더 UI 갱신 이벤트 발생
        window.dispatchEvent(new Event("logout"));

        alert("계정과 관련 모든 데이터가 삭제되었습니다.");
        navigate("/auth/signin");
      } else {
        alert(response.data?.message || "계정 삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원 탈퇴 오류:", err);
      alert("계정 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div css={s.container}>
      <h2 css={s.title}>회원탈퇴</h2>
      <p css={s.warning}>
        {user.username} 계정을 삭제하면 모든 정보(견적, 부품, OAuth 계정 등)가
        영구적으로 삭제됩니다.
      </p>
      <button
        css={s.button}
        onClick={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? "삭제 중..." : "회원탈퇴"}
      </button>
    </div>
  );
}

export default DeleteAccount;







