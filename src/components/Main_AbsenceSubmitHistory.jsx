import styled from "styled-components";

import React from "react";
import { useEffect, useState } from "react";
import { db } from "../core/firebase";
import { getDocs, collection } from "firebase/firestore";

function AbsenceSubmitHistory() {
  const [upComingAbsenceList, setUpcomingAbsenceList] = useState([]);
  const [futureAbsenceList, setFutureAbsenceList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const dateDifferenceCalc = (absenceStartDate) => {
    const today = new Date().getTime();
    const gap = new Date(absenceStartDate).getTime() - today;
    return Math.floor(gap / (1000 * 60 * 60 * 24)) + 1;
  };

  async function LoadAbsence() {
    const MEMBER_COLLECTION = "Members";
    const newLoadAbsence = [];
    try {
      const querySnapshot = await getDocs(collection(db, MEMBER_COLLECTION));
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
        (absence) => dateDifferenceCalc(absence.startDate) > 0 && dateDifferenceCalc(absence.startDate) <= 14
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

  useEffect(() => {
    let time = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % upComingAbsenceList.length);
    }, 2000);

    return () => {
      clearInterval(time);
    };
  }, [upComingAbsenceList.length]);

  return (
    <AbsenceHistoryContainer>
      <UpcomingAbsence>
        <Description>UpComing</Description>
        <UpcomingDate>
          {upComingAbsenceList[currentIdx] ? (
            <>
              <StartDate>
                <DDay>D - {dateDifferenceCalc(new Date(upComingAbsenceList[currentIdx].startDate).getTime())}</DDay>
                {upComingAbsenceList[currentIdx].startDate}
              </StartDate>
              <span>~</span>
              <EndDate>{upComingAbsenceList[currentIdx].endDate}</EndDate>
            </>
          ) : (
            <span></span>
          )}
        </UpcomingDate>
      </UpcomingAbsence>
      <FutureAbsenceHistoryList>
        {futureAbsenceList.map((list, index) => (
          <FutureAbsence key={index}>
            <span>{list.startDate}</span>
            <span>~</span>
            <span>{list.endDate}</span>
            <span>{list.absenceOption}</span>
          </FutureAbsence>
        ))}
      </FutureAbsenceHistoryList>
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
  width: 101%;
  height: 85px;
  border: 2px solid #c8cce5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: -0.5%;
  top: -2px;
  box-sizing: border-box;
`;

const Description = styled.span`
  font-size: 40px;
  margin-left: 10px;
`;

const UpcomingDate = styled.div`
  margin-right: 30px;
  display: flex;
  gap: 2em;
  font-size: 20px;
`;
const StartDate = styled.div`
  position: relative;
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

const EndDate = styled.div``;

const FutureAbsenceHistoryList = styled.ul`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  gap: 2rem;
`;

const FutureAbsence = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;
`;
