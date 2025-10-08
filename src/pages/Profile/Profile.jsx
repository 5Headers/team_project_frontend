/** @jsxImportSource @emotion/react */

import * as s from "./styles";
import profileImage from "../../assets/기본프로필.png";
function Profile() {
  //   const [tabChild, setTabChild] = useState(1);

  //   const tabClickHandler = (path) => {
  //     setTabChild(path === "myboard" ? 1 : path === "changepassword" ? 2 : 3);
  //   };

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={profileImage} alt="profileImage" />
            </div>
          </div>

          <div css={s.profileInfoBox}>
            <h3>사용자 이름</h3>
            <div>
              <p>이메일 주소</p>
              <button>변경하기</button>
            </div>
          </div>
        </div>
        {/* <div css={s.profileBox}>
          <div css={s.profileTab(tabChild)}>
            <ul>
              <li onClick={() => tabClickHandler("myboard")}>내 게시물</li>
              <li onClick={() => tabClickHandler("changepassword")}>
                비밀번호 변경
              </li>
              <li onClick={() => tabClickHandler("changeprofileimg")}>
                프로필 이미지 변경
              </li>
            </ul>
          </div>
          <div css={s.profileMain}>
            <p>
              선택된 탭:{" "}
              {tabChild === 1
                ? "내 게시물"
                : tabChild === 2
                ? "비밀번호 변경"
                : "프로필 이미지 변경"}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Profile;
