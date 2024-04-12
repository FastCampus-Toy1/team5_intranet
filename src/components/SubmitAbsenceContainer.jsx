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

  return (
    <AbsenceContainer>
      <Inner>
        <ChoiceAbsenceOption />
        <ChoiceAbsenceDate />
        <AbsenceInput />
      </Inner>
    </AbsenceContainer>
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
