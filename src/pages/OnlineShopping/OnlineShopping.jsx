/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as s from "./Styles";
import { FaMicrochip, FaMemory, FaHdd, FaDesktop } from "react-icons/fa";

export default function OnlineShopping() {
  const location = useLocation();
  const [onlineData] = useState(location.state?.parts || "");

  // GPT 텍스트 → 줄 단위로 분리
  const lines = onlineData
    ? onlineData.split("\n").filter((line) => line.trim() !== "")
    : [];

  // 부품 이름으로 아이콘 매핑
  const getIcon = (name) => {
    name = name.toLowerCase();
    if (name.includes("cpu")) return <FaMicrochip />;
    if (name.includes("ram")) return <FaMemory />;
    if (
      name.includes("ssd") ||
      name.includes("hdd") ||
      name.includes("storage")
    )
      return <FaHdd />;
    return <FaDesktop />;
  };

  // 마크다운 링크 추출 ([텍스트](URL))
  const extractLink = (str) => {
    if (!str) return { text: "", url: "" };
    const clean = str.replace(/\\/g, ""); // \ 제거
    const mdMatch = clean.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    if (mdMatch) {
      return { text: mdMatch[1], url: mdMatch[2] };
    }
    return { text: "구매 링크", url: "" };
  };

  return (
    <div css={s.container}>
      <h1 css={s.logo}>온라인 구매 페이지</h1>

      {lines.length > 0 ? (
        <div css={s.scrollWrapper}>
          {lines.map((line, idx) => {
            // 제목, 부제목, 부품 항목 구분
            if (idx === 0) {
              return (
                <h2 key={idx} css={s.title}>
                  {line}
                </h2>
              );
            } else if (line.toLowerCase().includes("부품 리스트")) {
              return (
                <h3 key={idx} css={s.subtitle}>
                  {line}
                </h3>
              );
            } else {
              // 부품 이름, 가격, 링크 파싱
              const match = line.match(/^(.*?)-\s*([\d,]+)원/);
              const name = match ? match[1].trim() : line;
              const price = match ? match[2] : "";

              // 마크다운 링크 추출
              const { text: linkText, url: linkUrl } = extractLink(line);

              return (
                <div key={idx} css={s.onlineItem}>
                  <div css={s.partInfo}>
                    <span css={s.partIcon}>{getIcon(name)}</span>
                    <span css={s.partName}>{name}</span>
                    {price && <span css={s.partPrice}> - {price}원</span>}
                  </div>
                  {linkUrl && (
                    <a
                      css={s.partLink}
                      href={
                        linkUrl.startsWith("http")
                          ? linkUrl
                          : "https://" + linkUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkText}
                    </a>
                  )}
                </div>
              );
            }
          })}
        </div>
      ) : (
        <p style={{ color: "white", fontSize: "16px" }}>
          추천 부품이 없습니다.
        </p>
      )}
    </div>
  );
}
