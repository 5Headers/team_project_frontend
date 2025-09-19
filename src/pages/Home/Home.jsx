/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { Navigate } from "react-router-dom";

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

  // -------------------------
  // GPT 요청 함수
  async function fetchGPT(purpose, cost) {
    try {
      const response = await fetch("http://localhost:8080/chat/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purpose, cost }),
      });

      if (!response.ok) {
        throw new Error("서버 오류: " + response.status);
      }

      const data = await response.json();
      return data.data || "GPT 응답이 없습니다.";
    } catch (error) {
      console.error(error);
  const [liked, setLiked] = useState(false); // 찜 상태

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
      setShowLogo(false); // 엔터 후 h2 제거
      setInputMoved(true); // input 상단으로 이동

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
  }
  // -------------------------

  // 메시지 파싱 (예: "게임 1000000")
  const parseMessage = (message) => {
    const parts = message.trim().split(" ");
    const purpose = parts[0] || "일반용";
    const cost = parseInt(parts[1]) || 100000;
    return { purpose, cost };
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const userMessage = { sender: "user", text: inputValue };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setShowLogo(false);
      setInputMoved(true);

      const { purpose, cost } = parseMessage(inputValue);
      const gptResponse = await fetchGPT(purpose, cost);

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
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1200 + i * 200);
    }
  };

  const handleModalConfirm = () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }
    console.log("저장 제목:", title);
    setShowModal(false);
    setLiked(false);
    setTitle("제목 없음");
    setTitleError(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setLiked(false);
    setTitle("제목 없음");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);


  return (
    <div css={s.container}>
      {/* h2는 엔터 전만 표시 */}
      {showLogo && <h2 css={s.logo}>NuroPC</h2>}

      {/* input */}
      <div css={s.search(inputMoved)}>
        <input
          type="text"
          placeholder="원하시는 금액 및 사양을 적어주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>

      {/* chatBox */}
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

        {/* chatBox 오른쪽 아래 독립 하트 */}
        {inputMoved && (
          <FaHeart
            css={s.heartIconBottom}
            onClick={() => setLiked(!liked)}
            color={liked ? "red" : "lightgray"}
          />
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
                  setTitleError(false);
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
