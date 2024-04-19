import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

  const session = window.sessionStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

    // 현재 로그인 중인지 체크
    if (session) { 
      if (confirm('로그아웃 하시겠습니까?')) {
        // 세션스토리지 클리어
        window.sessionStorage.removeItem('isLoggedIn');  
        window.sessionStorage.removeItem('userID');  
        window.sessionStorage.removeItem('userName');  
        //로그인 화면으로 이동
        useEffect (() => {
          navigate("/login");
        },[]);
      // 로그아웃을 취소하면 원래 있던 화면으로 돌려보낸다.
      } else {
        useEffect (() => {
          navigate(-1);
        },[]);
      }
  //  로그인 상태가 아님
  } else {
    //로그인 화면으로 이동
    useEffect (() => {
      navigate("/login");
    },[]);
  }
  return;
}