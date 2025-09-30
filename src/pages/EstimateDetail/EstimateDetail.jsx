/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as s from "./styles";

// ===== 아이콘 =====
import { FiClipboard, FiCpu } from "react-icons/fi";
import { BsFillMotherboardFill, BsGpuCard, BsSdCard } from "react-icons/bs";
import { RiRam2Fill } from "react-icons/ri";
import { FaPowerOff, FaKeyboard, FaMouse } from "react-icons/fa";
import { PiComputerTowerBold } from "react-icons/pi";
import { GiCooler } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";

function EstimateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const token = localStorage.getItem("accessToken");

  // ===== 아이콘 매핑 함수 =====
  const getIcon = (rawName) => {
    const name = rawName.replace(/\*|-/g, "").trim().toLowerCase();
    if (name.includes("cpu") || name.includes("프로세서")) return <FiCpu />;
    if (name.includes("메인보드")) return <BsFillMotherboardFill />;
    if (name.includes("ram") || name.includes("메모리") || name.includes("램"))
      return <RiRam2Fill />;
    if (name.includes("gpu") || name.includes("그래픽카드"))
      return <BsGpuCard />;
    if (
      name.includes("ssd") ||
      name.includes("hdd") ||
      name.includes("스토리지") ||
      name.includes("저장장치")
    )
      return <BsSdCard />;
    if (
      name.includes("파워") ||
      name.includes("power") ||
      name.includes("전원 공급 장치")
    )
      return <FaPowerOff />;
    if (name.includes("케이스") || name.includes("case"))
      return <PiComputerTowerBold />;
    if (name.includes("쿨러") || name.includes("fan")) return <GiCooler />;
    if (name.includes("모니터") || name.includes("monitor"))
      return <MdMonitor />;
    if (name.includes("키보드") || name.includes("keyboard"))
      return <FaKeyboard />;
    if (name.includes("마우스") || name.includes("mouse")) return <FaMouse />;
    if (name.includes("운영체제")) return <AiFillWindows />;
    return <FiClipboard />;
  };

  // ===== 부품 데이터 가져오기 =====
  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/estimate-part/list/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        const sorted = data.sort((a, b) => a.price - b.price);
        setParts(sorted);
      } catch (err) {
        console.error("부품 불러오기 실패:", err);
        alert("부품 데이터를 불러오는데 실패했습니다.");
      }
    };
    fetchParts();
  }, [id, token]);

  // ===== 마크다운 링크 추출 =====
  const extractLink = (str) => {
    if (!str) return { text: "", url: "" };
    const clean = str.replace(/\\/g, "").trim(); // 백슬래시 제거 및 공백 제거
    const mdMatch = clean.match(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/);
    if (mdMatch) {
      return { text: mdMatch[1], url: mdMatch[2] };
    }
    return { text: "네이버 링크", url: clean }; // 단순 URL도 사용
  };

  // ===== 안전한 링크 처리 =====
  const safeLink = (url) => {
    if (!url) return "";
    const trimmed = url.trim();
    return trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : "https://" + trimmed;
  };

  return (
    <div css={s.container}>
      <h2>견적 상세 부품</h2>
      <ul css={s.modalList}>
        {parts.map((p, idx) => {
          // 마크다운 링크 추출
          const { text: linkText, url: linkUrl } = extractLink(p.link);

          return (
            <li key={idx}>
              <div css={s.leftSide}>
                <span css={s.partIcon}>{getIcon(p.category)}</span>
                <span css={s.partName}>
                  {p.category} - {p.name}
                </span>
                <span css={s.partPrice}>{p.price?.toLocaleString()}원</span>
              </div>
              {linkUrl ? (
                <a
                  href={safeLink(linkUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  css={s.partLinkBtn}
                >
                  {linkText}
                </a>
              ) : (
                <span css={s.partLinkBtn} style={{ opacity: 0.5 }}>
                  링크 없음
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <button css={s.modalCloseBtn} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}

export default EstimateDetail;
