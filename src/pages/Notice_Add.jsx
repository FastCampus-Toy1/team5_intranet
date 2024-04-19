import Notice_Add from "../components/Notice_Add.jsx";
import Header from "../components/Header.jsx";
import checkLogin from "../components/CheckLogin.jsx";
import { styled } from "styled-components";

function NoticeAdd() {

  // 로그인여부 체크
  checkLogin();

  return (
    <GlobalStyle>
      <Header />
      <Notice_Add />
    </GlobalStyle>
  );
}
export default NoticeAdd;

const GlobalStyle = styled.div`
  height: 100vh; 
  margin: 0;
  padding: 0;
  background-color: #EAECF5;
`;