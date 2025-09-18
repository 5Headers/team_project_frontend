/** @jsxImportSource @emotion/react */ 
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef(null);
  const [liked, setLiked] = useState(false); // 찜 상태
  const navigate = useNavigate();

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleEnter = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const userMessage = { sender: "user", text: inputValue };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setShowLogo(false);   // 엔터 후 h2 제거
      setInputMoved(true);  // input 상단으로 이동

      // GPT 호출
      const gptResponse = await fetchGPTResponse(inputValue);
      const gptMessage = { sender: "gpt", text: gptResponse };
      setMessages((prev) => [...prev, gptMessage]);
    }
  };

  const fetchGPTResponse = async (message) => {
    try {
      const res = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.reply || "응답이 없습니다.";
    } catch (err) {
      console.error(err);
      return "서버 오류가 발생했습니다.";
    }
  };

  // FaHeart 클릭 시 제목 입력 받고 PickList로 이동
  const handleLike = () => {
    setLiked(!liked);

    if (!liked) {
      // 제목 입력 창 (기본 "제목 없음")
      const title = prompt("제목을 입력하세요.", "제목 없음") || "제목 없음";

      const item = {
        id: Date.now(),
        title,
        content: messages.map((m) => m.text).join("\n"),
        img: "이미지", // 나중에 GPT 이미지 들어올 자리
      };

      // PickList로 이동 + state 전달
      navigate("/picklist", { state: { newItem: item } });
    }
  };

  return (
    <div css={s.container}>
      {showLogo && <h2 css={s.logo}>NuroPC</h2>}

      <div css={s.search(inputMoved)}>
        <input
          type="text"
          placeholder="원하시는 금액 및 사양을 적어주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>

      <div css={s.chatBoxWrapper}>
        <div css={s.chatBox} ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              css={msg.sender === "user" ? s.userMessage : s.gptMessage}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {inputMoved && (
          <FaHeart
            css={s.heartIconBottom}
            onClick={handleLike}
            color={liked ? "red" : "lightgray"}
          />
        )}
      </div>
    </div>
  );
}
