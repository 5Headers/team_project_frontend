/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import {
  findIdRequest,
  resetPasswordRequest,
} from "../../apis/account/accountApis";

function Find() {
  const [activeTab, setActiveTab] = useState("id");
  const [name, setName] = useState(""); // 아이디,비밀번호 찾기용 이름
  const [email, setEmail] = useState(""); // 공통 이메일
  const [userId, setUserId] = useState(""); // 아이디 찾기 결과
  

  // 아이디 찾기 버튼
  const findIdHandler = async () => {
    if (!name || !email) {
      alert("모든 항목을 입력하세요.");
      // setUserId("");
      return;
    }

    try {
      const response = await findIdRequest(name, email);
      if (response.data?.status === "success") {
        setUserId(response.data.data);
        alert("당신의 아이디는: " + response.data.data + "입니다.");
      } else {
        alert(response.data?.message || "아이디를 찾을 수 없습니다.");
        setUserId("");
      }
    } catch (error) {
      alert("서버 요청 중 오류가 발생했습니다.");
      setUserId("");
    }
  };

  // 비밀번호 재설정 버튼
  const resetPasswordHandler = async () => {
    if (!name || !email) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    try {
      const response = await resetPasswordRequest({ name, email });
      if (response.data?.status === "success") {
        alert("비밀번호 재설정 메일이 발송되었습니다.");
      } else {
        alert(response.data?.message || "비밀번호 재설정을 할 수 없습니다.");
      }
    } catch (error) {
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

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
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button css={s.submitButton} onClick={findIdHandler}>
              아이디 찾기
            </button>
          </div>
        ) : (
          <div css={s.inputBox}>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button css={s.submitButton} onClick={resetPasswordHandler}>
              비밀번호 재설정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Find;
