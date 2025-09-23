/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [purpose, setPurpose] = useState(""); // 목적
  const [budget, setBudget] = useState("");   // 예산
  const chatBoxRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const [titleError, setTitleError] = useState(false);


  // GPT 요청 함수 (JSON 반환 요청)
  const fetchGPT = async (purposeMessage, budgetValue) => {

  // GPT 요청 함수
  const fetchGPT = async (message) => {

    try {
      const response = await fetch("http://localhost:8080/chat/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

          purpose: purposeMessage,
          cost: Number(budgetValue) || 0,
          instruction:
            "추천 부품과 가격을 JSON 배열로 반환하세요. 예: { parts: [{name:'CPU', price:250000}, ...] }"

          purpose: message,
          cost: 0,

        }),
      });

      if (!response.ok) throw new Error("서버 오류: " + response.status);

      const data = await response.json();
      return data.data || "응답이 없습니다.";
    } catch (error) {
      console.error(error);
      return "서버 오류가 발생했습니다.";
    }
  };


  // DB 저장
const handleSaveToDB = async (gptText) => {
  try {
    const resp = await fetch("http://localhost:8080/estimate/save-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gptResponse: gptText,
        title: title,
        purpose: purpose,
        budget: Number(budget) || 0,
      }),
    });

    const data = await resp.json();
    console.log("DB 저장 결과:", data);
  } catch (err) {
    console.error("DB 저장 실패", err);
  }
};

  // 자동 스크롤

  // GPT 메시지 + DB 저장
  const handleSaveToDB = async (gptMessage) => {
    try {
      // 1. 부품 데이터 예시 (실제 구현 시 GPT 응답 parsing 필요)
      const parts = [
        {
          category: "CPU",
          name: "Intel i9",
          price: 600000,
          link: "",
          storeType: "online",
        },
        {
          category: "RAM",
          name: "16GB DDR4",
          price: 100000,
          link: "",
          storeType: "online",
        },
      ];

      // 2. DB에 저장 요청
      const resp = await fetch("http://localhost:8080/estimate/save-gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          response: gptMessage,
          title: title,
          budget: 0,
          parts: parts,
        }),
      });

      const data = await resp.json();
      console.log("DB 저장 결과:", data);
    } catch (err) {
      console.error("DB 저장 실패", err);
    }
  };

  // 메시지 추가 시 자동 스크롤

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // 엔터 입력
  const handleEnter = async (e) => {
    if (e.key !== "Enter" || !purpose.trim()) return;

    const userMessage = { sender: "user", text: `목적: ${purpose}, 예산: ${budget}` };
    setMessages((prev) => [...prev, userMessage]);
    setPurpose("");
    setBudget("");
    setShowLogo(false);
    setInputMoved(true);

    // GPT 호출
    const gptResponse = await fetchGPT(userMessage.text, budget);

    const gptMessage = { sender: "gpt", text: gptResponse };
    setMessages((prev) => [...prev, gptMessage]);

    // DB 저장
    await handleSaveToDB(gptResponse);
  };

  // 하트 클릭
  const handleHeartClick = async () => {
    setLiked(true);
    setShowModal(true);

    for (let i = 0; i < 3; i++) {
      const id = heartIdRef.current++;
      setHearts((prev) => [...prev, { id, delay: i * 200 }]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1200 + i * 200);
    }
  };

  // 찜 모달 확인
  const handleModalConfirm = async () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }


    const lastGPTMessage = messages.slice().reverse().find((msg) => msg.sender === "gpt");

    // 마지막 GPT 메시지 가져오기
    const lastGPTMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.sender === "gpt");

    if (lastGPTMessage) {
      await handleSaveToDB(lastGPTMessage.text);
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
          placeholder="원하시는 목적을 입력하세요"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <input
          type="number"
          placeholder="예산을 입력하세요"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
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
              <FaHeart key={h.id} css={s.flyingHeart} style={{ animationDelay: `${h.delay}ms` }} />
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
                if (titleError && e.target.value.trim() !== "")
                  setTitleError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleModalConfirm();
              }}
            />
            {titleError && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.9rem",
                  margin: "4px 0 0 0",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                ⚠️ 제목을 입력해주세요
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