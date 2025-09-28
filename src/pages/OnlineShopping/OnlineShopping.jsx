/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as s from "./Styles";

// ===== 아이콘 =====
import { FiClipboard, FiCpu } from "react-icons/fi";
import { BsFillMotherboardFill, BsGpuCard, BsSdCard } from "react-icons/bs";
import { RiRam2Fill } from "react-icons/ri";
import { FaPowerOff, FaKeyboard, FaMouse } from "react-icons/fa";
import { PiComputerTowerBold } from "react-icons/pi";
import { GiCooler } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";

export default function OnlineShopping() {
  const location = useLocation();
  const [onlineData] = useState(location.state?.parts || "");

  // GPT 텍스트 → 줄 단위
  const lines = onlineData
    ? onlineData.split("\n").filter((l) => l.trim() !== "")
    : [];

  // 상단 설명: "부품 리스트" 이전까지
  const topDesc = lines
    .slice(
      0,
      lines.findIndex((l) => l.includes("부품 리스트"))
    )
    .join(" ");

  // 총합 문구: 마지막 줄이 총합이면 그대로
  const bottomTotal = lines[lines.length - 1].includes("총가격")
    ? lines[lines.length - 1]
    : "";

  // 부품 이름으로 아이콘 매핑
  const getIcon = (rawName) => {
    // 마크다운 기호 제거 후 소문자 변환
    const name = rawName.replace(/\*|-/g, "").trim().toLowerCase();

    if (name.includes("cpu") || name.includes("프로세서")) return <FiCpu />;

    if (name.includes("메인보드")) return <BsFillMotherboardFill />;

    if (name.includes("ram") || name.includes("메모리") || name.includes("램"))
      return <RiRam2Fill />;

    if (name.includes("gpu") || name.includes("그래픽카드"))
      return <BsGpuCard />;

    if (
      name.includes("ssd") ||
      name.includes("스토리지") ||
      name.includes("스토리지(HDD)") ||
      name.includes("스토리지(SSD)") ||
      name.includes("hdd") ||
      name.includes("저장장치")
    )
      return <BsSdCard />;

    if (
      name.includes("파워") ||
      name.includes("power") ||
      name.includes("파워 서플라이") ||
      name.includes("전원 공급 장치")
    )
      return <FaPowerOff />;

    if (name.includes("케이스") || name.includes("case"))
      return <PiComputerTowerBold />;

    if (
      name.includes("쿨러") ||
      name.includes("cpu 쿨러") ||
      name.includes("fan")
    )
      return <GiCooler />;

    if (name.includes("모니터") || name.includes("monitor"))
      return <MdMonitor />;

    if (name.includes("키보드") || name.includes("keyboard"))
      return <FaKeyboard />;

    if (name.includes("마우스") || name.includes("mouse")) return <FaMouse />;

    if (name.includes("운영체제")) return <AiFillWindows />;

    // 기본값
    return <FiClipboard />;
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
            // 제목/부제목/부품 항목 구분
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
              // 부품 이름, 가격 추출
              const match = line.match(/^(.*?)-\s*([\d,]+)원/);
              const name = match ? match[1].trim() : line;
              const price = match ? match[2] : "";

              // 링크 추출
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
