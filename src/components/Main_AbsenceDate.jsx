import React, { useEffect, useState } from "react";
import styled from "styled-components";

function AbsenceDate({ props }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);
  const [absenceGuide, setAbsenceGuide] = useState(`-`);

  const dateToString = (dateObj) => {
    let dateStr;
    try {
      dateStr = dateObj.toISOString().slice(0, 10);
    } catch (error) {
      console.log(error);
      console.log(
        "Main_AbsenceDate.jsx 파일에 dateToString() 함수에 오류 발생"
      );
    }
    return dateStr;
  };
  useEffect(() => {
    const usedVacation = (endDate - startDate) / 1000 / 60 / 60 / 24 + 1;
    if (startDate < currentTime) {
      setAbsenceGuide("오늘보다 이릅니다");
    } else if (!props.isVacation) {
      setAbsenceGuide("-");
      props.setUseVacation(0);
      props.setStartAbsenceDate(dateToString(startDate));
      props.setEndAbsenceDate(dateToString(startDate));
      props.setIsValidAbsence(true);
    } else if (props.remainingVacation < usedVacation) {
      setAbsenceGuide("보유한 연차보다 쉬는날이 많습니다.");
    } else if (
      startDate.getFullYear() === currentTime.getFullYear() &&
      startDate.getMonth() === currentTime.getMonth() &&
      startDate.getDate() === currentTime.getDate()
    ) {
      setAbsenceGuide("당일 휴가사용 금지");
    } else if (endDate < startDate) {
      setAbsenceGuide("휴가 시작 날보다 끝나는 날이 이릅니다");
    } else if (endDate >= startDate) {
      setAbsenceGuide(
        `휴가 ${usedVacation}일 사용(남는 휴가:${
          props.remainingVacation - usedVacation
        }일)`
      );
      props.setUseVacation(usedVacation);
      props.setStartAbsenceDate(dateToString(startDate));
      props.setEndAbsenceDate(dateToString(endDate));
      props.setIsValidAbsence(true);
    }
  }, [startDate, endDate, props.isVacation, props.isSubmit]);

  return (
    <DateSettingContainer>
      <InputDateContainer>
        <InputAbsenceDate
          type="date"
          value={dateToString(startDate)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setStartDate(new Date(e.target.value));
            console.log(new Date(e.target.value))
          }}
        ></InputAbsenceDate>
        <span> ~ </span>
        <InputAbsenceDate
          disabled={!props.isVacation}
          type="date"
          value={dateToString(props.isVacation ? endDate : startDate)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setEndDate(new Date(e.target.value));
          }}
        ></InputAbsenceDate>
      </InputDateContainer>
      <ValidAbsence>{absenceGuide}</ValidAbsence>
    </DateSettingContainer>
  );
}

export default AbsenceDate;

const DateSettingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const InputDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputAbsenceDate = styled.input`
  width: 12rem;
  height: 2rem;
  font-size: 1.2rem;
  text-align: center;
  border: 2px solid #b6c2e2;
  border-radius: 10px;
`;
const ValidAbsence = styled.div`
  text-align: center;
  font-size: 0.9rem;
`;
