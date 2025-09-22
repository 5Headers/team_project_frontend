/** @jsxImportSource @emotion/react */
import * as s from "../styles";

function DeletePickList() {
  const handleDeleteAccount = () => {
    const confirm1 = window.confirm("정말로 찜 목록을 삭제하시겠습니까?");
    if (!confirm1) return;

    const confirm2 = window.confirm(
      "삭제된 찜 목록은 복원할 수 없습니다. 계속 진행할까요?"
    );
    if (!confirm2) return;

    alert("찜 목록이 안전하게 삭제되었습니다. 감사합니다.");
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>찜 삭제</h2>
      <p css={s.warning}>찜 삭제 시, 찜한 리스트가 삭제됩니다.</p>
      <button css={s.button} onClick={handleDeleteAccount}>
        찜 삭제
      </button>
    </div>
  );
}

export default DeletePickList;
