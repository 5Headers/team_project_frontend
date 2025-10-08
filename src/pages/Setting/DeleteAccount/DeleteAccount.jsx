/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function DeleteAccount() {
  const handleDeleteAccount = () => {
    const confirm1 = window.confirm("정말로 계정을 삭제하시겠습니까?");
    if (!confirm1) return;

    const confirm2 = window.confirm(
      "삭제된 계정은 복원할 수 없습니다. 계속 진행할까요?"
    );
    if (!confirm2) return;

    alert("계정이 삭제되었습니다. 이용해주셔서 감사합니다.");
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>회원탈퇴</h2>
      <p css={s.warning}>계정 삭제 시, 모든 정보가 영구적으로 삭제됩니다.</p>
      <button css={s.button} onClick={handleDeleteAccount}>
        회원탈퇴
      </button>
    </div>
  );
}

export default DeleteAccount;
