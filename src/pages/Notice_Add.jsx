import Notice_Add from "../components/Notice_Add.jsx";
import Header from "../components/Header.jsx";
import checkLogin from "../components/CheckLogin.jsx";

function NoticeAdd() {

  // 로그인여부 체크
  checkLogin();

  return (
    <>
      <Header />
      <Notice_Add />
    </>
  );
}
export default NoticeAdd;