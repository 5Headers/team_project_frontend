/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

// 임시 데이터 (나중에 DB 연동)
const mockData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `제목 ${i + 1}`,
  content: `내용 ${i + 1}`,
  img: `이미지 ${i + 1}`,
}));

const ITEMS_PER_PAGE = 5; // 한 페이지당 표시 항목 수

function PickList() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = mockData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div css={s.container}>
      {currentItems.map((item) => (
        <ul key={item.id} css={s.ListBox}>
          <li css={s.ImgBox}>{item.img}</li>
          <li css={s.TitleBox}>
            <div css={s.TitleText}>{item.title}</div>
            <div css={s.ExportText}>{item.content}</div>
          </li>
        </ul>
      ))}

      {/* 페이지네이션 */}
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
