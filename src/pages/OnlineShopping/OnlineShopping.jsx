/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
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
  const [parts] = useState(location.state?.parts || []);
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);

  // ===== 부품 아이콘 =====
  const getIcon = (category) => {
    const cat = category?.toLowerCase() || "";
    if (cat.includes("cpu") || cat.includes("프로세서")) return <FiCpu />;
    if (cat.includes("메인보드")) return <BsFillMotherboardFill />;
    if (cat.includes("ram") || cat.includes("메모리") || cat.includes("램"))
      return <RiRam2Fill />;
    if (cat.includes("gpu") || cat.includes("그래픽카드")) return <BsGpuCard />;
    if (
      cat.includes("ssd") ||
      cat.includes("스토리지") ||
      cat.includes("hdd") ||
      cat.includes("저장장치")
    )
      return <BsSdCard />;
    if (
      cat.includes("파워") ||
      cat.includes("power") ||
      cat.includes("파워 서플라이")
    )
      return <FaPowerOff />;
    if (cat.includes("케이스") || cat.includes("case"))
      return <PiComputerTowerBold />;
    if (cat.includes("쿨러") || cat.includes("fan")) return <GiCooler />;
    if (cat.includes("모니터") || cat.includes("monitor")) return <MdMonitor />;
    if (cat.includes("키보드") || cat.includes("keyboard"))
      return <FaKeyboard />;
    if (cat.includes("마우스") || cat.includes("mouse")) return <FaMouse />;
    if (cat.includes("운영체제")) return <AiFillWindows />;
    return <FiClipboard />;
  };

  // ===== 마크다운 링크 추출 및 안전 링크 처리 =====
  const parseLink = (rawLink, name) => {
    if (!rawLink) {
      // 링크 없으면 네이버 검색
      return {
        text: "네이버 링크",
        url: `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(
          name
        )}`,
      };
    }

    const clean = rawLink.replace(/\\/g, "").trim();
    const mdMatch = clean.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);

    if (mdMatch) {
      return { text: mdMatch[1], url: mdMatch[2] };
    }

    // 일반 URL도 https 보장
    return {
      text: "링크",
      url: clean.startsWith("http") ? clean : "https://" + clean,
    };
  };

  // ===== 스크롤 시 나타나기 =====
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const newVisible = parts.map((_, idx) => {
        const el = container.children[idx];
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 50;
      });
      setVisibleItems(newVisible);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parts]);

  return (
    <div css={s.container}>
      <h1 css={s.logo}>온라인 구매 페이지</h1>

      {parts.length > 0 ? (
        <div css={s.scrollWrapper} ref={containerRef}>
          {parts.map((p, idx) => {
            const { text: linkText, url: linkUrl } = parseLink(p.link, p.name);

            return (
              <div
                key={idx}
                css={[
                  s.onlineItem,
                  visibleItems[idx] ? s.onlineItemVisible : null,
                ]}
              >
                <div css={s.partInfo}>
                  <span css={s.partIcon}>{getIcon(p.category)}</span>
                  <span css={s.partName}>{`-${p.category}: ${p.name}`}</span>
                  {p.price && (
                    <span css={s.partPrice}>
                      {" "}
                      - {Number(p.price).toLocaleString()}원
                    </span>
                  )}
                </div>
                <a
                  css={s.partLink}
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkText}
                </a>
              </div>
            );
          })}

          <div css={s.totalPrice}>
            총 가격:{" "}
            {Number(
              parts.reduce((acc, p) => acc + (Number(p.price) || 0), 0)
            ).toLocaleString()}
            원
          </div>
        </div>
      ) : (
        <p style={{ color: "white", fontSize: "16px" }}>
          추천 부품이 없습니다.
        </p>
      )}
    </div>
  );
}
