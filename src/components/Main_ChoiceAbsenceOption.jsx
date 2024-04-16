import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

function ChoiceAbsenceOption({props}) {
  const [isAbsenceOptionOpen, setIsAbsenceOptionOpen] = useState(false);
  const [isHDOOpenBtnShow, setIsHDOOpenBtnShow] = useState(false);
  const [isHDOOptionOpen, setIsHDOOptionOpen] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState("사유 선택");
  const [selectedTime, setSelectedTime] = useState("시간 선택");
  const toggleHandler = (isOn, setIsOn) => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if(selectedAbsence === "연차") {
      props.setUseVacation(true);
    } else {
      props.setUseVacation(false);
    }
    if (selectedAbsence === "반차") {
      setIsHDOOpenBtnShow(true);
    } else {
      setIsHDOOpenBtnShow(false);
      setIsHDOOptionOpen(false);
    }
    setIsAbsenceOptionOpen(false);
    props.setAbsenceOption(`${selectedAbsence}` +
        (selectedAbsence === "반차" ? `(${selectedTime})` : "")
    );
    
  }, [selectedAbsence, selectedTime]);

  const ABSENCE_OPTIONS = ["반차", "연차", "외출", "조퇴", "병가", "예비군"];
  const HDO_OPTIONS = ["오전", "오후"];

  return (
    <BtnFlexContainer>
      <AbsenceContainer className="absence__container">
        <AbsenceOptionsOpenBtn
          onClick={() => {
            toggleHandler(isAbsenceOptionOpen, setIsAbsenceOptionOpen);
          }}
        >
          <Option>{selectedAbsence}</Option>
          <div className="material-symbols-outlined">arrow_drop_down</div>
        </AbsenceOptionsOpenBtn>
        {isAbsenceOptionOpen && (
          <AbsenceOptionList>
            {ABSENCE_OPTIONS.map((list, index) => (
              <li key={index}>
                <AbsenceOptionBtn
                  onClick={() => {
                    setSelectedAbsence(list);
                  }}
                >
                  {list}
                </AbsenceOptionBtn>
              </li>
            ))}
          </AbsenceOptionList>
        )}
      </AbsenceContainer>
      <HDOOptionContainer>
        <HDOTimeListOpenBtn
          $isshow={isHDOOpenBtnShow}
          onClick={() => {
            toggleHandler(isHDOOptionOpen, setIsHDOOptionOpen);
          }}
        >
          <Option>{selectedTime}</Option>
          <p className="material-symbols-outlined">arrow_drop_down</p>
        </HDOTimeListOpenBtn>
        {isHDOOptionOpen && (
          <HDOOptionList>
            {HDO_OPTIONS.map((list, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedTime(list);
                  setIsHDOOptionOpen(false);
                }}
              >
                <TimeOptionBtn>{list}</TimeOptionBtn>
              </li>
            ))}
          </HDOOptionList>
        )}
      </HDOOptionContainer>
    </BtnFlexContainer>
  );
}
export default ChoiceAbsenceOption;

const BtnFlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

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

const AbsenceContainer = styled.div`
  position: relative;
`;

const Option = styled.span`
  margin-left: 0.5em;
`;

const AbsenceOptionList = styled.ul`
  width: 100%;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  position: absolute;
  top: 2.5em;
  z-index: 5;
`;

const AbsenceOptionBtn = styled.button`
  width: 100%;
  height: 32px;

  &:hover {
    background-color: #b6c2e2;
    color: white;
  }
`;
const HDOOptionContainer = styled.div`
  position: relative;
`;
const HDOTimeListOpenBtn = styled.button`
  width: 194px;
  height: 34px;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(prop) => (prop.$isshow ? 1 : 0)};
  visibility: ${(prop) => (prop.$isshow ? "visible" : "hidden")};
`;
const HDOOptionList = styled.ul`
  width: 100%;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  margin-top: 3px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;

  overflow: hidden;
  position: absolute;
  top: 2rem;
  z-index: 5;
`;

const TimeOptionBtn = styled.button`
  width: 100%;
  height: 32px;

  &:hover {
    background-color: #b6c2e2;
    color: white;
  }
`;
