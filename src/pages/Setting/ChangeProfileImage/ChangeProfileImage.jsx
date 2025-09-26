/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { storage } from "../../../apis/config/firebaseConfig";; // 경로 확인
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ChangeProfileImage() {
  const [image, setImage] = useState(null);      // 미리보기용
  const [imageFile, setImageFile] = useState(null); // 실제 업로드 파일

  // 파일 선택 처리
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 화면 미리보기
      setImageFile(file);                  // 업로드용 상태 저장
    }
  };

  // 커스텀 업로드 버튼 클릭 시 input 클릭
  const triggerFileSelect = () => {
    document.getElementById("fileUpload").click();
  };

  // Firebase에 업로드 후 URL 가져오기
  const handleSave = async () => {
    if (!imageFile) return alert("이미지를 선택해주세요");

    try {
      // Storage 참조 생성
      const storageRef = ref(storage, `profileImages/${imageFile.name}`);

      // 파일 업로드
      await uploadBytes(storageRef, imageFile);

      // 업로드한 파일 URL 가져오기
      const downloadURL = await getDownloadURL(storageRef);

      // 여기서 서버에 downloadURL 저장 API 호출 가능
      console.log("업로드 성공 URL:", downloadURL);
      alert("프로필 이미지가 변경되었습니다.");

    } catch (error) {
      console.error(error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>프로필 이미지 변경</h2>

      {/* 선택한 이미지 미리보기 */}
      {image && <img src={image} alt="미리보기" css={s.preview} />}

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        id="fileUpload"
        style={{ display: "none" }}
      />

      {/* 커스텀 업로드 버튼 */}
      <button onClick={triggerFileSelect} css={s.uploadButton}>
        {image ? "사진 변경" : "사진 선택"}
      </button>

      <button onClick={handleSave} css={s.button}>
        변경한 사진 저장
      </button>
    </div>
  );
}

export default ChangeProfileImage;
