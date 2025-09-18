/** @jsxImportSource @emotion/react */
import * as s from "../styles";

function DeletePickList() {
  const handleDelete = () => {
    if (window.confirm("정말 모든 찜한 게시물을 삭제하겠습니까?")) {
      alert("찜한 게시물이 모두 삭제되었습니다.");
    }
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>찜 전체 삭제</h2>
      <p css={s.desc}>모든 찜한 게시물을 한 번에 삭제합니다.</p>
      <button css={s.button} onClick={handleDelete}>
        전체 삭제하기
      </button>
    </div>
  );
}

export default DeletePickList;
