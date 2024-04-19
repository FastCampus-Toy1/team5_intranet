import React from 'react';
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from '../components/Main_Notice.jsx';
import Header from '../components/Header.jsx';
import styled from 'styled-components';
import checkLogin from '../components/CheckLogin.jsx';

function MainPage() {

  // 로그인여부체크
  checkLogin();

  return (
    <>
      <Header />
      <BodyWrapper>
        <ProfileWrapper><Main_UserProfile /></ProfileWrapper>
        <AbsenceWrapper><UserAbsenceContainer /></AbsenceWrapper>
        <NoticeWrapper><Notice /></NoticeWrapper>
      </BodyWrapper>
    </>
  );
}

export default MainPage;

const BodyWrapper = styled.section`
  width: 95%;
  min-width: 600px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  position: absolute;
  left: 50px;
  margin: auto;
`;

const ProfileWrapper = styled.div`
  
`;
const AbsenceWrapper = styled.div``;
const NoticeWrapper = styled.div`
  position: absolute;
  top: 60%;
  
  @media  (max-width: 1350px) and (min-width: 600px) {
    top: 83%;
  }
`;