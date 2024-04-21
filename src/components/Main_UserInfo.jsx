import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Main_UserProfileImage from './Main_UserProfileImage';
import Main_UserInfoInput from './Main_UserInfoInput';
import Button from './Button';

import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../core/firebase'; // Firebase 설정 파일에서 db를 가져옵니다.


function Main_UserInfo() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (password === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  const handleButtonClick = async () => {
    console.log('Password:', password); // password 값 출력
    console.log('Confirm Password:', confirmPassword); // confirmPassword 값 출력
  
    if (password === '' || confirmPassword === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    const userID = window.sessionStorage.getItem('userID'); // 세션 스토리지에서 userID 가져오기
    const q = query(collection(db, 'User'), where('userID', '==', userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        PW: password,
      });
    });
  
    if (password !== '') {
      alert('비밀번호가 변경되었습니다.'); // 비밀번호 변경 성공 alert
    }
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <UserInfo>
      <Header>회원 정보 수정</Header>
      <Main_UserProfileImage></Main_UserProfileImage>
      <SectionBox1>
        <Button>변경</Button>
        <Button>삭제</Button>
      </SectionBox1>
      <SectionBox2>
        <SectionH2>계정</SectionH2>
        <Main_UserInfoInput labelText="이메일" value="test@test.com" disabled={true}></Main_UserInfoInput>
        <Main_UserInfoInput labelText="이름" value="신콩이" disabled={true}></Main_UserInfoInput>
      </SectionBox2>
      <SectionBox3>
        <SectionH3>비밀번호 변경</SectionH3>
        <Main_UserInfoInput labelText="비밀번호" placeholderText="새 비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)}></Main_UserInfoInput>
        <Main_UserInfoInput labelText="비밀번호 확인" placeholderText="새 비밀번호를 한번 더 입력하세요." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Main_UserInfoInput>
      </SectionBox3>
      <TempoBtn disabled={isButtonDisabled} onClick={handleButtonClick}>등록</TempoBtn>
    </UserInfo>
  )
};

export default Main_UserInfo; 

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;

  width: 50vw;
  min-width: 500px;
  height: 90vh;
  border: 1px solid #C8CCE5;
  border-radius: 10px;
  box-sizing: border-box;
  
  background-color: white;

  transform: translate(-50%, -50%);
`;

const Header = styled.div`
  width: 95%;
  height: 38px;
  margin-top: 13px;
  margin-left: 15px;

  font-size: 30px;
  font-weight: bold;
`;

const SectionH2 = styled.h2`
  display: block;
  
  width: 95%;
  margin-bottom: 20px;  

  font-size: 20px;
  font-weight: bold;
`;

const SectionBox1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  width: 92%;
  height: 80px;
  border-bottom: 1px solid #C8CCE5;
  box-sizing: border-box;
`;

const SectionBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 92%;
  height: 190px;
  margin: 10px;
  border-bottom: 1px solid #C8CCE5;
  box-sizing: border-box;
`;

const SectionBox3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 92%;
  height: 190px;
  box-sizing: border-box;
`;

const SectionH3 = styled.h2`
  display: block;
  width: 95%;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

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