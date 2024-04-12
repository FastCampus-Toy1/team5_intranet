import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

function ChoiceAbsenceOption() {
  const [isAbsenceOptionOpen, setIsAbsenceOptionOpen] = useState(false);
  const [isHalfDayOffShow, setIsHalfDayOffShow] = useState(false);
  const [isHalfDayOffOptionOpen, setIsHalfDayOffOptionOpen] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState("휴가 선택");
  const [selectedTime, setSelectedTime] = useState("시간 선택");
  const toggleHandler = (isOn, setIsOn) => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (selectedAbsence === "반차") {
      setIsHalfDayOffShow(true);
    } else {
      setIsHalfDayOffShow(false);
    }
    setIsAbsenceOptionOpen(false);
  }, [selectedAbsence]);

  const absenceOptions = ["반차", "연차", "조퇴"];
  const halfDayOffOptions = ["오전", "오후"];

  return (
    <BtnFlexContainer>
      <div className="absence__container">
        <AbsenceOptionsOpenBtn
          onClick={() => {
            toggleHandler(isAbsenceOptionOpen, setIsAbsenceOptionOpen);
          }}
        >
          <Option>{selectedAbsence}</Option>
          <div className="material-symbols-outlined">arrow_drop_down</div>
        </AbsenceOptionsOpenBtn>

        <AbsenceOptionBtnsList $isopen={isAbsenceOptionOpen}>
          {absenceOptions.map((list, index) => (
            <li key={index}>
              <OptionBtn
                onClick={() => {
                  setSelectedAbsence(list);
                }}
              >
                {list}
              </OptionBtn>
            </li>
          ))}
        </AbsenceOptionBtnsList>
      </div>
      <div className="half-day-off__container">
        {isHalfDayOffShow && (
          <HalfDayOffTimeOpenBtn
            onClick={() => {
              toggleHandler(isHalfDayOffOptionOpen, setIsHalfDayOffOptionOpen);
            }}
          >
            <Option>{selectedTime}</Option>
            <p className="material-symbols-outlined">arrow_drop_down</p>
          </HalfDayOffTimeOpenBtn>
        )}
        <TimeBtnsList $isopen={isHalfDayOffOptionOpen}>
          {halfDayOffOptions.map((list, index) => (
            <li key={index}>
              <TimeSelectBtn
                onClick={() => {
                  setSelectedTime(list);
                  setIsHalfDayOffOptionOpen(false);
                }}
              >
                {list}
              </TimeSelectBtn>
            </li>
          ))}
        </TimeBtnsList>
      </div>
    </BtnFlexContainer>
  );
}
export default ChoiceAbsenceOption;

const AbsenceOptionsOpenBtn = styled.button`
  width: 194px;
  height: 34px;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Option = styled.span`
  margin-left: 0.5em;
`;

const AbsenceOptionBtnsList = styled.ul`
  width: 194px;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  margin-top: 3px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;
  opacity: ${(props) => (props.$isopen ? "1" : "0")};
  visibility: ${(props) => (props.$isopen ? "visible" : "hidden")};
  transition: 0.5s;
`;

const OptionBtn = styled.button`
  width: 100%;
  height: 32px;
  background-color: transparent;

  &:hover {
    background-color: #b6c2e2;
    color: white;
  }
`;

const HalfDayOffTimeOpenBtn = styled.button`
  width: 194px;
  height: 34px;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TimeBtnsList = styled.ul`
  width: 194px;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  margin-top: 3px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;
  opacity: ${(props) => (props.$isopen ? 1 : 0)};
  visibility: ${(props) => (props.$isopen ? "visible" : "hidden")};
  transition: 0.5s;
`;

const TimeSelectBtn = styled.button`
  width: 100%;
  height: 32px;
  background-color: transparent;

  &:hover {
    background-color: #b6c2e2;
    color: white;
  }
`;

const BtnFlexContainer = styled.div`
  display: flex;
`;
