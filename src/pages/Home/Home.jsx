/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { instance } from "../../apis/utils/instance";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

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

  const handleEnter = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const userMessage = { sender: "user", text: inputValue };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setShowLogo(false);
      setInputMoved(true);

      const gptResponse = await fetchGPTResponse(inputValue);
      const gptMessage = { sender: "gpt", text: gptResponse };
      setMessages((prev) => [...prev, gptMessage]);
    }
  };

  const handleHeartClick = () => {
    setLiked(true);
    setShowModal(true);

    for (let i = 0; i < 3; i++) {
      const id = heartIdRef.current++;
      const randX = Math.round(Math.random() * 40 - 20);
      const randSize = Math.round(10 + Math.random() * 8);
      const delay = i * 120;

      setHearts((prev) => [...prev, { id, delay, dx: `${randX}px`, size: `${randSize}px` }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1400 + delay);
    }
  };

  const handleModalConfirm = async () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }

    try {
      const bookmarkData = {
        title,
        content: messages.map((m) => `${m.sender}: ${m.text}`).join("\n"),
      };
      await instance.post("/bookmark/add", bookmarkData);
      console.log("저장 성공");
    } catch (err) {
      console.error("저장 실패:", err);
    }

    setShowModal(false);
    setLiked(false);
    setTitle("제목 없음");
    setTitleError(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setLiked(false);
    setTitle("제목 없음");
    setTitleError(false);
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
            <div key={idx} css={msg.sender === "user" ? s.userMessage : s.gptMessage}>
              {msg.text}
            </div>
          ))}
        </div>

        {inputMoved && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaHeart
              css={s.heartIconBottom}
              onClick={handleHeartClick}
              color={liked ? "red" : "lightgray"}
            />

            {hearts.map((h) => (
              <FaHeart
                key={h.id}
                css={s.flyingHeart}
                style={{ animationDelay: `${h.delay}ms`, "--size": `${14 + (h.id % 3) * 2}px` }}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div css={s.modalBackdrop}>
          <div css={s.modalContent}>
            <h3>추천을 찜 목록에 저장</h3>
            <input
              placeholder="제목 없음"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError && e.target.value.trim() !== "") setTitleError(false);
              }}
            />
            {titleError && <p style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>제목을 입력해주세요</p>}
            <div css={s.modalButtons}>
              <button onClick={handleModalConfirm}>확인</button>
              <button onClick={handleModalCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
