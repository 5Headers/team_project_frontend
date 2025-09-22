/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

// 하위 컴포넌트 임포트
import ChangePassword from "./ChangePassword/ChangePassword";
import ChangeProfileImage from "./ChangeProfileImage/ChangeProfileImage";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import DeletePickList from "./DeletePickList/DeletePickList";
import Logout from "./Logout/Logout";

function Setting() {
  const [activeTab, setActiveTab] = useState("ChangePassword");

  const renderContent = () => {
    switch (activeTab) {
      case "ChangePassword":
        return <ChangePassword />;
      case "ChangeProfileImage":
        return <ChangeProfileImage />;
      case "DeleteAccount":
        return <DeleteAccount />;
      case "DeletePickList":
        return <DeletePickList />;
      case "Logout":
        return <Logout />;
      default:
        return <ChangePassword />;
    }
  };

  return (
    <div css={s.container}>
      <div css={s.inner}>
        <h1 css={s.title}>설정 페이지</h1>
        <div css={s.main}>
          {/* 메뉴 */}
          <div css={s.menu}>
            <button
              className={activeTab === "ChangePassword" ? "active" : ""}
              onClick={() => setActiveTab("ChangePassword")}
            >
              비밀번호 변경
            </button>
            <button
              className={activeTab === "ChangeProfileImage" ? "active" : ""}
              onClick={() => setActiveTab("ChangeProfileImage")}
            >
              프로필 이미지 변경
            </button>
            <button
              className={activeTab === "DeleteAccount" ? "active" : ""}
              onClick={() => setActiveTab("DeleteAccount")}
            >
              회원 탈퇴
            </button>
            <button
              className={activeTab === "DeletePickList" ? "active" : ""}
              onClick={() => setActiveTab("DeletePickList")}
            >
              찜 전체 삭제
            </button>
            <button
              className={activeTab === "Logout" ? "active" : ""}
              onClick={() => setActiveTab("Logout")}
            >
              로그아웃
            </button>
          </div>

          {/* 콘텐츠 */}
          <div css={s.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
