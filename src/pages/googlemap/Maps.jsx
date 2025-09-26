import { useEffect, useState } from "react";

export default function Maps() {
  const [map, setMap] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(userLat, userLng),
            level: 4,
          };
          const createdMap = new window.kakao.maps.Map(container, options);
          setMap(createdMap);

          // ✅ 내 위치 마커
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(userLat, userLng),
            map: createdMap,
          });

          // ✅ Places 객체 생성
          const ps = new window.kakao.maps.services.Places();

          // ✅ "컴퓨터" 키워드 검색
          ps.keywordSearch(
            "컴퓨터",
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setStores(data); // 리스트 저장

                const bounds = new window.kakao.maps.LatLngBounds();

                data.forEach((place) => {
                  const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    map: createdMap,
                  });

                  bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));

                  // ✅ 마커 클릭 시 가게명 표시
                  const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
                  });
                  window.kakao.maps.event.addListener(marker, "click", () => {
                    infowindow.open(createdMap, marker);
                  });
                });

                // ✅ 검색된 매장 다 보이게 지도 이동
                createdMap.setBounds(bounds);
              } else {
                alert("검색 결과가 없습니다.");
              }
            },
            {
              location: new window.kakao.maps.LatLng(userLat, userLng), // 내 위치 기준
              radius: 2000, // 2km 반경
            }
          );
        });
      });
    }
  }, []);

  // ✅ 리스트 클릭 시 지도 이동
  const handleClick = (store) => {
    if (!map) return;
    const moveLatLon = new window.kakao.maps.LatLng(store.y, store.x);
    map.panTo(moveLatLon);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 지도 영역 */}
      <div id="map" style={{ width: "70%", height: "500px" }}></div>

      {/* 검색 결과 리스트 */}
      <div
        style={{
          width: "30%",
          height: "500px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3>💻 주변 컴퓨터 가게</h3>
        {stores.length === 0 ? (
          <p>검색된 매장이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {stores.map((store, idx) => (
              <li
                key={idx}
                onClick={() => handleClick(store)}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "5px",
                  cursor: "pointer",
                }}
              >
                <strong>{store.place_name}</strong>
                <br />
                {store.road_address_name || store.address_name}
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>
                  {store.phone || "전화번호 없음"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
