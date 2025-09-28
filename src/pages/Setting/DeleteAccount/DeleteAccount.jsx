/** @jsxImportSource @emotion/react */
import { useState } from "react"; // 🔹 추가: useState import
import * as s from "./styles";
import { useNavigate } from "react-router-dom"; 
import { withdrawRequest } from "../../apis/auth/authApi";

function DeleteAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirm1 = window.confirm("정말로 계정을 삭제하시겠습니까?");
    if (!confirm1) return;

    const confirm2 = window.confirm(
      "삭제된 계정은 복원할 수 없습니다. 계속 진행할까요?"
    );
    if (!confirm2) return;

    try {
      setLoading(true);
      const response = await withdrawRequest(); // 🔹 백엔드 연동

      if (response?.data?.status === "success") {
        localStorage.removeItem("accessToken"); // 🔹 로그아웃 처리
        alert("회원 탈퇴 완료되었습니다.");
        navigate("/"); // 🔹 홈 이동
      } else {
        alert(response?.data?.message || "회원 탈퇴 실패");
      }
    } catch (err) {
      console.error(err);
      alert("회원 탈퇴 중 오류가 발생했습니다."); // 🔹 네트워크/서버 오류 처리
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>회원탈퇴</h2>
      <p css={s.warning}>계정 삭제 시, 모든 정보가 영구적으로 삭제됩니다.</p>
      <button css={s.button} onClick={handleDeleteAccount} disabled={loading}>
        회원탈퇴
      </button>
    </div>
  );
}

export default DeleteAccount;