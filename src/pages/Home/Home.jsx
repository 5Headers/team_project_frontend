/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import * as s from "./styles";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [showChatBox, setShowChatBox] = useState(false);
  const [inputMoved, setInputMoved] = useState(false);
  const chatBoxRef = useRef(null);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.value = "";
      setShowLogo(false); // h2 사라짐
      setShowChatBox(true); // chatBox 생성
      setInputMoved(true); // input 살짝 아래로 이동

      setTimeout(() => {
        chatBoxRef.current?.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div css={s.container}>
      {showLogo && <h2 css={s.logo}>컴퓨터 장비 추천</h2>}

      <div css={s.chatBoxWrapper}>
        {showChatBox && <div css={s.chatBox} ref={chatBoxRef}></div>}
      </div>

      <div css={s.search(inputMoved)}>
        <input
          type="text"
          placeholder="원하시는 금액 및 사양을 적어주세요"
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  );
}
