import { styled } from 'styled-components';
import Main_WorkingModal from './Main_WorkingModal';
import Button from './Button';
import { useState, useEffect } from 'react';
import { db } from '../core/firebase';
import {collection, updateDoc, query, getDocs, addDoc, where, serverTimestamp, doc, and } from 'firebase/firestore';

const Section = styled.div`
  width: 239px;
  height: 110.15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular';
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoSection = styled.div`
  width: 75px;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoTitle = styled.h1`
  width: 75px;
  height: 24px;
  text-align: center;
`;

const Seperator = styled.p`
  width: 40px;
  display: flex;
  justify-content: center;
  height: 24px;
  font-size: 24px;
  color: #98A2B3;
`;

const InfoStatusSection = styled.div`
  width: 67px;
  height: 19px;
  display: flex;
  align-items: center;
`;

const InfoStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
`;

const InfoContent = styled.p`
  width: 65px;
  height: 17px;
  text-align: center;
`;

function Main_TimeTable() {
  const [workingStatus, setWorkingStatus] = useState(false);
  const [workingTime, setWorkingTime] = useState('-');
  const [modalOpen, setModalOpen] = useState(false);

  async function setInfo(userID, todayDate) {
    const docData = {
      userID: userID,
      date: todayDate,
      start_time: serverTimestamp(),
    };

    await addDoc(collection(db, "Attendance"), docData);
  }

  async function updateInfo(ref, documentdata) {
    const docData = {
      ...documentdata,
      end_time: serverTimestamp(),
    }
    await updateDoc(ref, docData);
  }
  
  function getUserID() {
    const userID = sessionStorage.getItem('userID');

    try{
      userIDException(userID);
      return userID;
    } catch(error) {
      console.log(error.message);
    }
  }

  function userIDException(userID) {
    if(userID === undefined) {
      throw new Error("[ERROR] Session Storage에 해당 정보는 없습니다.");
    }
  }

  function getDateInfo() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day: '0' + day;

    return `${year}${month}${day}`;
  }
  
  function formatTime(docDate) {
    let date = null;

    if(docDate === undefined) {
      date = new Date();
    } else {
      date = new Date(docDate);
    }

    let hour = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 === 0 ? 12 : hour % 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${ampm} ${hour}:${minutes}`;
  }

  function getTime(doc) {
    let startTime = null;

    if(doc === undefined) {
      startTime = formatTime();
    } else {
      const startDate = doc.toDate();
      startTime = formatTime(startDate);
    }

    return startTime;
  }

  function clickStartButton() {
    openModal();
  }

  // 모달 열기 함수
  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  }

  function changeStatus(time) {
    if(workingStatus === true) {
      setWorkingStatus(false);
      setWorkingTime(time);
    } else {
      setWorkingStatus(true);
      setWorkingTime(time);
    }
  }

  async function WorkProcess() {
    const userID = getUserID();
    const todayDate = getDateInfo();
    const q = query(collection(db, "Attendance"), 
    and( where("userID", "==", userID),
    where("date", "==", todayDate)));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) {
      setInfo(userID, todayDate);
      changeStatus(getTime());
    } else {
      querySnapshot.forEach((document) => {
        if(document.data().end_time !== undefined ) {
          alert("오늘은 더이상 출근이 불가능합니다.");
        } else {
          updateInfo(doc(db, "Attendance", document.id), document.data());
          changeStatus(getTime(document.data().end_time));
        }
      });
    }
    closeModal();
    };

    async function initComponent() {
      const userID = getUserID();
      const todayDate = getDateInfo();
      const q = query(collection(db, "Attendance"), 
      and( where("userID", "==", userID),
      where("date", "==", todayDate)));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty) {
        querySnapshot.forEach((document) => {
          if(document.data().end_time !== undefined && document.data().startTime === undefined) {
            setWorkingTime(getTime(document.data().end_time));
          } 
          else if(document.data().end_time !== undefined && document.data().startTime !== undefined){
            setWorkingTime(getTime(document.data().end_time));
          } else {
            changeStatus(getTime(document.data().start_time));
          }
        });
      }
    }
    useEffect(() => {
      initComponent();
    }, []);

  return(
    <div>
    <Section>
      <InfoContainer>
        <InfoSection>
          <InfoTitle>{!workingStatus ? "퇴근 시간" : "출근 시간"}</InfoTitle>
          <InfoContent>{workingTime}</InfoContent>
        </InfoSection>
        <Seperator>|</Seperator>
        <InfoSection>
          <InfoTitle>근무 현황</InfoTitle>
          <InfoStatusSection>
            <InfoStatus style={{ backgroundColor: !workingStatus ? "red" : "green" }}></InfoStatus>
            <InfoContent>{!workingStatus ? "근무 전" : "근무 중"}</InfoContent>
          </InfoStatusSection>
        </InfoSection>
      </InfoContainer>
      <Button onClick={clickStartButton}>{!workingStatus ? "근무 시작" : "근무 종료"}</Button>
    </Section>
    <Main_WorkingModal isOpen={modalOpen} status={workingStatus} onClick={WorkProcess} time={getTime()}></Main_WorkingModal>
    </div>
  );
}

export default Main_TimeTable;