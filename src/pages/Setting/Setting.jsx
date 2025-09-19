/** @jsxImportSource @emotion/react */

import { useState } from "react";
import * as s from "./styles";
import ChangePassword from "./ChangePassword/ChangePassword";
import ChangeProfileImage from "./ChangeProfileImage/ChangeProfileImage";
import Logout from "./Logout/Logout";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import DeletePickList from "./DeletePickList/DeletePickList";

function Setting() {
  const [selectedTab, setSelectedTab] = useState("password");

  const renderTab = () => {
    switch (selectedTab) {
      case "password":
        return <ChangePassword />;
      case "profileImg":
        return <ChangeProfileImage />;
      case "deletePickList":
        return <DeletePickList />;
      case "logout":
        return <Logout />;
      case "deleteAccount":
        return <DeleteAccount />;
      default:
        return <p>유효하지 않은 탭입니다.</p>;
    }
  };

  return (
    <div css={s.container}>
      <div css={s.sidebar}>
        <ul>
          <li onClick={() => setSelectedTab("password")}>비밀번호변경</li>
          <li onClick={() => setSelectedTab("profileImg")}>
            프로필 이미지 변경
          </li>
          <li onClick={() => setSelectedTab("deletePickList")}>찜 전체 삭제</li>
          <li onClick={() => setSelectedTab("logout")}>로그아웃</li>
          <li onClick={() => setSelectedTab("deleteAccount")}>회원탈퇴</li>
        </ul>
      </div>

      <div css={s.mainContent}>{renderTab()}</div>
    </div>
  );
}

export default Setting;
