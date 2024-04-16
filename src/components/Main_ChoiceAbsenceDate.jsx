import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ChoiceAbsenceDate({ setValue }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);
  const [isValidAbsence, setIsValidAbsence] = useState("");
  let usedVacation;
  const dateToString = (dateObj) => {
    return dateObj.toISOString().slice(0, 10);
  };
  useEffect(() => {
    if (
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
      usedVacation = (endDate - startDate) / 1000 / 60 / 60 / 24 + 1;
      setIsValidAbsence(`휴가 ${usedVacation}일 사용`);
      setValue[0](dateToString(startDate));
      setValue[1](dateToString(endDate));
      setValue[2](true);
    }
  }, [startDate, endDate]);

  return (
    <DateSettingContainer>
      <InputDateContainer>
        <InputDate
          className="start__absence__date"
          type="date"
          value={startDate.toISOString().slice(0, 10)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setStartDate(new Date(e.target.value));
          }}
        ></InputDate>
        <span> ~ </span>
        <InputDate
          className="end__absence__date"
          type="date"
          value={dateToString(endDate)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setEndDate(new Date(e.target.value));
          }}
        ></InputDate>
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
const InputDate = styled.input`
`;
const ValidAbsence = styled.div`
  text-align: center;
`;
