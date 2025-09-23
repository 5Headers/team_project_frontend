/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

function ChangeProfileImage() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!image) return alert("이미지를 선택해주세요");
    alert("프로필 이미지가 변경되었습니다.");
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>프로필 이미지 변경</h2>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="프로필 미리보기" css={s.preview} />}
      <button onClick={handleSave} css={s.button}>
        변경한 사진 저장
      </button>
    </div>
  );
}

export default ChangeProfileImage;
