import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

function AbsenceOption({ props }) {
  const [isAbsenceOptionOpen, setIsAbsenceOptionOpen] = useState(false);
  const [isHDOOpenBtnShow, setIsHDOOpenBtnShow] = useState(false);
  const [isHDOOptionOpen, setIsHDOOptionOpen] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState("사유 선택");
  const [selectedTime, setSelectedTime] = useState("시간 선택");
  const toggleHandler = (isOn, setIsOn) => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (selectedAbsence === "연차") {
      props.setIsVacation(true);
    } else {
      props.setIsVacation(false);
    }
    if (selectedAbsence === "반차") {
      setIsHDOOpenBtnShow(true);
    } else {
      setIsHDOOpenBtnShow(false);
      setIsHDOOptionOpen(false);
    }
    setIsAbsenceOptionOpen(false);
    props.setAbsenceOption(
      `${selectedAbsence}` +
        (selectedAbsence === "반차"
          ? selectedTime === "시간 선택"
            ? ""
            : `(${selectedTime})`
          : "")
    );
  }, [selectedAbsence, selectedTime]);

  const ABSENCE_OPTIONS = ["반차", "연차", "외출", "조퇴", "병가", "예비군"];
  const HDO_OPTIONS = ["오전", "오후"];

  return (
    <BtnFlexContainer>
      <AbsenceContainer>
        <AbsenceOptionOpenBtn
          onClick={() => {
            toggleHandler(isAbsenceOptionOpen, setIsAbsenceOptionOpen);
          }}
        >
          <Option>{selectedAbsence}</Option>
          <div className="material-symbols-outlined">arrow_drop_down</div>
        </AbsenceOptionOpenBtn>
        {isAbsenceOptionOpen && (
          <OptionList>
            {ABSENCE_OPTIONS.map((list, index) => (
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
          </OptionList>
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
          <OptionList>
            {HDO_OPTIONS.map((list, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedTime(list);
                  setIsHDOOptionOpen(false);
                }}
              >
                <OptionBtn>{list}</OptionBtn>
              </li>
            ))}
          </OptionList>
        )}
      </HDOOptionContainer>
    </BtnFlexContainer>
  );
}
export default AbsenceOption;

const BtnFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const AbsenceOptionOpenBtn = styled.button`
  width: 12rem;
  height: 2rem;
  border: 1px solid #b6c2e2;
  background-color: white;
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

const OptionList = styled.ul`
  width: 100%;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 110%;
  z-index: 5;
  background-color: white;
  overflow: hidden;
`;

const OptionBtn = styled.button`
  width: 100%;
  height: 32px;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: #b6c2e2;
    color: white;
  }
`;
const HDOOptionContainer = styled.div`
  position: relative;
`;
const HDOTimeListOpenBtn = styled.button`
  width: 12rem;
  height: 2rem;
  border: 1px solid #b6c2e2;
  border-radius: 10px;
  font-size: 14px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: -1px;
  opacity: ${(prop) => (prop.$isshow ? 1 : 0)};
  visibility: ${(prop) => (prop.$isshow ? "visible" : "hidden")};
`;
