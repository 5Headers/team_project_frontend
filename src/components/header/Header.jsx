/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import defaultProfile from "../../assets/기본프로필.png";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { GoTriangleLeft } from "react-icons/go";
import { DiAptana } from "react-icons/di";
import { IoHome } from "react-icons/io5";
import * as s from "./styles";
import { getPrincipalRequest } from "../../apis/auth/authApi"; // ✅ DB에서 사용자 정보 조회

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("userProfile") || defaultProfile
  );

  const navigate = useNavigate();

  // ✅ 로그인 상태가 바뀔 때마다 DB에서 최신 프로필 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem("accessToken")) return;

      try {
        const res = await getPrincipalRequest();
        if (res?.data?.status === "success" && res.data.data) {
          const user = res.data.data;
          const finalProfileImg = user.profileImg || defaultProfile;
          setProfileImage(finalProfileImg);

          // localStorage에도 동기화 (Profile 페이지 등에서 재사용 가능)
          localStorage.setItem("userProfile", finalProfileImg);
        }
      } catch (err) {
        console.error("헤더 사용자 정보 불러오기 실패:", err);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  // ✅ 로그인/로그아웃/프로필 변경 이벤트 감지
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("login", handleAuthChange);
    window.addEventListener("logout", handleAuthChange);
    window.addEventListener("profileUpdate", handleAuthChange);

    return () => {
      window.removeEventListener("login", handleAuthChange);
      window.removeEventListener("logout", handleAuthChange);
      window.removeEventListener("profileUpdate", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setProfileImage(defaultProfile);
    setIsMenuOpen(false);
    setIsRotated(false);
    window.dispatchEvent(new Event("logout"));
    navigate("/");
  };

  const handleSidebarItemClick = (index) => {
    setIsSidebarOpen(false);
    if (index === 0) {
      setActiveSidebarItem(0);
      navigate("/search");
    } else if (index === 2) {
      setActiveSidebarItem(2);
      navigate("/picklist");
    } else if (index === 3) {
      localStorage.removeItem("chatMessages");
      window.dispatchEvent(new Event("newChat"));
      setActiveSidebarItem(0);
      navigate("/search");
    }
  };

  return (
    <div css={s.container} onClick={() => setIsMenuOpen(false)}>
      {isLoggedIn && (
        <div
          css={s.fixedMenuIconWrapper(isSidebarOpen)}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
                <li css={s.login} onClick={() => navigate("/auth/signin")}>
                  로그인
                </li>
                <li css={s.signup} onClick={() => navigate("/auth/signup")}>
                  회원가입
                </li>
              </>
            ) : (
              <li css={s.profileIcon} onClick={() => navigate("/auth/profile")}>
                <img src={profileImage} alt="프로필" />
              </li>
            )}
            {isLoggedIn && (
              <li>
                <DiAptana
                  css={s.headerIcon(isRotated)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                    setIsRotated(!isRotated);
                  }}
                />
              </li>
            )}
          </ul>
        </div>
      </div>

      {isLoggedIn && (
        <div css={s.headerSlidingMenu(isMenuOpen)}>
          <ul>
            <li onClick={() => navigate("/auth/profile")}>프로필</li>
            <li onClick={() => navigate("/setting")}>설정</li>
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </div>
      )}

      {isSidebarOpen && (
        <div
          css={s.overlay(isSidebarOpen)}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div css={s.sidebar(isSidebarOpen)}>
        <div
          css={s.sidebarToggle(isSidebarOpen)}
          onClick={() => setIsSidebarOpen(false)}
        >
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
            견적 기록
          </li>
          <li
            onClick={() => handleSidebarItemClick(3)}
            css={s.sidebarItem(false)}
          >
            새로운 견적
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
