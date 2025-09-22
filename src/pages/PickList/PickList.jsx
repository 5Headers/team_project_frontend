/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import { instance } from "../../apis/utils/instance";

function PickList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const userId = Number(localStorage.getItem("userId"));
        const res = await instance.get(`/bookmark/user/${userId}`);
        setBookmarks(res.data.data || []); // ApiRespDto 안의 data
      } catch (err) {
        console.error("북마크 불러오기 실패:", err);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div css={s.container}>
      {bookmarks.map((b) => (
        <ul key={b.bookmarkId} css={s.ListBox}>
          <li css={s.TitleBox}>
            <div css={s.TitleText}>{b.title}</div>
            <div css={s.ExportText}>{b.content}</div>
            <div css={s.ExportText}>생성일: {b.createDt}</div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default PickList;
