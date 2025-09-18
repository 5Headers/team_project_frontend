/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as s from "./styles";

const ITEMS_PER_PAGE = 5;

// 초기 mock 데이터
const initialData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `제목 ${i + 1}`,
  content: `내용 ${i + 1}`,
  img: "이미지",
}));

function PickList() {
  const location = useLocation();
  const [items, setItems] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  // Home에서 전달된 newItem 추가
  useEffect(() => {
    if (location.state?.newItem) {
      setItems((prev) => [location.state.newItem, ...prev]);
      setCurrentPage(1);
    }
  }, [location.state]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
