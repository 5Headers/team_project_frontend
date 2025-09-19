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
          <FaHeart
            css={s.heartIconBottom}
            onClick={() => setLiked(!liked)}
            color={liked ? "red" : "lightgray"}
          />
        )}
      </div>
    </div>
  );
}
