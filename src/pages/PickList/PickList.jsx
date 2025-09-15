/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function PickList() {
  return (
    <div css={s.container}>
      <ul css={s.ListBox}>
        <li css={s.ImgBox}>이미지</li>
        <li css={s.TitleBox}>
          <div css={s.TitleText}>제목</div>
          <div css={s.ExportText}>내용</div>
        </li>
      </ul>
    </div>
  );
}

export default PickList;
