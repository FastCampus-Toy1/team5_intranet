import React from "react";
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from "../components/Main_Notice.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import checkLogin from "../components/CheckLogin.jsx";

function MainPage() {
  // 로그인여부체크
  checkLogin();

  return (
    <Screen>
      <Header />
      <Main>
        <Left>
          <ProfileWrapper>
            <Main_UserProfile />
          </ProfileWrapper>
          <NoticeWrapper>
            <Notice />
          </NoticeWrapper>
        </Left>
        <Right>
          <AbsenceWrapper>
            <UserAbsenceContainer />
          </AbsenceWrapper>
        </Right>
      </Main>
    </Screen>
  );
}

export default MainPage;

const Screen = styled.section`
  display: flex;
  flex-direction: column;
  width: 95vw;
  height: 98vh;
  border-radius: 10px;
  margin: 0 auto;
  background-color: #EAECF5;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const Main = styled.section`
  /* width: 95%; */
  height: 90vh;
  /* min-width: 600px; */
  display: flex;
  /* justify-content: center; */
  /* flex-wrap: wrap; */
  gap: 1.5rem;
`;

const Left = styled.div`
  flex-grow: 1;
`;

const ProfileWrapper = styled.div`
  background-color: #FFFFFF;
`;

const NoticeWrapper = styled.div`
margin-top: 1.5rem;
background-color: #FFFFFF;
  /* position: absolute; */
  /* top: 60%; */
  /* @media (max-width: 1350px) and (min-width: 600px) {
    top: 83%;
  } */
`;



const Right = styled.div`
`;


const AbsenceWrapper = styled.div``;
