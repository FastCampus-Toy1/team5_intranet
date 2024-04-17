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

const HeaderSetting = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Backdrop = styled.div`
  position: absolute; /* 부모 요소 기준으로 위치 지정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0; /* 모달보다 아래에 위치하도록 z-index 설정 */
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
    <Backdrop showModal={showModal} onClick={closeModal} /> {/* 모달이 열릴 때만 배경 레이어 표시 */}
    {showModal && <Main_UserInfo closeModal={closeModal} />}
  </Section>
);
}


//   return (
//     <Section>
//       <Header>
//         <HeaderH1>유저 프로필</HeaderH1>
//         <HeaderSetting src={settingImage}></HeaderSetting>
//       </Header>
//         <Main_UserProfileImage></Main_UserProfileImage>
//     </Section>
//   )
// };

export default Main_UserProfile;