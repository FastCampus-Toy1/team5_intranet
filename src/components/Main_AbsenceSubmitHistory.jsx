import styled from "styled-components";
import Button from "./Button";
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../core/firebase";
import { getDocs, collection, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AbsenceSubmitHistory() {
  const [upComingAbsenceList, setUpcomingAbsenceList] = useState([]);
  const [futureAbsenceList, setFutureAbsenceList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const navigate = useNavigate();
  const dateDifferenceCalc = (absenceStartDate) => {
    const TODAY = new Date().getTime();
    const UNTIL_DDAY = new Date(absenceStartDate).getTime() - TODAY;
    return Math.floor(UNTIL_DDAY / (1000 * 60 * 60 * 24)) + 1;
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
      {upComingAbsenceList[0] || futureAbsenceList[0] ? (
        <>
          <UpcomingAbsence>
            {upComingAbsenceList[0] ? (
              <>
                  <Description>UpComing
                  <Button
                    onClick={() => {
                      navigate("/attendance");
                    }}
                  >
                    더보기
                  </Button>
                  </Description>
                <UpcomingDate>
                  <StartDate>
                    <DDay>
                      D -{" "}
                      {dateDifferenceCalc(
                        new Date(
                          upComingAbsenceList[currentIdx].startDate
                        ).getTime()
                      )}
                    </DDay>
                    {upComingAbsenceList[currentIdx].startDate}
                  </StartDate>
                  {upComingAbsenceList[currentIdx].endDate && (
                    <>
                      <span>~</span>
                      <EndDate>
                        <span>{upComingAbsenceList[currentIdx].endDate}</span>
                      </EndDate>
                      <span>
                        {upComingAbsenceList[currentIdx].absenceOption}
                      </span>
                    </>
                  )}
                </UpcomingDate>
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
  margin-right: 0.5em;
  display: flex;
  gap: 1em;
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
