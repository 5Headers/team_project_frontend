/** @jsxImportSource @emotion/react */
import { container, onlineList, onlineItem } from "./styles";

// 더미 데이터 (나중에 API 호출로 교체)
const getOnlineData = () => [
  { name: "Intel i9-13900K", price: "700,000원", link: "#" },
  { name: "AMD Ryzen 9 7950X", price: "680,000원", link: "#" },
];

export default function OnlineShopping() {
  const onlineData = getOnlineData();

  return (
    <div css={container}>
      <h1>온라인 구매</h1>
      <div css={onlineList}>
        {onlineData.map((cpu, idx) => (
          <div key={idx} css={onlineItem}>
            <a href={cpu.link} target="_blank" rel="noopener noreferrer">
              {cpu.name} : {cpu.price}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
