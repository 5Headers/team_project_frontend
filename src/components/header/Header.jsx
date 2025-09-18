/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoTriangleLeft } from "react-icons/go";
import { DiAptana } from "react-icons/di";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);

  const navigate = useNavigate();

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

  // Header 다른 영역 클릭 시 슬라이드 메뉴 자동 닫힘
  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setIsRotated(false);
    }
  };

  // 사이드바 항목 클릭 → 페이지 이동
  const handleSidebarItemClick = (index) => {
    setActiveSidebarItem(index); // 선택된 항목 고정
    setIsSidebarOpen(false); // 사이드바 자동 닫기

    // index에 따라 라우팅
    if (index === 0) {
      navigate("/"); // Home
    } else if (index === 2) {
      navigate("/picklist"); // PickList
    }
  };

  //로그인 항목 클릭 -> 페이지 이동
  const SigninClick = () => {
    navigate("/auth/signin");
  };

  // 회원가입 항목 클릭 -> 페이지 이동
  const SignupClick = () => {
    navigate("/auth/signup");
  };
  //프로필 항목 클릭 -> 페이지이동 
  const ProfileClick = () => {
    navigate("/auth/profile");
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
            <li css={s.login} onClick={SigninClick}>
              로그인
            </li>
            <li css={s.signup} onClick={SignupClick}>
              회원가입
            </li>
            <li>
              <DiAptana css={s.headerIcon(isRotated)} onClick={toggleMenu} />
            </li>
          </ul>
        </div>
      </div>

      {/* Header 슬라이딩 메뉴 */}
      <div css={s.headerSlidingMenu(isMenuOpen)}>
        <ul>
          <li onClick={ProfileClick}>프로필</li>
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
          <li
            onClick={() => handleSidebarItemClick(0)}
            css={s.sidebarItem(0 === activeSidebarItem)}
          >
            장비 추천
          </li>
          <li
            onClick={() => handleSidebarItemClick(2)}
            css={s.sidebarItem(2 === activeSidebarItem)}
          >
            찜 목록
          </li>
          {/* 새로운 대화 메뉴 추가 */}
          <li
            onClick={() => {
              navigate("/");
              setActiveSidebarItem(3); // 선택 표시
              setIsSidebarOpen(false); // 사이드바 닫기
              window.location.reload(); // Home 새로고침
            }}
            css={s.sidebarItem(3 === activeSidebarItem)}
          >
            새로운 대화
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;