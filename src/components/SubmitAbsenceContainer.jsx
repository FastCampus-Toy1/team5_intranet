import AbsenceInput from "./AbsenceResonInput";
import ChoiceAbsenceDate from "./ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./ChoiceAbsenceOption";
import React from "react";
import styled from "styled-components";

function SubmitAbsenceContainer() {
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
`;
const Inner = styled.div`
  width: 90%;
  height: 90%;

`;
