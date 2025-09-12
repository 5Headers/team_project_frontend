/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoTriangleLeft } from "react-icons/go";
import { DiAptana } from "react-icons/di";
import * as s from "./styles";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  // 사이드바 토글
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // 사이드바 열릴 때 슬라이드 메뉴 닫기
    if (!isSidebarOpen) {
      setIsMenuOpen(false);
      setIsRotated(false);
    }
  };

  // DiAptana 클릭 → 메뉴 토글
  const toggleMenu = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setIsMenuOpen(!isMenuOpen);
    setIsRotated(!isRotated);
  };

  // Header의 다른 영역 클릭 시 슬라이드 메뉴 자동 닫힘
  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setIsRotated(false);
    }
  };

  return (
    <div css={s.container} onClick={closeMenu}>
      {/* 좌측 상단 FiMenu */}
      <div css={s.fixedMenuIconWrapper(isSidebarOpen)} onClick={toggleSidebar}>
        <FiMenu />
      </div>

      <div css={s.header}>
        <div>
          <ul>{/* 기존 FiMenu 제거 */}</ul>
        </div>
        <div>
          <ul>
            <li css={s.login}>로그인</li>
            <li css={s.signup}>회원가입</li>
            <li>
              <DiAptana
                css={s.headerIcon(isRotated)}
                onClick={toggleMenu}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Header 슬라이딩 메뉴 */}
      <div css={s.headerSlidingMenu(isMenuOpen)}>
        <ul>
          <li>프로필</li>
          <li>설정</li>
          <li>로그아웃</li>
        </ul>
      </div>

      {/* 오버레이 */}
      {isSidebarOpen && (
        <div css={s.overlay(isSidebarOpen)} onClick={toggleSidebar} />
      )}

      {/* 사이드바 */}
      <div css={s.sidebar(isSidebarOpen)}>
        <div css={s.sidebarToggle(isSidebarOpen)} onClick={toggleSidebar}>
          <GoTriangleLeft />
        </div>
        <ul css={s.Menusidebar}>
          <li>내 장비 목록</li>
          <li>커뮤니티</li>
          <li>프로필 설정</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
