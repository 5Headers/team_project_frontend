/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const navigate = useNavigate();

  // ------------------ 로그인 상태 체크 ------------------
  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT 방식 예시
    setIsLoggedIn(!!token);
  }, []);

  // ------------------ 사이드바 / 메뉴 토글 ------------------
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsMenuOpen(false);
      setIsRotated(false);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    setIsRotated(!isRotated);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setIsRotated(false);
    }
  };

  // ------------------ 사이드바 항목 클릭 ------------------
  const handleSidebarItemClick = (index) => {
    setActiveSidebarItem(index);
    setIsSidebarOpen(false);
    if (index === 0) navigate("/");
    else if (index === 2) navigate("/picklist");
  };

  // ------------------ 페이지 이동 ------------------
  const SigninClick = () => navigate("/auth/signin");
  const SignupClick = () => navigate("/auth/signup");
  const ProfileClick = () => navigate("/auth/profile");

  // ------------------ 로그아웃 ------------------
  const handleLogout = async () => {
    try {
      await fetch("/auth/signout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/signin");
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
            {!isLoggedIn && (
              <>
                <li css={s.login} onClick={SigninClick}>
                  로그인
                </li>
                <li css={s.signup} onClick={SignupClick}>
                  회원가입
                </li>
              </>
            )}
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
          <li onClick={handleLogout}>로그아웃</li>
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
          <li
            onClick={() => {
              navigate("/");
              setActiveSidebarItem(3);
              setIsSidebarOpen(false);
              window.location.reload();
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
