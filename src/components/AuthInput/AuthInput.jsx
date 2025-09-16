/** @jsxImportSource @emotion/react */
import * as s from "./styles";

// AuthInput 컴포넌트 정의
// props: type(입력 타입),
// placeholder(입력 안내 문구),
// state(현재 입력 값),
//setState(값을 업데이트하는 함수)
function AuthInput({ type, placeholder, state, setState, disabled }) {
  // input 값이 변경될 때 실행되는 이벤트 핸들러
  const onChangeHandler = (e) => {
    // 부모 컴포넌트에서 전달받은 setState 함수를 이용해 상태 업데이트
    setState(e.target.value);
  };

  return (
    <>
      <input
        css={s.input}
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={onChangeHandler}
        disabled={disabled}
      />
    </>
  );
}

export default AuthInput;
