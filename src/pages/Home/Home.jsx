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
  const [messages, setMessages] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [budget, setBudget] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("제목 없음");
  const [titleError, setTitleError] = useState(false);
  const [recommendedParts, setRecommendedParts] = useState([]);
  const [showBudgetConsent, setShowBudgetConsent] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [pendingPurpose, setPendingPurpose] = useState("");
  

  // ===================== flyingHeart 상태 =====================
  const [flyingHearts, setFlyingHearts] = useState([]);

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
  };

  // ===================== 구매 여부/방법 =====================
  const handlePurchaseYes = (msgIdx) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === msgIdx ? { ...m, nextStep: null } : m))
    );
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
    setMessages((prev) => [
      ...prev,
      { sender: "gpt", text: "NuroPC를 이용해주셔서 감사합니다." },
    ]);
  };

  const handlePurchaseMethod = (method) => {
    if (method === "online") {
      navigate("/onlineshopping", { state: { parts: recommendedParts } });
    } else {
      navigate("/maps", { state: { parts: recommendedParts } });
    }
  };

  // ===================== 하트 클릭 =====================
const clickedRef = useRef({});

const handleHeartClick = (msgIdx, e) => {
  e.stopPropagation();

  setMessages((prev) => {
    const clickedMessage = prev[msgIdx];
    const willLike = !clickedMessage.liked;

    const newMessages = prev.map((m, i) =>
      i === msgIdx ? { ...m, liked: willLike } : m
    );

    // flyingHeart는 이전 상태가 false(회색)이고, 이미 생성되지 않았으면
    if (!clickedMessage.liked && willLike && !clickedRef.current[msgIdx]) {
      clickedRef.current[msgIdx] = true; // 중복 방지
      setFlyingHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: 24 + Math.random() * 12,
          dx: (Math.random() - 0.5) * 50,
        },
      ]);

      setTimeout(() => {
        setFlyingHearts((prevHearts) =>
          prevHearts.filter((h) => h.id !== h.id)
        );
        clickedRef.current[msgIdx] = false; // 완료 후 초기화
      }, 1600);

      // ✅ 여기서만 모달 띄우기
      setShowModal(true);
    }

    return newMessages;
  });
};


  // ===================== 찜 모달 =====================
  const handleModalConfirm = () => {
    if (title.trim() === "") {
      setTitleError(true);
      return;
    }
    setShowModal(false);
    setTitle("제목 없음");
    setTitleError(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setTitle("제목 없음");
    setTitleError(false);
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