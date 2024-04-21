import Notice from "../components/Notice.jsx";
import Header from "../components/Header.jsx";
import checkLogin from "../components/CheckLogin.jsx";
import { styled } from "styled-components";

function NoticePage() {
    
  // 로그인여부 체크
  checkLogin();

  return (
    <GlobalStyle>
      <Header />
      <Notice />
    </GlobalStyle>
  );
}
export default NoticePage;

const GlobalStyle = styled.div`
  height: 100%; 
  margin: 0;
  padding: 0;
  background-color: #EAECF5;
`;