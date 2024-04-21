import React from "react";
import styled from "styled-components";

function AbsenceReason({ props }) {
  return (
    <Container>
      <SubmitButton
        onClick={() => {
          props.setIsSubmit(true);
        }}
      >
        <span>제출하기</span>
        <span></span>
      </SubmitButton>
      <AbsenceReasonInput
        placeholder="상세정보를 적어주세요."
        onChange={(e) => {
          props.setAbsenceReason(e.target.value);
        }}
      ></AbsenceReasonInput>
    </Container>
  );
}

export default AbsenceReason;

const Container = styled.div`
  width: 100%;
  height: 20vh;
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
  height: 5vh;
  background-color: transparent;
  border: transparent;
  border-bottom: 1px solid #c8cce5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &:hover {
    color: white;
    background-color: #c8cce5;
    cursor: pointer;
  }
  z-index: 5;
`;
const AbsenceReasonInput = styled.textarea`
  height: 30vh;
  border: 1px solid #c8cce5;
  border-top: transparent;
  z-index: 3;
  outline: none;
  resize: none;
`;
