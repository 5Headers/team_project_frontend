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

  const token = localStorage.getItem("accessToken");

  // === 독자적인 예산 동의 모달 상태 ===
  const [showBudgetConsent, setShowBudgetConsent] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [pendingPurpose, setPendingPurpose] = useState("");

  const fetchGPT = async (purposeMessage, budgetValue) => {
    try {
      const response = await fetch("http://localhost:8080/chat/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          purpose: purposeMessage,
          cost: budgetValue,
          instruction:
            "추천 부품과 가격을 JSON 배열로 반환하세요. 예: { parts: [{name:'CPU', price:250000}, ...] }",
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

  const handleSaveToDB = async (gptText) => {
    try {
      const rawBudget = Number(budget.replace(/,/g, "")) || 0;
      const budgetInWon = rawBudget * 10000;

      const resp = await fetch("http://localhost:8080/estimate/save-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gptResponse: gptText,
          title,
          purpose: isCustom ? customPurpose : purpose,
          budget: budgetInWon,
          budgetUnit: "원",
        }),
      });
      const data = await resp.json();
      console.log("DB 저장 결과:", data);
    } catch (err) {
      console.error("DB 저장 실패", err);
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

    const rawBudget = Number(budget.replace(/,/g, "")) || 0;

    const userMessage = {
      sender: "user",

      text: `목적: ${finalPurpose}, 예산: ${budget}${budgetUnit}`,

      text: `목적: ${finalPurpose}, 예산: ${
        budget ? `${budget}만원` : "미입력"
      }`,

    };

    setMessages((prev) => [...prev, userMessage]);
    setPurpose("");
    setCustomPurpose("");
    setIsCustom(false);
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
    // === 기존 터무니없는 예산 처리 코드 유지 ===
    if (rawBudget < 1) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "gpt",
          text: "😅 예산의 단위가 이상해요! 1원 이상 입력해주세요!",
        },
      ]);
      return;
    } else if (rawBudget > 9999) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "gpt",
          text: "😅 예산의 단위가 이상해요! 단위를 확인하고 다시 입력해주세요!.",
        },
      ]);
      return;
    }
    // === 추가: 독립적 예산 범위 확인 ===
    if (rawBudget < 40 || rawBudget > 300) {
      // 40 ~ 300만원 밖이면 동의 모달 띄움
      setPendingBudget(rawBudget);
      setPendingPurpose(finalPurpose);
      setShowBudgetConsent(true);
      return;
    }

    // === 정상 범위 ===
    setIsTyping(true);
    const budgetInWon = rawBudget * 10000;
    const gptResponse = await fetchGPT(userMessage.text, budgetInWon);
    setIsTyping(false);

    setMessages((prev) => [...prev, { sender: "gpt", text: gptResponse }]);
    await handleSaveToDB(gptResponse);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };
  // === 예산 동의 모달 확인 / 취소 ===
  const handleBudgetConsentConfirm = async () => {
    setShowBudgetConsent(false);
    if (!pendingPurpose) return;

    const userMessage = {
      sender: "user",
      text: `목적: ${pendingPurpose}, 예산: ${pendingBudget}만원`,
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    const gptResponse = await fetchGPT(
      userMessage.text,
      pendingBudget * 10000
    );
    setIsTyping(false);

    setMessages((prev) => [...prev, { sender: "gpt", text: gptResponse }]);
    await handleSaveToDB(gptResponse);

    setPendingBudget(0);
    setPendingPurpose("");
  };

  const handleBudgetConsentCancel = () => {
    setShowBudgetConsent(false);
    setPendingBudget(0);
    setPendingPurpose("");
    setMessages((prev) => [
      ...prev,
      { sender: "gpt", text: "❌ 추천이 취소되었습니다." },
    ]);
  };

  // === 이하 기존 하트 / 저장 모달 유지 ===
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

    const lastGPTMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.sender === "gpt");
    if (lastGPTMessage) await handleSaveToDB(lastGPTMessage.text);

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
            onKeyDown={handleEnter}
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

            placeholder="예산 입력 (단위: 만원)"
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

          <span style={{ marginLeft: "8px", color: "#aaa" }}>만원</span>
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

      {/* 일반 찜 모달 */}
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

      {/* 독자적 예산 범위 동의 모달 */}
      {showBudgetConsent && (
        <div css={s.modalBackdrop}>
          <div css={s.modalContent}>
            <h3>⚠️ 이 값은 추천 범위를 벗어났습니다.</h3>
            <p>그래도 진행하시겠습니까?</p>
            <div css={s.modalButtons}>
              <button onClick={handleBudgetConsentConfirm}>동의</button>
              <button onClick={handleBudgetConsentCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}