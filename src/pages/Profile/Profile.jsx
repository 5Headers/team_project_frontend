/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import profileImageDefault from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileImage, setProfileImage] = useState(profileImageDefault);
  const [bookmarkedEstimates, setBookmarkedEstimates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const amountPerPage = 5;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // --- 사용자 정보 및 북마크 조회 ---
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const resUser = await getPrincipalRequest();
        if (resUser.data?.data) {
          const { name, email, userId } = resUser.data.data;
          setUser({ name, email, userId });

          const resBookmark = await axios.get(
            `http://localhost:8080/bookmark/user/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const bookmarksArray = Array.isArray(resBookmark.data?.data)
            ? resBookmark.data.data
            : [];

          // 각 estimateId 상세 데이터 가져오기
          const fullDataPromises = bookmarksArray.map(async (b) => {
            if (!b.estimateId) return null;
            try {
              const eRes = await axios.get(
                `http://localhost:8080/estimate/${b.estimateId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return { ...b, ...(eRes.data?.data || {}), liked: true };
            } catch (err) {
              console.error(`estimateId ${b.estimateId} 호출 실패`, err);
              return { ...b, liked: true };
            }
          });

          const fullData = (await Promise.all(fullDataPromises)).filter(Boolean);

          const formatted = fullData.map((e) => ({
            ...e,
            createdAt: e.createDt ? new Date(e.createDt).toISOString().slice(0, 10) : "",
          }));

          setBookmarkedEstimates(formatted);
          setTotalPages(Math.ceil(formatted.length / amountPerPage));
        }
      } catch (err) {
        console.error("북마크 + 견적 불러오기 실패:", err);
      }
    };

    if (!user) fetchBookmarks();
  }, [token, user]);

  if (!user) return <p>Loading...</p>;

  // --- 이미지 변경 ---
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const triggerFileSelect = () => {
    document.getElementById("fileUpload").click();
  };

  const handleSave = () => {
    if (!profileImage) return alert("이미지를 선택해주세요");
    alert("프로필 이미지가 변경되었습니다.");
  };

  // --- 페이지 변경 ---
  const handlePageChange = (page) => setCurrentPage(page);

  // --- 상세 페이지 이동 ---
  const handleShowParts = (estimateId) =>
    navigate(`/auth/estimate/${estimateId}`);

  // --- 북마크 삭제 + Home 동기화 ---
  const handleDeleteBookmark = async (bookmarkId, estimateId) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/bookmark/remove/${bookmarkId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: {},
        }
      );

      setBookmarkedEstimates((prev) =>
        prev.filter((est) => est.bookmarkId !== bookmarkId)
      );

      // 페이지 재조정
      const remaining = bookmarkedEstimates.length - 1;
      const newTotalPages = Math.ceil(remaining / amountPerPage);
      if (currentPage >= newTotalPages && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setTotalPages(newTotalPages);

      // Home 화면 하트 회색 표시용 removedBookmarks 동기화
      const removedBookmarks = JSON.parse(localStorage.getItem("removedBookmarks") || "[]");
      localStorage.setItem("removedBookmarks", JSON.stringify([...removedBookmarks, estimateId]));
    } catch (err) {
      console.error("북마크 삭제 실패:", err);
    }
  };

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={profileImage} alt="profileImage" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              id="fileUpload"
              style={{ display: "none" }}
            />
          </div>

          <div css={s.profileInfoBox}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={triggerFileSelect}>변경하기</button>
            <button onClick={handleSave}>저장</button>
          </div>
        </div>

        {/* 북마크된 견적 리스트 */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>찜한 견적</h2>
          <div css={[s.estimateBox, s.estimateBoxScrollbar]}>
            {bookmarkedEstimates
              .slice(
                currentPage * amountPerPage,
                (currentPage + 1) * amountPerPage
              )
              .map((est, idx) => {
                const itemNumber = currentPage * amountPerPage + idx + 1;
                return (
                  <div
                    key={est.bookmarkId}
                    css={s.estimateList}
                    onClick={() => handleShowParts(est.estimateId)}
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
