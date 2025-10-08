import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function OAuth2Signin() {
  const [searchParam] = useSearchParams();

  useEffect(() => {
    const token = searchParam.get("accessToken");

    if (token && token !== "null" && token !== "undefined") {
      localStorage.setItem("accessToken", token);
      window.location.href = "/";
    } else {
      console.error("⚠️ 잘못된 accessToken:", token);
      localStorage.removeItem("accessToken"); // 혹시 잘못 저장된 값 있으면 제거
      window.location.href = "/auth/signin";
    }
  }, [searchParam]);

  return <div>로그인 처리중...</div>;
}

export default OAuth2Signin;
