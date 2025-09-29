/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles"; // Profile에서 쓰던 스타일 그대로 사용
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getPrincipalRequest } from "../../apis/auth/authApi";

const ITEMS_PER_PAGE = 5;

function PickList() {
  const [user, setUser] = useState(null);
  const [estimates, setEstimates] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndEstimates = async () => {
      try {
        const res = await getPrincipalRequest();
        if (res.data?.data) {
          const { userId } = res.data.data;
          setUser(res.data.data);

          const resEst = await fetch(`http://localhost:8080/estimate/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const resJson = await resEst.json();
          const estimatesArray = Array.isArray(resJson)
            ? resJson
            : resJson.data && Array.isArray(resJson.data)
            ? resJson.data
            : [];

          const formatted = estimatesArray.map((e) => ({
            ...e,
            createdAt: e.createdAt ? new Date(e.createdAt).toISOString().slice(0, 10) : "",
          }));

          setEstimates(formatted);
        }
      } catch (err) {
        console.error("사용자/견적 가져오기 실패:", err);
      }
    };
    fetchUserAndEstimates();
  }, [token]);

  const totalPages = Math.ceil(estimates.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  const handleDelete = async (estimateId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await fetch(`http://localhost:8080/estimate/remove/${estimateId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = estimates.filter((e) => e.estimateId !== estimateId);
      setEstimates(updated);
      setCurrentPage(0);
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleShowParts = (estimateId) => navigate(`/auth/estimate/${estimateId}`);

  if (!user) return <p>Loading...</p>;

  return (
    <div css={s.container}>
      <h2 css={s.estimateTitle}>견적 기록</h2>
      <div css={[s.estimateBox, s.estimateBoxScrollbar]}>
        {estimates
          .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
          .map((est, idx) => (
            <div
              key={est.estimateId}
              css={s.estimateList}
              onClick={() => handleShowParts(est.estimateId)}
            >
              <span css={s.itemNumber}>{currentPage * ITEMS_PER_PAGE + idx + 1}.</span>
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
          ))}
      </div>

      <div css={s.pagenateContainer}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          이전
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            css={i === currentPage ? s.activePage : {}}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default PickList;

