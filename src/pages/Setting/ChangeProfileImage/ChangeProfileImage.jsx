// /** @jsxImportSource @emotion/react */
// import { useState } from "react";
// import * as s from "./styles";

// // 🔹 Firebase Storage 관련 import 추가
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../apis/config/firebaseConfig";
//  // firebaseConfig.js 경로에 맞게 수정

// function ChangeProfileImage() {
//   const [image, setImage] = useState(null);
  
//   // 🔹 실제 업로드할 파일 상태 추가
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0); // 업로드 진행률 상태

//   // 파일 선택
//   const handleUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     setFile(selectedFile); // 🔹 선택한 파일 상태에 저장
//     setImage(URL.createObjectURL(selectedFile)); // 미리보기
//   };

//   const triggerFileSelect = () => {
//     document.getElementById("fileUpload").click();
//   };

//   // 🔹 Firebase Storage 업로드 및 저장
//   const handleSave = () => {
//     if (!file) return alert("이미지를 선택해주세요");

//     const storageRef = ref(storage, `profileImages/${file.name}_${Date.now()}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(Math.round(percent)); // 🔹 진행률 업데이트
//       },
//       (error) => {
//         console.error("업로드 실패:", error);
//         alert("업로드에 실패했습니다."); // 🔹 에러 처리
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           console.log("Firebase 다운로드 URL:", url);
//           alert("프로필 이미지가 변경되었습니다."); // 🔹 업로드 완료 알림
//           // 🔹 서버 API 호출로 URL 저장 가능
//         });
//       }
//     );
//   };

//   return (
//     <div css={s.container}>
//       <h2 css={s.title}>프로필 이미지 변경</h2>

//       {/* 선택한 이미지 미리보기 */}
//       {image && <img src={image} alt="미리보기" css={s.preview} />}

//       {/* 숨겨진 파일 input */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleUpload}
//         id="fileUpload"
//         style={{ display: "none" }}
//       />

//       {/* 커스텀 업로드 버튼 */}
//       <button onClick={triggerFileSelect} css={s.uploadButton}>
//         {image ? "사진 변경" : "사진 선택"}
//       </button>

//       <button onClick={handleSave} css={s.button}>
//         변경한 사진 저장
//       </button>

//       {/* 🔹 업로드 진행률 표시 */}
//       {progress > 0 && <div>업로드 진행률: {progress}%</div>}
//     </div>
//   );
// }

/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../apis/config/firebaseConfig";

function ChangeProfileImage() {
  // const { profileImageUrl, setProfileImageUrl } = useUser(); // Context에서 가져오기
   const [profileImageUrl, setProfileImageUrl] = useState(null); // ✅ 로컬 상태로 대체
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const triggerFileSelect = () => {
    document.getElementById("fileUpload").click();
  };

  const handleSave = () => {
    if (!file) return alert("이미지를 선택해주세요");

    const storageRef = ref(storage, `profileImages/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percent));
      },
      (error) => {
        console.error("업로드 실패:", error);
        alert("업로드에 실패했습니다.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProfileImageUrl(url); // Context에 저장
          alert("프로필 이미지가 변경되었습니다.");
        });
      }
    );
  };

  return (
    <div css={s.container}>
      <h2 css={s.title}>프로필 이미지 변경</h2>

      {/* 선택한 이미지 미리보기 */}
      {file && <img src={URL.createObjectURL(file)} alt="미리보기" css={s.preview} />}
      {profileImageUrl && !file && <img src={profileImageUrl} alt="프로필" css={s.preview} />}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        id="fileUpload"
        style={{ display: "none" }}
      />

      <button onClick={triggerFileSelect} css={s.uploadButton}>
        {file ? "사진 변경" : "사진 선택"}
      </button>

      <button onClick={handleSave} css={s.button}>
        저장
      </button>

      {progress > 0 && <div>업로드 진행률: {progress}%</div>}
    </div>
  );
}

export default ChangeProfileImage;