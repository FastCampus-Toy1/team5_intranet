import React, { useEffect, useState } from "react";
import styled from "styled-components";

function ChoiceAbsenceDate() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);
  const [isValidAbsence, setIsValidAbsence] = useState("");
  let usedVacation;

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
    }
  }, [startDate, endDate]);

  return (
    <DateSettingContainer>
      <Description>휴가기간</Description>
      <InputDateContainer>
        <InputDate
          className="start__absence__date"
          type="date"
          value={startDate.toISOString().slice(0, 10)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setStartDate(new Date(e.target.value));
            console.log(currentTime);
            console.log(startDate);
          }}
        ></InputDate>
        <> ~ </>
        <InputDate
          className="end__absence__date"
          type="date"
          value={endDate.toISOString().slice(0, 10)}
          onChange={(e) => {
            setCurrentTime(new Date());
            setEndDate(new Date(e.target.value));
          }}
        ></InputDate>
        <ValidAbsence>{isValidAbsence}</ValidAbsence>
      </InputDateContainer>
    </DateSettingContainer>
  );
}

export default ChoiceAbsenceDate;

const DateSettingContainer = styled.div``;
const Description = styled.span``;

const InputDateContainer = styled.div``;
const InputDate = styled.input``;
const ValidAbsence = styled.div``;
