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

  // ===== 아이콘 매핑 함수 (카테고리 기준) =====
  const getIcon = (category) => {
    const cat = category.replace(/\*|-/g, "").trim().toLowerCase();

    if (cat.includes("cpu") || cat.includes("프로세서")) return <FiCpu />;
    if (cat.includes("메인보드")) return <BsFillMotherboardFill />;
    if (cat.includes("ram") || cat.includes("메모리") || cat.includes("램"))
      return <RiRam2Fill />;
    if (cat.includes("gpu") || cat.includes("그래픽카드")) return <BsGpuCard />;
    if (
      cat.includes("ssd") ||
      cat.includes("hdd") ||
      cat.includes("스토리지") ||
      cat.includes("저장장치")
    )
      return <BsSdCard />;
    if (
      cat.includes("파워") ||
      cat.includes("power") ||
      cat.includes("전원 공급 장치")
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

    return <FiClipboard />; // 기본 아이콘
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

  return (
    <div css={s.container}>
      <h2>견적 상세 부품</h2>
      <ul css={s.modalList}>
        {parts.map((p, idx) => (
          <li key={idx}>
            <span css={s.partIcon}>{getIcon(p.category)}</span>
            <span css={s.partName}>{p.category} - {p.name}</span>
            <span css={s.partPrice}>({p.price?.toLocaleString()}원)</span>
          </li>
        ))}
      </ul>
      <button css={s.modalCloseBtn} onClick={() => navigate(-1)}>
        뒤로가기
      </button>
    </div>
  );
}

export default EstimateDetail;
