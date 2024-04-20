import AbsenceReason from "./Main_AbsenceReason";
import AbsenceDate from "./Main_AbsenceDate";
import AbsenceOption from "./Main_AbsenceOption";
import AbsenceSubmitHistory from "./Main_AbsenceSubmitHistory";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addDoc,
  collection,
  getDocs,
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
    const serverRemainingVacation = Number(
      querySnapshot.docs[0].data().remainingVacation
    );

    await updateDoc(docRef, {
      remainingVacation: serverRemainingVacation - usingVacation,
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
      setIsValidAbsence(false);
    }
  }, [isValidAbsence, isSubmit]);

  return (
    <>
      <AbsenceContainer>
        <Inner>
          <div>휴가신청</div>
          <AbsenceOption
            props={{ setAbsenceOption, setIsVacation, remainingVacation }}
          />
          <AbsenceDate
            props={{
              setStartAbsenceDate,
              setEndAbsenceDate,
              setIsValidAbsence,
              setUseVacation,
              isVacation,
              remainingVacation,
              isSubmit,
            }}
          />
          <AbsenceReason props={{ setIsSubmit, setAbsenceReason }} />
          <AbsenceSubmitHistory props={{ isSubmit }} />
        </Inner>
      </AbsenceContainer>
    </>
  );
}

export default UserAbsenceContainer;

const AbsenceContainer = styled.section`
  width: 45%;
  min-width: 600px;
  height: 70%;
  border: 2px solid #c8cce5;
  border-radius: 10px;
  background-color: #FFFFFF;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div`
  /* width: 90%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  font-size: 1.4em;
`;
