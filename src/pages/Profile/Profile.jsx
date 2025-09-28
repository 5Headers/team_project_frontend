/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import profileImageDefault from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";
import { MdDelete } from "react-icons/md";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [profileImage, setProfileImage] = useState(profileImageDefault);
  const [estimates, setEstimates] = useState([]);
  const amountPerPage = 5;
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem("accessToken");

  // --- 사용자 정보 및 초기 견적 로드 ---
  useEffect(() => {
    let isFirstLoad = true;

    const fetchUserAndEstimates = async () => {
      try {
        const res = await getPrincipalRequest();
        if (res.data && res.data.data) {
          const { name, email, userId } = res.data.data;
          setUser({ name, email, userId });

          // 견적 데이터 가져오기
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

          setEstimates((prev) => {
            // 첫 로드 시 중복 누적 방지
            let combined = isFirstLoad ? formatted : [...formatted, ...prev];

            // estimateId 기준으로 중복 제거
            const unique = combined.filter(
              (v, i, a) =>
                a.findIndex((e) => e.estimateId === v.estimateId) === i
            );

            setTotalPages(Math.ceil(unique.length / amountPerPage));
            isFirstLoad = false; // 첫 로드 완료
            return unique;
          });

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

      setEstimates((prev) => {
        const updated = prev.filter((e) => e.estimateId !== estimateId);
        setTotalPages(Math.ceil(updated.length / amountPerPage));
        return updated;
      });
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  // --- 상세 부품 조회 ---
  const handleShowParts = async (estimateId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/estimate-part/list/${estimateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const sorted = data.sort((a, b) => a.price - b.price);
      const partText = sorted
        .map(
          (part) =>
            `${part.category} - ${part.name} (${part.price?.toLocaleString()}원)`
        )
        .join("\n");

      alert(`견적 상세 부품:\n\n${partText}`);
    } catch (err) {
      console.error("부품 불러오기 실패:", err);
      alert("부품 데이터를 불러오는데 실패했습니다.");
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

        {/* ===== 견적 리스트 ===== */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>나의 견적</h2>
          <div css={s.estimateBox}>
            <ul css={s.estimateList}>
              {estimates
                .slice(
                  currentPage * amountPerPage,
                  (currentPage + 1) * amountPerPage
                )
                .map((est, index) => {
                  const itemNumber = currentPage * amountPerPage + index + 1;
                  return (
                    <li
                      key={est.estimateId}
                      css={s.estimateItem}
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
                    </li>
                  );
                })}
            </ul>
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

