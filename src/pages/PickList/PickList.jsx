/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import * as s from "./styles";
import { instance } from "../../apis/utils/instance";

function PickList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await instance.get("/bookmark/user/1"); // userId는 예시
        setBookmarks(res.data);
      } catch (err) {
        console.error("북마크 불러오기 실패:", err);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div css={s.container}>
      {bookmarks.map((b) => (
        <ul key={b.id} css={s.ListBox}>
          <li css={s.ImgBox}>{b.img || "이미지 없음"}</li>
          <li css={s.TitleBox}>
            <div css={s.TitleText}>{b.title}</div>
            <div css={s.ExportText}>{b.content}</div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default PickList;
