/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react"; // ✅ useRef 추가
import * as s from "./styles";
import profileImageDefault from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

// ✅ Firebase 관련 import 추가
import { storage } from "../../apis/config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { changeProfileImg } from "../../apis/account/accountApis";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileImage, setProfileImage] = useState(profileImageDefault);

  const [bookmarkedEstimates, setBookmarkedEstimates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const amountPerPage = 5;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // ✅ 업로드 관련 상태 변수
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // ✅ ref 연결
  const fileInputRef = useRef(null);

  // --- 사용자 정보 및 북마크된 견적 조회 ---
  useEffect(() => {
    const fetchUserAndBookmarks = async () => {
      try {
        const res = await getPrincipalRequest();
        if (res.data?.data) {
          const { name, email, userId } = res.data.data;
          setUser({ name, email, userId });

          const resBookmarked = await fetch(
            `http://localhost:8080/bookmark/user/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const resJson = await resBookmarked.json();
          const estimatesArray = Array.isArray(resJson)
            ? resJson
            : resJson.data && Array.isArray(resJson.data)
            ? resJson.data
            : [];

          const formatted = estimatesArray.map((e) => ({
            ...e.estimate,
            createdAt: e.estimate?.createdAt
              ? new Date(e.estimate.createdAt).toISOString().slice(0, 10)
              : "",
          }));

          setBookmarkedEstimates(formatted);
          setTotalPages(Math.ceil(formatted.length / amountPerPage));
        }
      } catch (err) {
        console.error("사용자/북마크 견적 가져오기 실패:", err);
      }
    };
    fetchUserAndBookmarks();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  // --- 이미지 변경 핸들러 ---
  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewProfileImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // ✅ profileImg → profileImage
    };
    reader.readAsDataURL(file);
  };

  const onClickProfileImgHandler = () => {
    fileInputRef.current.click();
  };

  const onClickChangeBtnHandler = () => {
    if (!newProfileImg) {
      alert("이미지를 선택하세요.");
      return;
    }

    setIsUploading(true);

    const imageRef = ref(
      storage,
      `profile-img/${uuid()}_${newProfileImg.name}` // ✅ 수정: 기존 pop() 제거, 원래 이름 그대로 사용
    );

    const uploadTask = uploadBytesResumable(imageRef, newProfileImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.error(error);
        alert("업로드 중 에러가 발생했습니다.");
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          await changeProfileImg({
            userId: user.userId, // ✅ userId 정의
            profileImg: downloadUrl,
          });

          alert("프로필 이미지가 변경되었습니다.");
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert("이미지 URL 가져오기 중 에러 발생");
        } finally {
          setIsUploading(false);
          setProgress(0);
        }
      }
    );
  };
  

  // --- 페이지 변경 ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- 상세 페이지 이동 ---
  const handleShowParts = (estimateId) => {
    navigate(`/auth/estimate/${estimateId}`);
  };

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img
                src={profileImage}
                alt="profileImage"
                onClick={onClickProfileImgHandler} // ✅ 클릭하면 파일 선택
              />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onChangeFileHandler} // ✅ 핸들러 연결
              style={{ display: "none" }}
            />
          </div>

          <div css={s.profileInfoBox}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={onClickChangeBtnHandler}>
              {isUploading ? `${progress}%` : "변경하기"}
            </button>
          </div>
        </div>

        {/* 북마크된 견적 리스트 */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>찜한 견적</h2>
          <div css={[s.estimateBox, s.estimateBoxScrollbar]}>
            {bookmarkedEstimates
              .slice(currentPage * amountPerPage, (currentPage + 1) * amountPerPage)
              .map((est, idx) => {
                const itemNumber = currentPage * amountPerPage + idx + 1;
                return (
                  <div
                    key={est.estimateId}
                    css={s.estimateList}
                    onClick={() => handleShowParts(est.estimateId)}
                  >
                    <span css={s.itemNumber}>{itemNumber}.</span>
                    <div css={s.itemDetails}>
                      <div css={s.leftSide}>
                        <span>목적: {est.purpose}</span>
                        <span>가격: {est.budget}원</span>
                      </div>
                      <span css={s.createdAt}>{est.createdAt}</span>
                    </div>
                    <FaHeart
                      css={s.heartIconBottom}
                      color={est.liked ? "red" : "lightgray"}
                      onClick={async (e) => {
                        e.stopPropagation();
                        setBookmarkedEstimates((prev) =>
                          prev.map((b, i) =>
                            i === idx ? { ...b, liked: !b.liked } : b
                          )
                        );
                        try {
                          await axios.post(
                            `http://localhost:8080/bookmark/toggle/${est.estimateId}`,
                            {},
                            { headers: { Authorization: `Bearer ${token}` } }
                          );
                        } catch (err) {
                          console.error("북마크 토글 실패:", err);
                        }
                      }}
                    />
                  </div>
                );
              })}
          </div>

          {/* 페이지네이션 */}
          <div css={s.pagenateContainer}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(Math.max(currentPage - 1, 0));
              }}
            >
              이전
            </a>
            {Array.from({ length: totalPages }).map((_, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i);
                }}
                css={i === currentPage ? s.activePage : null}
              >
                {i + 1}
              </a>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(Math.min(currentPage + 1, totalPages - 1));
              }}
            >
              다음
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
