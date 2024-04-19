import React, { useState } from 'react';
import styled from 'styled-components';
import settingImage from '../assets/settingIcon.png/';
import Main_UserProfileImage from './Main_UserProfileImage';
import Main_UserInfo from './Main_UserInfo';

const Section = styled.div`
  width: 697px;
  height: 445px;
  border-radius: 10px;
  border: 2px solid #C8CCE5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 659px;
  height: 38px;
  margin-top: 13px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
`;

const HeaderH1 = styled.h1`
  font-size: 30px;
  font-family: 'Pretendard';
  font-weight: bold;
`;

const HeaderH2 = styled.h2`
  font-size: 20px;
  font-family: 'Pretendard';
  color: gray;
`;

const HeaderSetting = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const SectionBox1 = styled.div`
  width: 180px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0; /* 모달(1)보다 아래에 위치 */
  display: ${({ showModal }) => (showModal ? 'block' : 'none')}; /* showModal 상태에 따라 표시 여부 설정 */
`;

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
  <Section>
    <Header>
      <HeaderH1>유저 프로필</HeaderH1>
      <HeaderSetting src={settingImage} onClick={openModal}></HeaderSetting>
    </Header>

    <Main_UserProfileImage></Main_UserProfileImage>
    <SectionBox1>
      <HeaderH1>신콩이</HeaderH1>
      <HeaderH2>Frontend</HeaderH2>
    </SectionBox1>

    <Backdrop $showModal={showModal} onClick={closeModal} /> {/* 모달이 열릴 때만 배경 레이어 표시 */}
    {showModal && <Main_UserInfo closeModal={closeModal} />}
  </Section>
);
}

export default Main_UserProfile;