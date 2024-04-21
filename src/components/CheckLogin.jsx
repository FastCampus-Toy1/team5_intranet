import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function checkLogin() {

  const session = window.sessionStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

    // 현재 로그인 중인지 체크
    if (!session) {
        //로그인 화면으로 이동
      useEffect (() => {
        navigate("/login");
      },[]);
    }
}
