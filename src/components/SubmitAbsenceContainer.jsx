import AbsenceInput from "./AbsenceResonInput";
import ChoiceAbsenceDate from "./ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./ChoiceAbsenceOption";
import React, { useState } from "react";
import styled from "styled-components";

function SubmitAbsenceContainer() {
  const [absence, setAbsence] = useState();
  const [startAbsenceDate, setStartAbsenceDate] = useState();
  const [endAbsenceDate, setEndAbsenceDate] = useState();
  const [absenceReason, setAbsenceReason] = useState("");
  const [isValidAbsence, setIsValidAbsence] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  return (
    <>
      <AbsenceContainer>
        <Inner>
          <ChoiceAbsenceOption setValue={setAbsence} />
          <ChoiceAbsenceDate
            setValue={[setStartAbsenceDate, setEndAbsenceDate, setIsValidAbsence]}
          />
          <AbsenceInput setValue={[setIsSubmit, setAbsenceReason]} />
        </Inner>
      </AbsenceContainer>
      <div>{absence}</div>
      <div>{startAbsenceDate}</div>
      <div>{endAbsenceDate}</div>
      <div>{absenceReason}</div>
      <div>{isSubmit.toString()}</div>
    </>
  );
}

export default SubmitAbsenceContainer;

const AbsenceContainer = styled.section`
  width: 585px;
  height: 70%;
  border: 2px solid #c8cce5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  width: 80%;
  height: 90%;
`;
