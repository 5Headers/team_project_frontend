/** @jsxImportSource @emotion/react */
import { FiMenu } from "react-icons/fi";
import * as s from "./styles";
import { DiAptana } from "react-icons/di";

function Header() {
  return (
    <div css={s.container}>
            <div css={s.header}>
        <div>
            <ul>
                <li
                css={s.headerIcon}>
                    <FiMenu />
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li css={s.login}>로그인</li>
                <li css={s.signup}>회원가입</li>
                <li css={s.headerIcon}><DiAptana /></li>
            </ul>
        </div>
    </div>
    </div>
    
  )
}

export default Header