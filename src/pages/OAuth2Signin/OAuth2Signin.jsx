import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function OAuth2Signin() {
  // URL의 쿼리 파라미터 가져오기 (예: accessToken)
  const [searchParam] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터에서 accessToken 가져와 로컬스토리지에 저장
    localStorage.setItem("accessToken", searchParam.get("accessToken"));

    // 저장 후 홈페이지("/")로 리다이렉트
    window.location.href = "/";
  }, [searchParam]); // searchParam이 바뀌면 실행

  return <div></div>;
}

export default OAuth2Signin;
