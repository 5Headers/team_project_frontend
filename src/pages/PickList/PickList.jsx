/** @jsxImportSource @emotion/react */
import  React, { useState, useEffect } from "react";
import * as s from "./styles";

// JWT 토큰에서 payload 추출 함수
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

const ITEMS_PER_PAGE = 5;

function PickList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  // 북마크 불러오기
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // localStorage에서 JWT 가져오기
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("로그인 필요");

        const payload = parseJwt(token);
        const userId = payload?.jti;
        if (!userId) throw new Error("유효하지 않은 토큰");

        const resp = await fetch(`http://localhost:8080/bookmark/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) throw new Error("북마크 불러오기 실패");
        // const data = await resp.json();
        const data = await resp.json();
        console.log("찜 목록 응답:", data); // ← 추가!
        setBookmarks(Array.isArray(data) ? data : []); // ← 수정!
      } catch (err) {
        console.error("북마크 불러오기 실패:", err);
      }
    };

    fetchBookmarks();
  }, []);

  // 찜 추가 영역
  const newBookmark = async (estimateId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("로그인 필요");
      const payload = parseJwt(token);
      const userId = payload?.jti;
      if (!userId) throw new Error("유효하지 않은 토큰");

      const resp = await fetch("http://localhost:8080/bookmark/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, estimateId }),
        // body: JSON.stringify({ estimateId }),
      });

      if (!resp.ok) throw new Error("찜 추가 실패");

      // const newBookmark = await resp.json();
      const newBookmark = await resp.json();
      // setBookmarks((prev) => [...prev, newBookmark]);
      setBookmarks((prev) => [...prev, newBookmark]);
    } catch (err) {
      console.error("찜 추가 실패:", err);
    }
  };

// const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : [];
// const totalPages = Math.ceil(safeBookmarks.length / ITEMS_PER_PAGE);
// const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
// const currentItems = safeBookmarks.slice(startIndex, startIndex + ITEMS_PER_PAGE);


const safeBookmarks = Array.isArray(bookmarks) ? bookmarks : [];const totalPages = Math.ceil(safeBookmarks.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const currentItems = safeBookmarks.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div css={s.container}>
      {currentItems.map((item) => (
        <ul key={item.bookmarkId} css={s.ListBox}>
          <li css={s.ImgBox}>🖥</li>
          <li css={s.TitleBox}>
            <div css={s.TitleText}>{item.title || "제목 없음"}</div>
            <div css={s.ExportText}>{item.content || "내용 없음"}</div>
          </li>
        </ul>
      ))}

      <div css={s.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx + 1)}
            css={currentPage === idx + 1 ? s.activePage : {}}
          >
            {idx + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default PickList;