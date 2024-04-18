import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Main_UserProfileImage from './Main_UserProfileImage';
import Main_UserInfoInput from './Main_UserInfoInput';

const UserInfo = styled.div`
  width: 570px;
  border: 1px solid #C8CCE5;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard';
  background-color: white;
  z-index: 1;
`;

const Header = styled.div`
  width: 550px;
  height: 38px;
  margin-top: 13px;
  margin-left: 15px;
  font-size: 30px;
  font-weight: bold;
`;

const SectionH2 = styled.h2`
  width: 480px;
  display: block;
  margin-bottom: 20px;  
  font-size: 20px;
  font-weight: bold;
`;

const SectionBox1 = styled.div`
  width: 520px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #C8CCE5;
  box-sizing: border-box;
`;

const SectionBox2 = styled.div`
  width: 520px;
  height: 190px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #C8CCE5;
  box-sizing: border-box;
`;

const SectionBox3 = styled.div`
  width: 520px;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 컴포넌트 받으면 지울 거 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const TempoBtn = styled.div`
  width: 100px;
  height: 40px;
  margin: 25px;
  border: 1px solid #C8CCE5;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 컴포넌트 받으면 지울 거 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



function Main_UserInfo() {
  return (
    <UserInfo>
      <Header>회원 정보 수정</Header>
      <Main_UserProfileImage></Main_UserProfileImage>
      <SectionBox1>
        <TempoBtn>변경</TempoBtn>
        <TempoBtn>삭제</TempoBtn>
      </SectionBox1>
      <SectionBox2>
        <SectionH2>계정</SectionH2>
        <Main_UserInfoInput labelText="이메일" value="test@test.com" readOnly={true}></Main_UserInfoInput>
        <Main_UserInfoInput labelText="이름" value="신콩이" readOnly={true}></Main_UserInfoInput>
      </SectionBox2>
      <SectionBox3>
        <SectionH2>비밀번호 변경</SectionH2>
        <Main_UserInfoInput labelText="비밀번호" placeholderText="새 비밀번호를 입력하세요."></Main_UserInfoInput>
        <Main_UserInfoInput labelText="비밀번호 확인" placeholderText="새 비밀번호를 한번 더 입력하세요."></Main_UserInfoInput>
      </SectionBox3>
      <TempoBtn>등록</TempoBtn>
    </UserInfo>
  )
};

export default Main_UserInfo; 