import AbsenceInput from "./AbsenceInput";
import ChoiceAbsenceDate from "./ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./ChoiceAbsenceOption";
import React from 'react'
import styled from "styled-components"

function SubmitAbsenceContainer() {
  return (
    <AbsenceContainer>
    <ChoiceAbsenceOption/>
    <ChoiceAbsenceDate/>
    <AbsenceInput/>
    </AbsenceContainer>
  )
}

export default SubmitAbsenceContainer

const AbsenceContainer = styled.section`
width: 585px;
height: 70%;
border: 2px solid #C8CCE5;
`