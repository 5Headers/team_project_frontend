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

  // ===================== 상태 관리 =====================
  const [inputMoved, setInputMoved] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("gptMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [budget, setBudget] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendedParts, setRecommendedParts] = useState(() => {
    const saved = localStorage.getItem("recommendedParts");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBudgetConsent, setShowBudgetConsent] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [pendingPurpose, setPendingPurpose] = useState(0);

  // ===================== flyingHeart 상태 =====================
  const [flyingHearts, setFlyingHearts] = useState([]);

  // ===================== 로컬 저장 =====================
  useEffect(() => {
    localStorage.setItem("gptMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("recommendedParts", JSON.stringify(recommendedParts));
  }, [recommendedParts]);

  // ===================== 채팅 스크롤 =====================
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleNewChat = () => setMessages([]);
    window.addEventListener("newChat", handleNewChat);
    return () => window.removeEventListener("newChat", handleNewChat);
  }, []);

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

    // 새 견적 시작 시 이전 데이터 초기화
    setMessages([]);
    setRecommendedParts([]);
    localStorage.removeItem("gptMessages");
    localStorage.removeItem("recommendedParts");

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
    setInputMoved(true);

    if (rawBudget < 1 || rawBudget > 9999) {
      setMessages((prev) => [
        ...prev,
        { sender: "gpt", text: "😅 예산 단위를 확인해주세요!" },
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
    const gptResponse = await fetchGPT(finalPurpose, rawBudget * 10000);
    setIsTyping(false);

    setRecommendedParts(gptResponse.parts || gptResponse);
    localStorage.setItem(
      "recommendedParts",
      JSON.stringify(gptResponse.parts || gptResponse)
    );

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
    localStorage.setItem(
      "recommendedParts",
      JSON.stringify(gptResponse.parts || gptResponse)
    );

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
  };

  // ===================== 구매 여부 =====================
  const handlePurchaseYes = (msgIdx) => {
    // 예 버튼 클릭 시 GPT 메시지 nextStep 초기화
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, nextStep: null } : m))
    );

    // 온라인/오프라인 버튼 + 감사 메시지 한 번에 추가
    setMessages((prev) => [
      ...prev,
      {
        sender: "gpt",
        text: "온라인으로 구매하시겠습니까? 오프라인으로 구매하시겠습니까?",
        nextStep: "askMethod",
      },
      {
        sender: "gpt",
        text: "NuroPC를 이용해주셔서 감사합니다. 즐거운 쇼핑 되세요! 🎉",
      },
    ]);
  };

  const handlePurchaseNo = (msgIdx) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, nextStep: null } : m))
    );
    setMessages((prev) => [
      ...prev,
      { sender: "gpt", text: "NuroPC를 이용해주셔서 감사합니다." },
    ]);
  };

  // ===================== 구매 방법 선택 =====================
  const handlePurchaseMethod = (method, msgIdx) => {
    const parts = JSON.parse(localStorage.getItem("recommendedParts")) || [];

    if (method === "online") {
      navigate("/onlineshopping", { state: { parts } });
    } else {
      navigate("/maps", { state: { parts } });
    }
    // 온라인/오프라인 버튼은 계속 보이므로 메시지 추가 없음
  };

  // ===================== 하트 클릭 =====================
  const handleHeartClick = (msgIdx, e) => {
    e.stopPropagation();
    const clickedMessage = messages[msgIdx];
    const willLike = !clickedMessage.liked;

    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, liked: willLike } : m))
    );

    if (!clickedMessage.liked && willLike) {
      const newHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 24 + Math.random() * 12,
        dx: (Math.random() - 0.5) * 50,
      };
      setFlyingHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1600);
    }
  };

  // ===================== 렌더 =====================
  return (
    <div css={s.container}>
      <h2 css={s.logo}>NuroPC</h2>
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

      <div css={s.chatBoxWrapper}>
        <div css={s.chatBox} ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.sender === "user" ? (
                <div css={s.userMessage}>{msg.text}</div>
              ) : (
                <div css={s.gptMessage}>
                  {msg.text.split("\n").map((line, i) => {
                    const partMatch = line.match(
                      /^(.+?):\s*(.+?),\s*([\d,]+)원?,\s*링크:\s*(http.+)$/
                    );
                    if (line.startsWith("총 가격")) {
                      return (
                        <div key={i} css={s.totalPrice}>
                          {line}
                        </div>
                      );
                    } else if (partMatch) {
                      const [, , partName, partPrice, partLink] = partMatch;
                      return (
                        <div key={i} css={s.partCard}>
                          <div className="part-name">{partName}</div>
                          <div className="part-price">
                            {Number(
                              partPrice.replace(/,/g, "")
                            ).toLocaleString()}
                            원
                          </div>
                          <a href={partLink} target="_blank" rel="noreferrer">
                            링크 보기
                          </a>
                        </div>
                      );
                    } else {
                      return <div key={i}>{line}</div>;
                    }
                  })}

                  <FaHeart
                    css={s.heartIconBottom}
                    color={msg.liked ? "red" : "lightgray"}
                    onClick={(e) => handleHeartClick(idx, e)}
                  />
                </div>
              )}

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
                <span>.</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {flyingHearts.map((heart) => (
        <div
          key={heart.id}
          css={s.flyingHeart}
          style={{
            "--x": `${heart.x}px`,
            "--y": `${heart.y}px`,
            "--size": `${heart.size}px`,
            "--dx": `${heart.dx}px`,
          }}
        >
          ❤️
        </div>
      ))}

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
