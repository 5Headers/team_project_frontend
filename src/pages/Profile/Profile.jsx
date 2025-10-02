/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import * as s from "./styles";
import profileImageDefault from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { storage } from "../../apis/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { changeProfileImg } from "../../apis/account/accountApis";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileImage, setProfileImage] = useState(profileImageDefault);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [bookmarkedEstimates, setBookmarkedEstimates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const amountPerPage = 5;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- 사용자 정보 및 북마크 조회 ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await getPrincipalRequest();
        if (!resUser.data?.data) return;

        const { name, email, userId, profileImg } = resUser.data.data;

        setUser({ name, email, userId });

        const finalProfileImg = profileImg || profileImageDefault;
        setProfileImage(finalProfileImg);

        // ✅ localStorage에도 저장 → Header 동기화
        localStorage.setItem("userProfile", finalProfileImg);

        // 북마크 가져오기
        const resBookmark = await axios.get(
          `http://localhost:8080/bookmark/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const bookmarksArray = Array.isArray(resBookmark.data?.data)
          ? resBookmark.data.data
          : [];

        const fullDataPromises = bookmarksArray.map(async (b) => {
          if (!b.estimateId) return null;
          try {
            const eRes = await axios.get(
              `http://localhost:8080/estimate/${b.estimateId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return { ...b, ...(eRes.data?.data || {}), liked: true };
          } catch {
            return { ...b, liked: true };
          }
        });

        const fullData = (await Promise.all(fullDataPromises)).filter(Boolean);

        const formatted = fullData.map((e) => ({
          ...e,
          createdAt: e.createDt
            ? new Date(e.createDt).toISOString().slice(0, 10)
            : "",
        }));

        setBookmarkedEstimates(formatted);
      } catch (err) {
        console.error("사용자/북마크 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [token]);

  // --- 페이지 계산 ---
  useEffect(() => {
    setTotalPages(Math.ceil(bookmarkedEstimates.length / amountPerPage));
  }, [bookmarkedEstimates]);

  if (!user) return <p>Loading...</p>;

  // --- 프로필 이미지 업로드 ---
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setNewProfileImage(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    if (!newProfileImage) return alert("변경할 이미지를 선택해주세요.");

    setIsUploading(true);

    const imageRef = ref(storage, `profile-img/${uuid()}_${newProfileImage.name}`);
    const uploadTask = uploadBytesResumable(imageRef, newProfileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (error) => {
        console.error("업로드 에러:", error);
        alert("이미지 업로드 중 오류 발생");
        setIsUploading(false);
        setProgress(0);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          const res = await changeProfileImg({
            userId: user.userId,
            profileImg: downloadUrl,
          });

          const status = res?.data?.status ?? "failed";
          const message = res?.data?.message ?? "알 수 없는 오류";

          if (status === "success") {
            alert(message);
            setProfileImage(downloadUrl);
            setNewProfileImage(null);

            // ✅ localStorage & 이벤트 발행
            localStorage.setItem("userProfile", downloadUrl);
            window.dispatchEvent(new Event("profileUpdate"));
          } else {
            alert("서버 업데이트 실패: " + message);
          }
        } catch (err) {
          console.error("URL 저장 오류:", err);
          alert("이미지 URL 저장 중 오류 발생");
        } finally {
          setIsUploading(false);
          setProgress(0);
        }
      }
    );
  };

  // --- 북마크 삭제 ---
  const handleDeleteBookmark = async (bookmarkId, estimateId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:8080/bookmark/remove/${bookmarkId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res?.data?.status === "success") {
        const msg = res?.data?.message || "북마크가 해제되었습니다.";
        alert(msg);

        setBookmarkedEstimates((prev) =>
          prev.filter((est) => est.bookmarkId !== bookmarkId)
        );

        const removed = JSON.parse(localStorage.getItem("removedBookmarks") || "[]");
        localStorage.setItem("removedBookmarks", JSON.stringify([...removed, estimateId]));
      } else {
        alert("북마크 처리 실패: " + (res?.data?.message || "알 수 없는 오류"));
      }
    } catch (err) {
      console.error("북마크 삭제 실패:", err);
      alert("북마크 삭제 중 오류 발생");
    }
  };

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        {/* --- 프로필 영역 --- */}
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={profileImage} alt="profileImage" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <div css={s.profileInfoBox}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button type="button" onClick={triggerFileSelect}>
              변경하기
            </button>
            <button type="button" onClick={handleSave}>
              {isUploading ? `${progress}%` : "저장"}
            </button>
          </div>
        </div>

        {/* --- 북마크 리스트 --- */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>찜한 견적</h2>
          <div css={[s.estimateBox, s.estimateBoxScrollbar]}>
            {bookmarkedEstimates
              .slice(currentPage * amountPerPage, (currentPage + 1) * amountPerPage)
              .map((est, idx) => {
                const itemNumber = currentPage * amountPerPage + idx + 1;
                return (
                  <div
                    key={est.bookmarkId}
                    css={s.estimateList}
                    onClick={() => navigate(`/auth/estimate/${est.estimateId}`)}
                  >
                    <span css={s.itemNumber}>{itemNumber}.</span>
                    <div css={s.itemDetails}>
                      <button
                        css={s.offlineBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/maps");
                        }}
                      >
                        오프라인
                      </button>
                      <div css={s.leftSide}>
                        <span>목적: {est.purpose || "정보 없음"}</span>
                        <span>
                          예산: {est.budget ? `${est.budget}원` : "정보 없음"}
                        </span>
                      </div>
                      <span css={s.createdAt}>{est.createdAt}</span>
                    </div>

                    <FaHeart
                      css={s.heartIconBottom}
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBookmark(est.bookmarkId, est.estimateId);
                      }}
                    />
                  </div>
                );
              })}
          </div>

          {/* --- 페이지네이션 --- */}
          <div css={s.pagenateContainer}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i);
                }}
                css={i === currentPage ? s.activePage : null}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
