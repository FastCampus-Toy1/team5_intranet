import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../core/firebase";
import { getDocs, collection, where } from "firebase/firestore";
import styled from "styled-components";
import Button from "./Button";
import React from "react";

function AbsenceSubmitHistory() {
  const [upComingAbsenceList, setUpcomingAbsenceList] = useState([]);
  const [futureAbsenceList, setFutureAbsenceList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const navigate = useNavigate();

  const dateDifferenceCalc = (absenceStartDate) => {
    const today = new Date().getTime();
    const gap = new Date(absenceStartDate).getTime() - today;
    return Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
  };

  const untilDDay = dateDifferenceCalc(
    new Date(upComingAbsenceList[currentIdx]?.startDate).getTime()
  );

  const status = (num) => {
    return num >= 14 ? "승인 전" : num >= 7 ? "승인" : "거절";
  };

  async function LoadAbsence() {
    const ABSENCE_COLLECTION = collection(db, "Absence");
    const newLoadAbsence = [];
    const USER_ID = sessionStorage.getItem("userID")
      ? sessionStorage.getItem("userID")
      : "testid";
    try {
      const querySnapshot = await getDocs(
        ABSENCE_COLLECTION,
        where("userID", "==", USER_ID)
      );
      querySnapshot.forEach((doc) => {
        newLoadAbsence.push({
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          absenceOption: doc.data().absenceOption,
        });
      });
    } catch (error) {
      console.log("LoadAbsenceHistory에 에러 발생");
      console.log(error);
    }
    newLoadAbsence.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
    setUpcomingAbsenceList(
      newLoadAbsence.filter(
        (absence) =>
          dateDifferenceCalc(absence.startDate) > 0 &&
          dateDifferenceCalc(absence.startDate) <= 14
      )
    );
    setFutureAbsenceList(
      newLoadAbsence.filter(
        (absence) => dateDifferenceCalc(absence.startDate) > 14
      )
    );
  }
  useEffect(() => {
    LoadAbsence();
  }, []);

  // useEffect(() => {
  //   let time = setInterval(() => {
  //     setCurrentIdx((prev) => (prev + 1) % upComingAbsenceList.length);
  //   }, 2000);

  //   return () => {
  //     clearInterval(time);
  //   };
  // }, [upComingAbsenceList.length]);

  return (
    <AbsenceHistoryContainer>
      {upComingAbsenceList[0] || futureAbsenceList[0] ? (
        <>
          <UpcomingAbsence>
            {upComingAbsenceList[0] ? (
              <>
                <AbsenceOption>
                  {upComingAbsenceList[currentIdx].absenceOption}
                  <SubmitStatus props={untilDDay}>
                    {status(untilDDay)}
                  </SubmitStatus>
                </AbsenceOption>
                <UpcomingDate>
                  {upComingAbsenceList[currentIdx].startDate}
                  {upComingAbsenceList[currentIdx].endDate && (
                    <>
                      <span>~</span>
                      <span>{upComingAbsenceList[currentIdx].endDate}</span>
                    </>
                  )}
                  <DDay>D - {untilDDay}</DDay>
                </UpcomingDate>
                <Button
                  onClick={() => {
                    navigate("/attendance");
                  }}
                >
                  더보기
                </Button>
              </>
            ) : (
              <Caution>2주간 휴가는 없습니다.</Caution>
            )}
          </UpcomingAbsence>
          <FutureAbsenceHistoryList>
            {futureAbsenceList.map((list, index) => (
              <FutureAbsence key={index}>
                <span>{list.startDate}</span>
                {list.endDate && (
                  <>
                    <span>~</span>
                    <span>{list.endDate}</span>
                  </>
                )}
                <span>{list.absenceOption}</span>
              </FutureAbsence>
            ))}
          </FutureAbsenceHistoryList>
        </>
      ) : (
        <Caution>앞으로 휴가는 없으니 열심히 일하세요.</Caution>
      )}
    </AbsenceHistoryContainer>
  );
}

export default AbsenceSubmitHistory;

const AbsenceHistoryContainer = styled.div`
  border: 2px solid #c8cce5;
  border-radius: 10px;
  width: 555px;
  height: 440px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const UpcomingAbsence = styled.div`
  width: 100%;
  height: 85px;
  border-bottom: 2px solid #c8cce5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 4%;
  box-sizing: border-box;
`;

const AbsenceOption = styled.span`
  position: relative;
  width: 7rem;
  text-align: center;
`;

const SubmitStatus = styled.span`
  background-image: ${(props) =>
    +props.untilDDay >= 14
      ? "linear-gradient(3deg, #2E90FA, #175CD3)"
      : +props.untilDDay >= 7
      ? "linear-gradient(3deg, #32D583, #039855)"
      : "linear-gradient(3deg, #F97066, #D92D20)"};
  border-radius: 10px;
  width: 2.4rem;
  height: 0.7rem;
  font-size: 0.5rem;
  padding-top: 0.3rem;
  color: white;
  text-align: center;
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
`;

const UpcomingDate = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1em;
  font-size: 20px;
`;

const DDay = styled.div`
  border: 2px solid #c8cce5;
  border-radius: 10px;
  width: 40px;
  padding: 1px 0;
  font-size: 10px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const FutureAbsenceHistoryList = styled.ul`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FutureAbsence = styled.li`
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;
`;

const Caution = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
