import React from 'react';
import styled from 'styled-components';
import settingImage from '../assets/settingIcon.png/'
import UserProfileImage from './UserProfileImage'


const Section = styled.div`
  width: 697px;
  height: 445px;
  border-radius: 10px;
  border: 2px solid #C8CCE5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  width: 659px;
  height: 38px;
  margin-top: 13px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
`

const HeaderH1 = styled.h1`
  font-size: 30px;
  font-family: 'Pretendard';
  font-weight: bold;
`

const HeaderSetting = styled.img`
  width: 25px;
  height: 25px;
`

function UserProfile() {
  return (
    <Section>
      <Header>
        <HeaderH1>유저 프로필</HeaderH1>
        <HeaderSetting src={settingImage}></HeaderSetting>
      </Header>
        <UserProfileImage></UserProfileImage>
    </Section>
  )
}

export default UserProfile;