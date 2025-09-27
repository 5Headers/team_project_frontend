/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { container, offlineList, offlineBranch } from "./styles";

// 더미 데이터 (나중에 API 호출로 교체)
const getOfflineData = () => [
  {
    branch: "강남점",
    lat: 37.498, // 예시 좌표
    lng: 127.027,
    items: [
      { name: "Intel i9-13900K", price: "720,000원" },
      { name: "AMD Ryzen 9 7950X", price: "690,000원" },
    ],
  },
  {
    branch: "홍대점",
    lat: 37.557, // 예시 좌표
    lng: 126.925,
    items: [
      { name: "Intel i9-13900K", price: "710,000원" },
      { name: "AMD Ryzen 9 7950X", price: "695,000원" },
    ],
  },
];

export default function OfflineShopping() {
  const navigate = useNavigate();
  const offlineData = getOfflineData();

  const handleViewMap = (branch) => {
    // TODO: 백엔드에서 좌표 받아와서 전달 가능
    navigate("/maps", {
      state: { branchName: branch.branch, lat: branch.lat, lng: branch.lng },
    });
  };

  return (
    <div css={container}>
      <h1>오프라인 구매</h1>
      <div css={offlineList}>
        {offlineData.map((branch, idx) => (
          <div key={idx} css={offlineBranch}>
            <strong>{branch.branch}</strong>
            <button
              onClick={() => handleViewMap(branch)}
              style={{
                marginLeft: "10px",
                padding: "2px 6px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              지도에서 보기
            </button>
            <ul>
              {branch.items.map((item, i) => (
                <li key={i}>
                  {item.name} : {item.price}
                  {/* TODO: 백엔드에서 받아온 가격 사용 */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
