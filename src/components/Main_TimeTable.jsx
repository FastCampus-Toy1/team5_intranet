import { styled } from 'styled-components';
import Main_WorkingModal from './Main_WorkingModal';
import Button from './Button';
import { useState, useEffect } from 'react';
import { db } from '../core/firebase';
import {collection, updateDoc, query, getDocs, addDoc, where, serverTimestamp, doc, and } from 'firebase/firestore';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 239px;
  height: 110.15px;

  font-family: 'Pretendard-Regular';
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  width: 75px;
  height: 57px;
`;

const InfoTitle = styled.h1`
  width: 75px;
  height: 24px;
  text-align: center;
`;

const Seperator = styled.p`
  display: flex;
  justify-content: center;
  
  width: 40px;
  height: 24px;
  
  font-size: 24px;
  color: #98A2B3;
`;

const InfoStatusSection = styled.div`
  display: flex;
  align-items: center;
  
  width: 67px;
  height: 19px;
`;

const InfoStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
`;

const InfoContent = styled.p`
  width: 70px;
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

    let [hour, minutes] = [date.getHours(), date.getMinutes()];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 === 0 ? 12 : hour % 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${ampm} ${hour}:${minutes}`;
  }

  const getTime = (doc) => {
    let time = null;

    if(doc === undefined) {
      time = formatTime();
    } else {
      const Date = doc.toDate();
      time = formatTime(Date);
    }

    return time;
  }

  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  }

  const clickModalButton = () => {
    openModal();
  }

  const clickOutsideOfModal = (ref, e) => {
    console.log(ref.current);
    console.log(e.target);
    
    if (ref.current === e.target) {
      // console.log(ref.current);
      // console.log(e.target);
      setModalOpen(false);
    }
  }

  const changeStatus = (time) => {
    if(workingStatus === true) {
      setWorkingStatus(false);
    } else {
      setWorkingStatus(true);
    }
    setWorkingTime(time);
  }

  const WorkProcess = async() => {
    const userID = getUserID();
    const todayDate = getDateInfo();
    const q = query(collection(db, "Attendance"), 
    and( where("userID", "==", userID),
    where("date", "==", todayDate)));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty) {
      setInfo(userID, todayDate);
      changeStatus(getTime());
    }
    else {
      querySnapshot.forEach((document) => {
        const endTime = document.data().end_time;

        if(endTime !== undefined ) {
          alert("오늘은 더이상 출근이 불가능합니다.");
        } else {
          updateInfo(doc(db, "Attendance", document.id), document.data());
          changeStatus(getTime(endTime));
        }
      });
    }
    // 모달 닫기
    closeModal();
  };

  const initComponent = async() => {
    const userID = getUserID();
    const todayDate = getDateInfo();
    const q = query(collection(db, "Attendance"), 
    and( where("userID", "==", userID),
    where("date", "==", todayDate)));
    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty) {
      querySnapshot.forEach((document) => {
        const endTime = document.data().end_time;
        const startTime = document.data().start_time;

        if(startTime !== undefined && endTime !== undefined) {
          return setWorkingTime(getTime(endTime));
        }
        if(startTime !== undefined && endTime === undefined) {
          return changeStatus(getTime(startTime));
        }
      });
    } else {
      querySnapshot.forEach((document) => {
        const startTime = document.data().start_time;

        return setWorkingTime(getTime(startTime));
      })
    }
  };

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
      <Button onClick={clickModalButton}>{!workingStatus ? "근무 시작" : "근무 종료"}</Button>
    </Section>
    <Main_WorkingModal isOpen={modalOpen} status={workingStatus} onClick={WorkProcess} time={getTime()} clickOutsideOfModal={clickOutsideOfModal}></Main_WorkingModal>
    </div>
  );
}

export default Main_TimeTable;