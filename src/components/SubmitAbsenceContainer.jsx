import AbsenceInput from "./AbsenceResonInput";
import ChoiceAbsenceDate from "./ChoiceAbsenceDate";
import ChoiceAbsenceOption from "./ChoiceAbsenceOption";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../core/firebase";

function SubmitAbsenceContainer() {
  const [absence, setAbsence] = useState();
  const [startAbsenceDate, setStartAbsenceDate] = useState();
  const [endAbsenceDate, setEndAbsenceDate] = useState();
  const [absenceReason, setAbsenceReason] = useState("");
  const [isValidAbsence, setIsValidAbsence] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // useEffect(() => {
  //   async function setData() {
  //     await setDoc(doc(db, "Members", "test5"), {
  //       teststartdate: startAbsenceDate,
  //       testenddate: endAbsenceDate,
  //       testreason: absenceReason,
  //       teststatus: "신청 중",
  //       testvalue: absence,
  //     });
  //   };

  //   console.log(isValidAbsence);
  //   console.log(isSubmit);
  //   if (isValidAbsence && isSubmit) {
  //     setData();
  //     setIsSubmit(false);
  //   }
  // },[isValidAbsence,isSubmit]);
  useEffect(() => {
    async function setData() {
      try {
        // db가 정의되어 있는지 확인합니다.
        if (!db) {
          console.error('Database is not defined');
          return;
        }
        await setDoc(doc(db, "Members", "test5"), {
          teststartdate: startAbsenceDate,
          testenddate: endAbsenceDate,
          testreason: absenceReason,
          teststatus: "신청 중",
          testvalue: absence,
        });
      } catch (error) {
        // setDoc 함수가 실패하면 오류를 출력합니다.
        console.error('Failed to set document:', error);
      }
    };
    console.log(isValidAbsence);
    console.log(isSubmit);
    if (isValidAbsence && isSubmit) {
      setData();
      setIsSubmit(false);
    }
  }, [isValidAbsence, isSubmit]);

  return (
    <>
      <AbsenceContainer>
        <Inner>
          <ChoiceAbsenceOption setValue={setAbsence} />
          <ChoiceAbsenceDate
            setValue={[
              setStartAbsenceDate,
              setEndAbsenceDate,
              setIsValidAbsence,
            ]}
          />
          <AbsenceInput setValue={[setIsSubmit, setAbsenceReason]} />
        </Inner>
      </AbsenceContainer>
      {/* <div>{absence}</div>
      <div>{startAbsenceDate}</div>
      <div>{endAbsenceDate}</div>
      <div>{absenceReason}</div>
      <div>{isSubmit.toString()}</div> */}
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
