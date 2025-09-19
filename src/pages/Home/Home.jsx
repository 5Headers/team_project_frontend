/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef(null);
  const [liked, setLiked] = useState(false);


  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [hearts, setHearts] = useState([]); // 화면에 떠오르는 하트 리스트
  const heartIdRef = useRef(0);
  const [titleError, setTitleError] = useState(false);

  const handleModalConfirm = () => {
    if (title.trim() === "") {
      // 빈 문자열 체크
      setTitleError(true);
      return;
    }
    console.log("저장 제목:", title);
    setShowModal(false);
    setLiked(false); // 확인 후 하트 회색
    setTitle("제목 없음");
    setTitleError(false);
  };


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  const parseMessage = (message) => {
    const parts = message.trim().split(" ");
    const purpose = parts[0] || "일반용";
    const cost = parseInt(parts[1]) || 100000;
    return { purpose, cost };

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

  const fetchGPTResponse = async (message) => {
    try {
      const { purpose, cost } = parseMessage(message);

      const res = await fetch(`http://localhost:8080/chat/estimate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purpose, cost }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`서버 오류: ${text}`);
      }

      const data = await res.json();
      return data.data || "GPT 응답이 없습니다.";
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

    // 하트 3개 애니메이션
    for (let i = 0; i < 3; i++) {
      const id = heartIdRef.current++;
      setHearts((prev) => [...prev, { id, delay: i * 200 }]);
      // 일정 시간 후 제거
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1200 + i * 200);
    }
  };



  const handleModalCancel = () => {
    setShowModal(false);
    setLiked(false);
    setTitle("제목 없음");
  };


  return (
    <div css={s.container}>
      {showLogo && <h2 css={s.logo}>NuroPC</h2>}

      <div css={s.search(inputMoved)}>
        <input
          type="text"
          placeholder="예: 게임 1000000"
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
          <div style={{ position: "relative" }}>
            <FaHeart
              css={s.heartIconBottom}
              onClick={handleHeartClick}
              color={liked ? "red" : "lightgray"}
            />
            {hearts.map((h) => (
              <FaHeart
                key={h.id}
                style={{
                  position: "absolute",
                  bottom: 30,
                  right: 0,
                  color: "red",
                  fontSize: 20,
                  animation: `heartMove 1s ease-out forwards`,
                  animationDelay: `${h.delay}ms`,
                }}
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
                if (titleError && e.target.value.trim() !== "") {
                  setTitleError(false); // 입력하면 에러 해제
                }
              }}
            />
            {titleError && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  margin: "4px 0 0 0",
                }}
              >
                제목을 입력해주세요
              </p>
            )}
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
//하트 애니 수정