import Notice from "../components/Notice.jsx";
import Header from "../components/Header.jsx";
import checkLogin from "../components/CheckLogin.jsx";

function NoticePage() {
    
  // 로그인여부 체크
  checkLogin();

  return (
    <>
      <Header />
      <Notice />
    </>
  );
}
export default NoticePage;