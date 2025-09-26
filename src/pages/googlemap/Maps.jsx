/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from "react";
import { Global } from "@emotion/react"; // ✅ 전역 스타일 적용
import * as s from "./styles";

export default function Maps() {
  const [map, setMap] = useState(null);
  const [stores, setStores] = useState([]);
  const [markers, setMarkers] = useState([]);
  const infoWindowRef = useRef(null); // 현재 열린 인포윈도우

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

          // ✅ 주변 컴퓨터 관련 장소 검색
          const ps = new window.kakao.maps.services.Places();
          ps.keywordSearch(
            "컴퓨터",
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setStores(data);

                const bounds = new window.kakao.maps.LatLngBounds();
                const newMarkers = [];

                data.forEach((place) => {
                  const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    map: createdMap,
                  });

                  // ✅ 마커 저장 (place_name 기준)
                  newMarkers.push({
                    marker,
                    placeName: place.place_name,
                    place,
                  });

                  bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));

                  // 마커 클릭 → 인포윈도우 열기
                  window.kakao.maps.event.addListener(marker, "click", () => {
                    openInfoWindow(createdMap, marker, place);
                  });
                });

                setMarkers(newMarkers);
                createdMap.setBounds(bounds);
              }
            },
            {
              location: new window.kakao.maps.LatLng(userLat, userLng),
              radius: 2000,
            }
          );
        });
      });
    }
  }, []);

  // ✅ 인포윈도우 열기 함수
  const openInfoWindow = (map, marker, place) => {
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    // styles.js 안에 정의된 customInfoWindow 클래스 사용
    const content = `
      <div class="customInfoWindow">
        <strong class="title">${place.place_name}</strong>
        <span class="address">${place.road_address_name || place.address_name || "주소 정보 없음"}</span>
        <span class="phone">${place.phone || "전화번호 없음"}</span>
        <a href="${place.place_url}" target="_blank" class="link">상세보기 →</a>
      </div>
    `;

    const infowindow = new window.kakao.maps.InfoWindow({
      content,
      removable: true, // 닫기 버튼 표시
    });

    infowindow.open(map, marker);
    infoWindowRef.current = infowindow;
  };

  // ✅ 리스트 클릭 시 해당 마커 인포윈도우 열기
  const handleClick = (store) => {
    if (!map) return;

    const moveLatLon = new window.kakao.maps.LatLng(store.y, store.x);
    map.panTo(moveLatLon);

    const target = markers.find((m) => m.placeName === store.place_name);
    if (target) {
      openInfoWindow(map, target.marker, store);
    }
  };

  return (
    <div css={s.container}>
      {/* ✅ 전역 스타일 적용 (customInfoWindow) */}
      <Global styles={s.globalStyles} />

      <div css={s.mapArea}>
        <div id="map"></div>
      </div>

      <div css={s.listArea}>
        <h3 css={s.listTitle}>💻 주변 컴퓨터 가게</h3>
        {stores.length === 0 ? (
          <p>검색된 매장이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {stores.map((store, idx) => (
              <li
                key={idx}
                css={s.listItem}
                onClick={() => handleClick(store)}
              >
                <strong>{store.place_name}</strong>
                <br />
                {store.road_address_name || store.address_name}
                <br />
                <span>{store.phone || "전화번호 없음"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
