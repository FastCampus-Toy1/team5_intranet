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
    <>
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
    </>
  );
}

export default MainPage;

const Main = styled.section`
  width: 95%;
  height: 90vh;
  /* min-width: 600px; */
  display: flex;
  /* flex-wrap: wrap; */
  gap: 20px;
  margin: auto;
`;
const Left = styled.div``;
const Right = styled.div``;

const ProfileWrapper = styled.div``;
const AbsenceWrapper = styled.div``;
const NoticeWrapper = styled.div`
  /* position: absolute; */
  /* top: 60%; */
  /* @media (max-width: 1350px) and (min-width: 600px) {
    top: 83%;
  } */
`;
