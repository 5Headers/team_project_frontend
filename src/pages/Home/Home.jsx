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

  const createMessage = ({
    sender,
    text,
    nextStep = null,
    estimateId = null,
    liked = false,
  }) => ({
    id: Date.now() + Math.random(),
    sender,
    text,
    nextStep,
    estimateId,
    liked,
  });

  // ====== 상태 초기화 (로컬스토리지 우선) ======
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("gptMessages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [recommendedParts, setRecommendedParts] = useState(() => {
    const saved = localStorage.getItem("recommendedParts");
    return saved ? JSON.parse(saved) : [];
  });
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [budget, setBudget] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBudgetConsent, setShowBudgetConsent] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [pendingPurpose, setPendingPurpose] = useState("");
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [hasThanked, setHasThanked] = useState(false);

  // ====== 채팅 초기화 (화면만 초기화, 로컬스토리지 유지) ======
  const resetChat = () => {
    setMessages([]);
    setRecommendedParts([]);
    setPurpose("");
    setCustomPurpose("");
    setBudget("");
    setIsCustom(false);
    setPendingBudget(0);
    setPendingPurpose("");
    setHasThanked(false);
    setShowBudgetConsent(false);
    // localStorage는 지우지 않음 → 새로고침/뒤로가기 후 유지
  };

  // ====== 로컬 저장 ======
  useEffect(() => {
    localStorage.setItem("gptMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("recommendedParts", JSON.stringify(recommendedParts));
  }, [recommendedParts]);

  // ====== Profile 삭제 북마크 동기화 ======
  useEffect(() => {
    const removed = JSON.parse(
      localStorage.getItem("removedBookmarks") || "[]"
    );
    if (removed.length > 0) {
      setMessages((prev) =>
        prev.map((m) =>
          m.estimateId && removed.includes(m.estimateId)
            ? { ...m, liked: false }
            : m
        )
      );
    }
  }, []);

  // ====== 스크롤 ======
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // ====== GPT 요청 ======
  const fetchGPT = async (purposeValue, budgetValue) => {
    try {
      const response = await fetch("http://localhost:8080/estimate/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          purpose: purposeValue,
          cost: budgetValue,
          title: "제목 없음",
        }),
      });
      if (!response.ok) throw new Error("서버 오류");
      const result = await response.json();
      return {
        text: result.data?.data || "견적 결과를 불러오지 못했습니다.",
        estimateId: result.data?.estimateId || null,
        parts: result.data?.parts || [],
      };
    } catch (err) {
      console.error(err);
      return { text: "서버 오류가 발생했습니다." };
    }
  };

  // ====== 메시지 전송 (새 GPT 질문 시 채팅 화면만 초기화) ======
  const sendMessage = async () => {
    const finalPurpose = isCustom ? customPurpose : purpose;
    if (!finalPurpose.trim()) return;

    resetChat(); // 화면 초기화만

    setHasThanked(false);
    const rawBudget = Number(budget.replace(/,/g, "")) || 0;

    // 사용자 메시지 추가
    setMessages([
      createMessage({
        sender: "user",
        text: `목적: ${finalPurpose}, 예산: ${
          budget ? `${budget}만원` : "미입력"
        }`,
      }),
    ]);

    setPurpose("");
    setCustomPurpose("");
    setIsCustom(false);

    // 예산 유효성 체크
    if (rawBudget < 1 || rawBudget > 9999) {
      setMessages((prev) => [
        ...prev,
        createMessage({ sender: "gpt", text: "😅 예산 단위를 확인해주세요!" }),
      ]);
      return;
    }

    if (rawBudget < 40 || rawBudget > 300) {
      setPendingBudget(rawBudget);
      setPendingPurpose(finalPurpose);
      setShowBudgetConsent(true);
      return;
    }

    setIsTyping(true);
    const gptRes = await fetchGPT(finalPurpose, rawBudget * 10000);
    setIsTyping(false);

    setRecommendedParts(gptRes.parts);
    setMessages((prev) => [
      ...prev,
      createMessage({
        sender: "gpt",
        text: `${gptRes.text}\n구매를 추천할 수 있습니다. 구매하시겠습니까?`,
        nextStep: "askPurchase",
        estimateId: gptRes.estimateId,
        liked: false,
      }),
    ]);
  };

  const handleEnter = (e) => e.key === "Enter" && sendMessage();

  // ====== 이하 예산 동의, 구매, 하트 기능은 기존과 동일 ======
  const handleBudgetConsentConfirm = async () => {
    setShowBudgetConsent(false);
    if (!pendingPurpose) return;
    setIsTyping(true);
    const gptRes = await fetchGPT(pendingPurpose, pendingBudget * 10000);
    setIsTyping(false);
    setRecommendedParts(gptRes.parts);
    setMessages([
      createMessage({
        sender: "gpt",
        text: `${gptRes.text}\n구매를 추천할 수 있습니다. 구매하시겠습니까?`,
        nextStep: "askPurchase",
        estimateId: gptRes.estimateId,
        liked: false,
      }),
    ]);
    setPendingBudget(0);
    setPendingPurpose("");
  };

  const handleBudgetConsentCancel = () => {
    setShowBudgetConsent(false);
    setPendingBudget(0);
    setPendingPurpose("");
    setMessages([
      createMessage({ sender: "gpt", text: "❌ 추천이 취소되었습니다." }),
    ]);
  };

  const handlePurchaseYes = (messageId) => {
    setMessages((prev) => {
      const newMessages = prev.map((m) =>
        m.id === messageId ? { ...m, nextStep: null } : m
      );
      newMessages.push(
        createMessage({
          sender: "gpt",
          text: "온라인으로 구매하시겠습니까? 오프라인으로 구매하시겠습니까?",
          nextStep: "askMethod",
        })
      );
      if (!hasThanked)
        newMessages.push(
          createMessage({
            sender: "gpt",
            text: "NuroPC를 이용해주셔서 감사합니다.",
          })
        );
      return newMessages;
    });
    setHasThanked(true);
  };

  const handlePurchaseNo = (messageId) => {
    setMessages((prev) => {
      const newMessages = prev.map((m) =>
        m.id === messageId ? { ...m, nextStep: null } : m
      );
      if (!hasThanked)
        newMessages.push(
          createMessage({
            sender: "gpt",
            text: "NuroPC를 이용해주셔서 감사합니다.",
          })
        );
      return newMessages;
    });
    setHasThanked(true);
  };

  const handlePurchaseMethod = (method) => {
    const parts = recommendedParts;
    navigate(method === "online" ? "/onlineshopping" : "/maps", {
      state: { parts },
    });
  };

  const handleHeartClick = async (messageId, e) => {
    e.stopPropagation();
    const clicked = messages.find((m) => m.id === messageId);
    if (!clicked?.estimateId) return;
    const willLike = !clicked.liked;
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, liked: willLike } : m))
    );
    try {
      await fetch(
        `http://localhost:8080/bookmark/toggle/${clicked.estimateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("북마크 오류:", err);
    }

    if (willLike) {
      const removed = JSON.parse(
        localStorage.getItem("removedBookmarks") || "[]"
      );
      localStorage.setItem(
        "removedBookmarks",
        JSON.stringify(removed.filter((id) => id !== clicked.estimateId))
      );
      const newHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 24 + Math.random() * 12,
        dx: (Math.random() - 0.5) * 50,
      };
      setFlyingHearts((prev) => [...prev, newHeart]);
      setTimeout(
        () =>
          setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id)),
        1600
      );
    }
  };

  // ====== 렌더 ======
  return (
    <div css={s.container}>
      <h2 css={s.logo}>NuroPC</h2>
      {/* 입력 영역 */}
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
              const raw = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(raw)) setBudget(raw);
            }}
            onKeyDown={handleEnter}
            css={s.budgetInput}
          />
          <span style={{ marginLeft: "8px", color: "#aaa" }}>만원</span>
        </div>
      </div>
      {/* 채팅 영역 */}
      <div css={s.chatBoxWrapper}>
        <div css={s.chatBox} ref={chatBoxRef}>
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.sender === "user" ? (
                <div css={s.userMessage}>{msg.text}</div>
              ) : (
                <div css={s.gptMessage}>
                  {msg.text.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  {msg.estimateId && (
                    <FaHeart
                      css={s.heartIconBottom}
                      color={msg.liked ? "red" : "lightgray"}
                      onClick={(e) => handleHeartClick(msg.id, e)}
                    />
                  )}
                </div>
              )}
              {msg.nextStep === "askPurchase" && (
                <div css={s.gptButtonGroup}>
                  <button
                    css={s.gptChatButton}
                    onClick={() => handlePurchaseYes(msg.id)}
                  >
                    예
                  </button>
                  <button
                    css={s.gptChatButton}
                    onClick={() => handlePurchaseNo(msg.id)}
                  >
                    아니요
                  </button>
                </div>
              )}
              {msg.nextStep === "askMethod" && (
                <div css={s.gptButtonGroup}>
                  <button
                    css={s.gptMethodButton}
                    onClick={() => handlePurchaseMethod("online")}
                  >
                    온라인
                  </button>
                  <button
                    css={s.gptMethodButton}
                    onClick={() => handlePurchaseMethod("offline")}
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
      {/* 하트 애니메이션 */}
      {flyingHearts.map((h) => (
        <div
          key={h.id}
          css={s.flyingHeart}
          style={{
            "--x": `${h.x}px`,
            "--y": `${h.y}px`,
            "--size": `${h.size}px`,
            "--dx": `${h.dx}px`,
          }}
        >
          ❤️
        </div>
      ))}
      {/* 예산 모달 */}
      {showBudgetConsent && (
        <div css={s.modalBackdrop}>
          <div css={s.modalContent}>
            <h3>⚠️ 추천 범위를 벗어난 금액입니다.</h3>
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
