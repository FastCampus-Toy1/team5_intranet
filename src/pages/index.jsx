import React from "react";
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from "../components/Main_Notice.jsx";
import Header from "../components/Header.jsx";
import styled from "styled-components";
import checkLogin from "../components/CheckLogin.jsx";

function MainPage() {
  checkLogin();

  return (
    <BackGround>
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
    </BackGround>
  );
}

export default MainPage;

const BackGround = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #e7e8f0;
  position: fixed;
`;

const Screen = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 98vh;
  margin: 0 5vw;
  border-radius: 10px;
  background-color: #ebecf5;
`;

const Main = styled.section`
  display: flex;
  gap: 1rem;
`;

const Left = styled.div`
  flex-grow: 1;
`;

const ProfileWrapper = styled.div``;

const NoticeWrapper = styled.div`
  margin-top: 1.5rem;
`;

const Right = styled.div``;

const AbsenceWrapper = styled.div``;
