/** @jsxImportSource @emotion/react */

import { useState } from "react";
import * as s from "../styles";

function ChangePassword() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  const handleChange = () => {
    if (!currentPwd || !newPwd) {
      alert("모든 필드를 입력해주세요");
      return;
    }
    alert("비밀번호가 변경되었습니다.");
  };

  return (
    <div css={s.container}>
      <div css={s.inner}>
        <h2>비밀번호 변경</h2>
        <input
          css={s.input}
          type="password"
          placeholder="현재 비밀번호"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
        />
        <input
          css={s.input}
          type="password"
          placeholder="새로운 비밀번호"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <button css={s.button} onClick={handleChange}>
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
