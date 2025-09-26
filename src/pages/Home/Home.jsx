/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import { FaHeart } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [budget, setBudget] = useState("");
  const [budgetUnit, setBudgetUnit] = useState("만원");
  const [isTyping, setIsTyping] = useState(false);

  const chatBoxRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);
  const [titleError, setTitleError] = useState(false);

  const token = localStorage.getItem("accessToken");

  // ✅ 단위 변환 함수
  const convertToWon = (value, unit) => {
    let num = Number(value.replace(/,/g, "")) || 0;
    switch (unit) {
      case "억":
        return num * 100000000;
      case "만원":
        return num * 10000;
      case "천원":
        return num * 1000;
      case "원":
      default:
        return num;
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const finalPurpose = isCustom ? customPurpose : purpose;
    if (!finalPurpose.trim()) return;

    const userMessage = {
      sender: "user",
      text: `목적: ${finalPurpose}, 예산: ${budget}${budgetUnit}`,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPurpose("");
    setCustomPurpose("");
    setIsCustom(false);
    setBudget("");
    setShowLogo(false);
    setInputMoved(true);

    setIsTyping(true);

    try {
      // ✅ 단위 변환 적용
      const costInWon = convertToWon(budget, budgetUnit);

      const response = await fetch("http://localhost:8080/estimate/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          purpose: finalPurpose,
          cost: costInWon,
        }),
      });

      if (!response.ok) throw new Error("서버 오류: " + response.status);

      const data = await response.json();
      const gptResponse = data.data || "응답이 없습니다.";

      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "gpt", text: gptResponse }]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "gpt", text: "서버 오류가 발생했습니다." },
      ]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleHeartClick = (e) => {
    setLiked(true);
    setShowModal(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    for (let i = 0; i < 3; i++) {
      const id = heartIdRef.current++;
      const size = 14 + Math.round(Math.random() * 6);
      const dx = Math.round(Math.random() * 40 - 20);

      setHearts((prev) => [
        ...prev,
        { id, x: startX, y: startY, delay: i * 200, size, dx },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1600 + i * 200);
    }
  };

  const handleIconClick = sendMessage;

  const handleModalConfirm = async () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
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

      <div css={s.splitInputWrapper}>
        <IoSearchCircleSharp onClick={handleIconClick} />

        {!isCustom ? (
          <select
            css={s.splitInput}
            value={purpose}
            onChange={(e) => {
              if (e.target.value === "직접 입력") {
                setIsCustom(true);
                setPurpose("");
              } else setPurpose(e.target.value);
            }}
          >
            <option value="">목적 선택</option>
            <option value="사무용">사무용</option>
            <option value="게임용">게임용</option>
            <option value="프로그래밍용">프로그래밍용</option>
            <option value="영상편집용">영상편집용</option>
            <option value="직접 입력">직접 입력</option>
          </select>
        ) : (
          <div css={s.customPurposeWrapper}>
            <input
              type="text"
              css={s.splitInput}
              placeholder="목적 입력"
              value={customPurpose}
              onChange={(e) => setCustomPurpose(e.target.value)}
              onKeyDown={handleEnter}
            />
            <span
              css={s.clearX}
              onClick={() => {
                setIsCustom(false);
                setCustomPurpose("");
              }}
            >
              ×
            </span>
          </div>
        )}

        <div css={s.budgetWrapper}>
          <input
            type="text"
            placeholder="예산 입력"
            value={budget.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(rawValue)) setBudget(rawValue);
            }}
            onKeyDown={handleEnter}
            css={s.budgetInput}
          />
          <select
            value={budgetUnit}
            onChange={(e) => setBudgetUnit(e.target.value)}
            css={s.budgetUnitSelect}
          >
            <option value="억">억</option>
            <option value="만원">만원</option>
            <option value="천원">천원</option>
            <option value="원">원</option>
          </select>
        </div>
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

          {isTyping && (
            <div css={s.gptMessage}>
              GPT가 입력 중
              <span css={s.jumpingDots}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          )}
        </div>

        {inputMoved && (
          <div css={s.heartWrapper}>
            <FaHeart
              css={s.heartIconBottom}
              onClick={handleHeartClick}
              color={liked ? "red" : "lightgray"}
            />
            {hearts.map((h) => (
              <FaHeart
                key={h.id}
                css={s.flyingHeart}
                style={{
                  "--size": `${h.size}px`,
                  "--dx": `${h.dx}px`,
                  "--x": `${h.x}px`,
                  "--y": `${h.y}px`,
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
                  marginTop: "4px",
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  animation: "shake 0.3s ease-in-out",
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
