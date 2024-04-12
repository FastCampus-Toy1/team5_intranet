import React from "react";
import styled from "styled-components";

function AbsenceInput() {
  return (
    <Container>
      <SubmitButton>
        <span>제출하기</span>
        <span></span>
      </SubmitButton>
      <AbsenceReasonInput></AbsenceReasonInput>
    </Container>
  );
}

export default AbsenceInput;

const Container = styled.div`
  width: 100%;
  height: 235px;
  border: 1px solid #c8cce5;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 45px;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &:hover {
    color: white;
    background-color: #c8cce5;
    cursor: pointer;
  }
  z-index: 2;
`;
const AbsenceReasonInput = styled.textarea`
  height: 205px;
  border: 1px solid #c8cce5;
  border-radius: 10px;
  z-index: 3;
  outline: none;
  resize: none;
`;
