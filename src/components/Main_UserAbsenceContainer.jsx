import AbsenceDetailResonInput from "./Main_AbsenceDetailReasonInput";
import ChoiceAbsenceDate from "./Main_ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./Main_ChoiceAbsenceOption";
import AbsenceSubmitHistory from "./Main_AbsenceSubmitHistory";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addDoc,
  and,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../core/firebase";

function UserAbsenceContainer() {
  const [absenceOption, setAbsenceOption] = useState();
  const [startAbsenceDate, setStartAbsenceDate] = useState();
  const [endAbsenceDate, setEndAbsenceDate] = useState();
  const [absenceReason, setAbsenceReason] = useState("");
  const [isValidAbsence, setIsValidAbsence] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isVacation, setIsVacation] = useState(false);

  // 연차 사용 관련
  const [usingVacation, setUseVacation] = useState(0);
  const [remainingVacation, setRemainingVacation] = useState(0);

  const USER_ID = sessionStorage.getItem("userID")
    ? sessionStorage.getItem("userID")
    : "testid";

  async function updateRemainingVacation() {
      const USER_COLLECTION = collection(db, "User");
      const querySnapshot = await getDocs(
        USER_COLLECTION,
        where("userID", "==", USER_ID)
      );
      const docRef = querySnapshot.docs[0].ref;
      const serverRemainingVacation = Number(querySnapshot.docs[0].data().remainingVacation);

      console.log(usingVacation);
      await updateDoc(docRef, {
        remainingVacation: serverRemainingVacation - usingVacation
      });
      setRemainingVacation(serverRemainingVacation - usingVacation);
  }
  useEffect(() => {
    updateRemainingVacation();
  }, []);

  async function submitAbsence() {
    try {
      // db가 정의되어 있는지 확인합니다.
      const ABSENCE_COLLECTION = collection(db, "Absence");
      await addDoc(ABSENCE_COLLECTION, {
        startDate: startAbsenceDate,
        absenceOption: absenceOption,
        reason: absenceReason,
        userID: USER_ID,
        ...(absenceOption.includes("반차") ||
        absenceOption === "조퇴" ||
        absenceOption === "외출"
          ? {}
          : { endDate: endAbsenceDate }),
      });
    } catch (error) {
      console.error("Failed to set document:", error);
    }
  }

  useEffect(() => {
    if (isValidAbsence && isSubmit) {
      submitAbsence();
      updateRemainingVacation();
      setIsSubmit(false);
    }
  }, [isValidAbsence, isSubmit]);

  return (
    <>
      <AbsenceContainer>
        <Inner>
          <ChoiceAbsenceOption props={{ setAbsenceOption, setIsVacation, remainingVacation }} />
          <RemaingVacation>남은 휴가 : {remainingVacation}</RemaingVacation>
          <ChoiceAbsenceDate
            props={{
              setStartAbsenceDate,
              setEndAbsenceDate,
              setIsValidAbsence,
              setUseVacation,
              isVacation,
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

const RemaingVacation = styled.span``;
