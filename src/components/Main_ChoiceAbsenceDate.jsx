import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ChoiceAbsenceDate({ props }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);
  const [isValidAbsence, setIsValidAbsence] = useState("");

  const dateToString = (dateObj) => {
    let dateStr;
    try {
      dateStr = dateObj.toISOString().slice(0, 10);
    } catch (error) {
      console.log(error);
      console.log(
        "Main_ChoiceAbsenceDate.jsx 파일에 dateToString() 함수에 오류 발생"
      );
    }
    return dateStr;
  };
  useEffect(() => {
    console.log(props.useVacation);
    if (props.useVacation === false) {
      setIsValidAbsence("-");
    } else if (
      startDate.getFullYear() === currentTime.getFullYear() &&
      startDate.getMonth() === currentTime.getMonth() &&
      startDate.getDate() === currentTime.getDate()
    ) {
      setIsValidAbsence("당일 휴가사용 금지");
    } else if (startDate < currentTime) {
      setIsValidAbsence("오늘보다 이릅니다");
    } else if (endDate < startDate) {
      setIsValidAbsence("휴가 시작 날보다 끝나는 날이 이릅니다");
    } else if (endDate >= startDate) {
      const usedVacation = (endDate - startDate) / 1000 / 60 / 60 / 24 + 1;
      setIsValidAbsence(`휴가 ${usedVacation}일 사용`);
      props.setStartAbsenceDate(dateToString(startDate));
      props.setEndAbsenceDate(dateToString(endDate));
      props.setIsValidAbsence(true);
    }
  }, [startDate, endDate, props.useVacation]);

  return (
    <DateSettingContainer>
      <InputDateContainer>
        <InputAbsenceDate
          className="start__absence__date"
          type="date"
          value={dateToString(startDate)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setStartDate(new Date(e.target.value));
          }}
        ></InputAbsenceDate>
        <span> ~ </span>
        <InputAbsenceDate
          className="end__absence__date"
          type="date"
          value={dateToString(endDate)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setEndDate(new Date(e.target.value));
          }}
        ></InputAbsenceDate>
      </InputDateContainer>
      <ValidAbsence>{isValidAbsence}</ValidAbsence>
    </DateSettingContainer>
  );
}

export default ChoiceAbsenceDate;

const DateSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputDateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const InputAbsenceDate = styled.input``;
const ValidAbsence = styled.div`
  text-align: center;
`;
