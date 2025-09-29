/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { GoTriangleLeft } from "react-icons/go";
import { DiAptana } from "react-icons/di";
import { IoHome } from "react-icons/io5";
import profileImage from "../../assets/기본프로필.png";
import * as s from "./styles";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const navigate = useNavigate();

  // 로그인 상태 감지 (storage 이벤트만 사용, login 이벤트 제거)
  useEffect(() => {
    const handleStorage = () =>
      setIsLoggedIn(!!localStorage.getItem("accessToken"));

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleGoSetting = () => navigate("/setting");

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

  const handleSidebarItemClick = (index) => {
    setIsSidebarOpen(false);
    setActiveSidebarItem(index);

    if (index === 0) navigate("/search");
    else if (index === 2) navigate("/picklist");
    else if (index === 3) navigate("/search"); // reload 제거
  };

  const SigninClick = () => navigate("/auth/signin");
  const SignupClick = () => navigate("/auth/signup");
  const ProfileClick = () => navigate("/auth/profile");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsRotated(false);
    navigate("/");
  };

  return (
    <div css={s.container} onClick={closeMenu}>
      {isLoggedIn && (
        <div
          css={s.fixedMenuIconWrapper(isSidebarOpen)}
          onClick={toggleSidebar}
        >
          <FiMenu />
        </div>
      )}

      <div css={s.header}>
        <div>
          <ul></ul>
        </div>
        <div>
          <ul>
            {!isLoggedIn ? (
              <>
                <li css={s.login} onClick={SigninClick}>
                  로그인
                </li>
                <li css={s.signup} onClick={SignupClick}>
                  회원가입
                </li>
              </>
            ) : (
              <li css={s.profileIcon} onClick={ProfileClick}>
                {/* Context 제거, 항상 기본 이미지 사용 */}
                <img src={profileImage} alt="프로필" />
              </li>
            )}
            <li>
              <DiAptana css={s.headerIcon(isRotated)} onClick={toggleMenu} />
            </li>
          </ul>
        </div>
      </div>

      <div css={s.headerSlidingMenu(isMenuOpen)}>
        <ul>
          {isLoggedIn && <li onClick={ProfileClick}>프로필</li>}
          <li onClick={handleGoSetting}>설정</li>
          {isLoggedIn && <li onClick={handleLogout}>로그아웃</li>}
        </ul>
      </div>

      {isSidebarOpen && (
        <div css={s.overlay(isSidebarOpen)} onClick={toggleSidebar} />
      )}

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
            onClick={() => handleSidebarItemClick(3)}
            css={s.sidebarItem(3 === activeSidebarItem)}
          >
            새로운 대화
          </li>
        </ul>
      </div>

      {isLoggedIn && !isSidebarOpen && (
        <div css={s.homeIconNextToSidebar} onClick={() => navigate("/")}>
          <IoHome />
        </div>
      )}
    </div>
  );
}

export default Header;
