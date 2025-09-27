/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import * as s from "./styles";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const chatBoxRef = useRef(null);
  const heartIdRef = useRef(0);

  // ===================== 상태 관리 =====================
  const [showLogo, setShowLogo] = useState(true);
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [budget, setBudget] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [titleError, setTitleError] = useState(false);
  const [recommendedParts, setRecommendedParts] = useState([]);

  const [hearts, setHearts] = useState([]);

  // 예산 범위 동의 모달
  const [showBudgetConsent, setShowBudgetConsent] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [pendingPurpose, setPendingPurpose] = useState("");

  // 입력창 표시 여부
  const [inputVisible, setInputVisible] = useState(true);

  // ===================== 채팅 스크롤 =====================
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // ===================== GPT 요청 =====================
  const fetchGPT = async (purposeValue, budgetValue) => {
    try {
      const response = await fetch("http://localhost:8080/chat/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          purpose: purposeValue,
          cost: budgetValue,
          instruction:
            "추천 부품과 가격, 링크를 JSON 배열로 반환하세요. 예: { parts: [{name:'CPU', price:250000, link:'http://...'}, ...] }",
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

  // ===================== 메시지 전송 =====================
  const sendMessage = async () => {
    const finalPurpose = isCustom ? customPurpose : purpose;
    if (!finalPurpose.trim()) return;

    const rawBudget = Number(budget.replace(/,/g, "")) || 0;

    // 유저 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: `목적: ${finalPurpose}, 예산: ${
          budget ? `${budget}만원` : "미입력"
        }`,
      },
    ]);

    setPurpose("");
    setCustomPurpose("");
    setIsCustom(false);
    setShowLogo(false);
    setInputMoved(true);
    setInputVisible(false);

    // 예산 단위 체크
    if (rawBudget < 1 || rawBudget > 9999) {
      setMessages((prev) => [
        ...prev,
        { sender: "gpt", text: "😅 예산 단위를 확인해주세요!" },
      ]);
      setInputVisible(true);
      return;
    }

    // 예산 범위 동의 체크
    if (rawBudget < 40 || rawBudget > 300) {
      setPendingBudget(rawBudget);
      setPendingPurpose(finalPurpose);
      setShowBudgetConsent(true);
      return;
    }

    // GPT 호출
    setIsTyping(true);
    const gptResponse = await fetchGPT(finalPurpose, rawBudget * 10000);
    setIsTyping(false);
    setRecommendedParts(gptResponse.parts || gptResponse);

    setMessages((prev) => [
      ...prev,
      {
        sender: "gpt",
        text: `${gptResponse}\n구매를 추천할 수 있습니다. 구매하시겠습니까?`,
        nextStep: "askPurchase",
      },
    ]);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // ===================== 예산 범위 모달 =====================
  const handleBudgetConsentConfirm = async () => {
    setShowBudgetConsent(false);
    if (!pendingPurpose) return;

    setIsTyping(true);
    const gptResponse = await fetchGPT(pendingPurpose, pendingBudget * 10000);
    setIsTyping(false);

    setRecommendedParts(gptResponse.parts || gptResponse);

    setMessages((prev) => [
      ...prev,
      {
        sender: "gpt",
        text: `${gptResponse}\n구매를 추천할 수 있습니다. 구매하시겠습니까?`,
        nextStep: "askPurchase",
      },
    ]);

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
    setInputVisible(true);
  };

  // ===================== 구매 여부/방법 =====================
  const handlePurchaseYes = (msgIdx) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, nextStep: null } : m))
    );
    setInputVisible(false);
    setMessages((prev) => [
      ...prev,
      {
        sender: "gpt",
        text: "온라인으로 구매하시겠습니까? 오프라인으로 구매하시겠습니까?",
        nextStep: "askMethod",
      },
    ]);
  };

  const handlePurchaseNo = (msgIdx) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, nextStep: null } : m))
    );
    setInputVisible(true);
    setMessages((prev) => [
      ...prev,
      { sender: "gpt", text: "NuroPC를 이용해주셔서 감사합니다." },
    ]);
  };

  const handlePurchaseMethod = (method) => {
    if (method === "online") {
      navigate("/onlineshopping", { state: { parts: recommendedParts } });
    } else {
      navigate("/offlineshopping");
    }
  };

  // ===================== 하트/찜 모달 =====================
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

  const handleModalConfirm = () => {
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

  // ===================== 렌더 =====================
  return (
    <div css={s.container}>
      {/* 로고 */}
      {showLogo && <h2 css={s.logo}>NuroPC</h2>}

      {/* 입력 영역 */}
      {inputVisible && !isTyping && (
        <div css={s.splitInputWrapper}>
          <IoSearchCircleSharp onClick={sendMessage} />
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
              placeholder="예산 입력 (단위: 만원)"
              value={budget.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(rawValue)) setBudget(rawValue);
              }}
              onKeyDown={handleEnter}
              css={s.budgetInput}
            />
            <span style={{ marginLeft: "8px", color: "#aaa" }}>만원</span>
          </div>
        </div>
      )}

      {/* 채팅 영역 */}
      <div css={s.chatBoxWrapper}>
        <div css={s.chatBox} ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              css={msg.sender === "user" ? s.userMessage : s.gptMessage}
            >
              {msg.text}
              {msg.nextStep === "askPurchase" && (
                <div css={s.gptButtonGroup}>
                  <button
                    css={s.gptChatButton}
                    onClick={() => handlePurchaseYes(idx)}
                  >
                    예
                  </button>
                  <button
                    css={s.gptChatButton}
                    onClick={() => handlePurchaseNo(idx)}
                  >
                    아니요
                  </button>
                </div>
              )}
              {msg.nextStep === "askMethod" && (
                <div css={s.gptButtonGroup}>
                  <button
                    css={s.gptMethodButton}
                    onClick={() => handlePurchaseMethod("online", idx)}
                  >
                    온라인
                  </button>
                  <button
                    css={s.gptMethodButton}
                    onClick={() => handlePurchaseMethod("offline", idx)}
                  >
                    오프라인
                  </button>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div css={s.gptMessage}>
              NuroPc가 알아보는 중
              <span css={s.jumpingDots}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 하트 영역 */}
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

      {/* 찜 모달 */}
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

      {/* 예산 범위 동의 모달 */}
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
