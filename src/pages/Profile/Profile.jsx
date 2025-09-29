/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import profileImageDefault from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileImage, setProfileImage] = useState(profileImageDefault);
  const [estimates, setEstimates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const amountPerPage = 5;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // --- 사용자 정보 및 견적 조회 ---
  useEffect(() => {
    const fetchUserAndEstimates = async () => {
      try {
        const res = await getPrincipalRequest();
        if (res.data?.data) {
          const { name, email, userId } = res.data.data;
          setUser({ name, email, userId });

          const resEst = await fetch(
            `http://localhost:8080/estimate/user/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const resJson = await resEst.json();
          const estimatesArray = Array.isArray(resJson)
            ? resJson
            : resJson.data && Array.isArray(resJson.data)
            ? resJson.data
            : [];

          const formatted = estimatesArray.map((e) => ({
            ...e,
            createdAt: e.createdAt
              ? new Date(e.createdAt).toISOString().slice(0, 10)
              : "",
          }));

          setEstimates(formatted);
          setTotalPages(Math.ceil(formatted.length / amountPerPage));
        }
      } catch (err) {
        console.error("사용자/견적 가져오기 실패:", err);
      }
    };
    fetchUserAndEstimates();
  }, [token]);

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- 견적 삭제 ---
  const handleDelete = async (estimateId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await fetch(`http://localhost:8080/estimate/remove/${estimateId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = estimates.filter((e) => e.estimateId !== estimateId);
      setEstimates(updated);
      setTotalPages(Math.ceil(updated.length / amountPerPage));
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
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

        {/* 견적 리스트 */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>나의 견적</h2>
          <div css={[s.estimateBox, s.estimateBoxScrollbar]}>
            {estimates
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
                    <button
                      css={s.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(est.estimateId);
                      }}
                    >
                      <MdDelete size={30} />
                    </button>
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

