import AbsenceDetailResonInput from "./Main_AbsenceDetailReasonInput";
import ChoiceAbsenceDate from "./Main_ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./Main_ChoiceAbsenceOption";
import AbsenceSubmitHistory from "./Main_AbsenceSubmitHistory";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../core/firebase";

function UserAbsenceContainer() {
  const [absenceOption, setAbsenceOption] = useState();
  const [startAbsenceDate, setStartAbsenceDate] = useState();
  const [endAbsenceDate, setEndAbsenceDate] = useState();
  const [absenceReason, setAbsenceReason] = useState("");
  const [isValidAbsence, setIsValidAbsence] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [useVacation, setUseVacation] = useState(false);

  useEffect(() => {
    async function setData() {
      try {
        // db가 정의되어 있는지 확인합니다.
        if (!db) {
          console.error("Database is not defined");
          return;
        }
        await addDoc(collection(db, "Absence"), {
          startDate: startAbsenceDate,
          absenceOption: absenceOption,
          reason: absenceReason,
          userId: "testid",
          ...(absenceOption.includes("반차") ||
          absenceOption === "조퇴" ||
          absenceOption === "외출"
            ? { endDate: "" }
            : { endDate: endAbsenceDate }),
        });
      } catch (error) {
        console.error("Failed to set document:", error);
      }
    }

    if (isValidAbsence && isSubmit) {
      setData();
      setIsSubmit(false);
    }
  }, [isValidAbsence, isSubmit]);

  return (
    <>
      <AbsenceContainer>
        <Inner>
          <ChoiceAbsenceOption props={{ setAbsenceOption, setUseVacation }} />
          <ChoiceAbsenceDate
            props={{
              setStartAbsenceDate,
              setEndAbsenceDate,
              setIsValidAbsence,
              useVacation,
            }}
          />
          <AbsenceDetailResonInput props={{ setIsSubmit, setAbsenceReason }} />
          <AbsenceSubmitHistory />
        </Inner>
      </AbsenceContainer>
    </>
  );
}

export default UserAbsenceContainer;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
