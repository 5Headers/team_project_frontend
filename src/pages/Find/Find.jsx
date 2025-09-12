/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

function Find() {
  const [activeTab, setActiveTab] = useState("id");
  return (
    <div css={s.container}>
      <h2>계정 찾기</h2>
      {/* 탭 버튼 */}
      <div css={s.tabBox}>
        <button
          css={[s.tabButton, activeTab === "id" && s.activeTab]}
          onClick={() => setActiveTab("id")}
        >
          아이디 찾기
        </button>
        <button
          css={[s.tabButton, activeTab === "password" && s.activeTab]}
          onClick={() => setActiveTab("password")}
        >
          비밀번호 찾기
        </button>
      </div>

      {/* 탭 내용 */}
      <div css={s.contentBox}>
        {activeTab === "id" ? (
          <div css={s.inputBox}>
            <input type="text" placeholder="이름 입력" />
            <input type="email" placeholder="이메일 입력" />
            <button css={s.submitButton}>아이디 찾기</button>
          </div>
        ) : (
          <div css={s.inputBox}>
            <input type="text" placeholder="아이디 입력" />
            <input type="email" placeholder="이메일 입력" />
            <button css={s.submitButton}>비밀번호 재설정</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Find;
