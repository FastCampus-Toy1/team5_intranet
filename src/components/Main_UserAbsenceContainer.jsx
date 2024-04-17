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
  const [useVacation, setUseVacation] = useState(0);
  const [clientRemainingVacation, setClientRemainingVacation] = useState(10);

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
      const serverRemainingVacation = querySnapshot.docs[0].data().clientRemainingVacation

      // 연차를 사용하느냐 아니냐에 따라 
      // 남아있는 연차(serverRemainingVacation) - 사용하는 연차(useVacation)
      if(isVacation) {
        setClientRemainingVacation(serverRemainingVacation - useVacation)
      } else {
        // 연차를 사용하지 않을 경우 그냥 남아있는 연차를 웹에 띄운다.
         setClientRemainingVacation(serverRemainingVacation)
      }
      // 계산결과를 서버에 저장
       updateDoc(docRef, {
        clientRemainingVacation: `${clientRemainingVacation}`,
      });

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

  // async function updateRemainingVacation() {
  //   const USER_ID = sessionStorage.getItem("userID")
  // ? sessionStorage.getItem("userID")
  // : "testid";
  //     const USER_COLLECTION = collection(db,"USER");

  //     const q = query(USER_COLLECTION, and(
  //       where("userID", "==", USER_ID),
  //       where("absenceOption", "==", "병가"),
  //       where("startDate", "==", "2024-07-11")
  //     ));
  //     const querySnapshot = await getDocs(q);
  //     // 검색된 문서들 중에서 첫 번째 문서 선택
  //     const docRef = querySnapshot.docs[0];
  //     console.log(docRef)
  //     await updateDoc(docRef, {
  //       remainigVaction: "13"
  //     });

  //     try{
  //     console.log("Document updated successfully");
  //   } catch (error) {
  //     console.log("update Failed: ", error);
  //   }
  // }

  return (
    <>
      <AbsenceContainer>
        <Inner>
          <ChoiceAbsenceOption props={{ setAbsenceOption, setIsVacation, clientRemainingVacation }} />
          <RemaingVacation>남은 휴가 : {clientRemainingVacation}</RemaingVacation>
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
