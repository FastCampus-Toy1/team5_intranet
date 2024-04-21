import React, { useState } from "react";
import styled from "styled-components";
import Main_UserProfileImage from "./Main_UserProfileImage";
import Main_UserInfo from "./Main_UserInfo";
import Main_TimeTable from "./Main_TimeTable.jsx";
import settingImage from "../assets/settingIcon.png/";

function Main_UserProfile() {
  const [showModal, setShowModal] = useState(false); // 모달 열림 여부 상태 관리

  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ProfileSection>
      <ProfileHeader>
        <ProfileH1>유저 프로필</ProfileH1>
        <SettingImg src={settingImage} onClick={openModal}></SettingImg>
      </ProfileHeader>
      <Main_UserProfileImage></Main_UserProfileImage>
      <ProfileContentDiv>
        <ProfileH2>신콩이</ProfileH2>
        <ProfileH3>Frontend</ProfileH3>
      </ProfileContentDiv>
      <Main_TimeTable></Main_TimeTable>
      <Backdrop $showModal={showModal} onClick={closeModal} />{" "}
      {/* 모달이 열릴 때만 배경 레이어 표시 */}
      {showModal && <Main_UserInfo closeModal={closeModal} />}
    </ProfileSection>
  );
}

export default Main_UserProfile;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-width: 200px;
  min-height: 360px;
  border: 2px solid #c8cce5;
  border-radius: 10px;
  background-color: #ffffff;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProfileContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 155px;
  margin: 30px 0 10px 0;
`;

const ProfileH1 = styled.h1`
  margin: 20px;
  font-size: 30px;
  font-weight: 700;
`;

const ProfileH2 = styled.h2`
  font-size: 26px;
  font-weight: 700;
`;

const ProfileH3 = styled.h3`
  font-size: 20px;
  color: gray;
`;

const SettingImg = styled.img`
  padding: 2.5px;
  margin: 20px;
`;

const Backdrop = styled.div`
  display: ${({ $showModal }) =>
    $showModal ? "block" : "none"}; /* showModal 상태에 따라 표시 여부 설정 */
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2; /* 모달(10)보다 아래에 위치 */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
