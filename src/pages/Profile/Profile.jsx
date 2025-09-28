/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import profileImage from "../../assets/기본프로필.png";
import { getPrincipalRequest } from "../../apis/auth/authApi";

function Profile() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const amountPerPage = 5; // 한 페이지에 표시될 항목 수

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getPrincipalRequest();
        if (res.data && res.data.data) {
          const { name, email, userId } = res.data.data;
          setUser({ name, email, userId });
        }
      } catch (err) {
        console.error("사용자 정보 가져오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div css={s.container}>
      {/* 프로필 섹션 */}
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={profileImage} alt="profileImage" />
            </div>
          </div>
          <div css={s.profileInfoBox}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button>변경하기</button>
          </div>
        </div>

        {/* ===== 견적 리스트 컨테이너 ===== */}
        <div css={s.estimateContainer}>
          <h2 css={s.estimateTitle}>나의 견적</h2>
          <div css={s.estimateBox}>
            <ul css={s.estimateList}>
              {Array.from({ length: amountPerPage }).map((_, index) => {
                const itemNumber = currentPage * amountPerPage + index + 1;
                return (
                  <li key={index} css={s.estimateItem}>
                    <span css={s.itemNumber}>{itemNumber}.</span>
                    <strong css={s.itemName}>견적 목적</strong>
                    <button css={s.deleteBtn}>삭제</button>
                  </li>
                );
              })}
            </ul>
          </div>

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
            {Array.from({ length: 5 }).map((_, i) => (
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
                handlePageChange(currentPage + 1);
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
