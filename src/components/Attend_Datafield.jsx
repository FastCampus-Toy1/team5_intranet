import React, { useState, useEffect } from "react";
import { db } from "../core/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import styled from "styled-components";

const Datafield = ({ selectedLabel, results }) => {
  const [memberList, setMemberList] = useState([]);
  const [isReasonVisible, setIsReasonVisible] = useState([]);
  const MEMBER_COLLECTION = "Absence";

  async function getList() {
    const newmemberList = []; // 빈 배열로 초기화
    const querySnapshot = await getDocs(collection(db, MEMBER_COLLECTION));
    for (const doc of querySnapshot.docs) {
      const userID = sessionStorage.getItem("userID");
      const userName = sessionStorage.getItem("userName");
      const docUserID = doc.data().userID; // 데이터에서 userID를 가져오는 코드
      const hdoOption = doc.data().hdoOption; // hdoOption 변수 선언
      const startDate = new Date(doc.data().startDate);
      const absenceOption = doc.data().absenceOption;
      const now = new Date();
      const diffInDays = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
      let status;

      let endDate;
<<<<<<< HEAD
        if (['반차(오전)', '반차(오후)', '조퇴', '외출'].includes(absenceOption)) {
          endDate = new Date(doc.data().startDate).toLocaleDateString('ko-KR');
        } else if (doc.data().endDate) {
          endDate = new Date(doc.data().endDate).toLocaleDateString('ko-KR');
        }
        else {
          endDate = '미선택 '; 
        }
    
      if (hdoOption == "(시간 선택)" || !startDate || endDate == "미선택 " || absenceOption == "사유 선택" || diffInDays < 1) {
        status = '거절';
      } else if (diffInDays <= 7) {
        status = '승인';
=======
      if (
        ["반차(오전)", "반차(오후)", "조퇴", "외출"].includes(absenceOption)
      ) {
        endDate = new Date(doc.data().startDate).toLocaleDateString("ko-KR");
      } else if (doc.data().endDate) {
        endDate = new Date(doc.data().endDate).toLocaleDateString("ko-KR");
>>>>>>> temp
      } else {
        endDate = "미선택 ";
      }

      if (
        hdoOption == "(시간 선택)" ||
        !startDate ||
        endDate == "미선택 " ||
        absenceOption == "사유 선택"
      ) {
        status = "거절";
      } else if (diffInDays <= 7) {
        status = "승인";
      } else {
        status = "승인 전";
      }

      if (userID == docUserID) {
        newmemberList.push({
          id: userName,
          absenceOption: hdoOption
            ? hdoOption + " " + doc.data().absenceOption
            : doc.data().absenceOption, // hdoOption이 없는 경우 absenceOption만 출력
          hdoOption: hdoOption,
          startDate: new Date(doc.data().startDate).toLocaleDateString("ko-KR"),
          endDate: endDate,
          reason: doc.data().reason,
          status: status,
        });
      } else {
        // Profile 컬렉션에서 userID가 docUserID와 같은 문서를 찾습니다.
        const profileQuery = query(
          collection(db, "Profile"),
          where("userID", "==", docUserID)
        );
        const profileSnapshot = await getDocs(profileQuery);

        // 문서가 있다면 그 문서의 name 값을 id로 사용합니다.
        if (!profileSnapshot.empty) {
          const profileDoc = profileSnapshot.docs[0];
          newmemberList.push({
            id: profileDoc.data().name,
            absenceOption: hdoOption
              ? hdoOption + " " + doc.data().absenceOption
              : doc.data().absenceOption, // hdoOption이 없는 경우 absenceOption만 출력
            hdoOption: hdoOption,
            startDate: new Date(doc.data().startDate).toLocaleDateString(
              "ko-KR"
            ),
            endDate: endDate,
            reason: doc.data().reason,
            status: status,
          });
        }
      }
    }

    // startDate 값에 따라 정렬
    newmemberList.sort((a, b) => {
      const dateAStart = new Date(a.startDate);
      const dateBStart = new Date(b.startDate);
      const dateAEnd = new Date(a.endDate);
      const dateBEnd = new Date(b.endDate);

      if (dateAStart.getTime() !== dateBStart.getTime()) {
        return dateAStart.getTime() - dateBStart.getTime();
      } else {
        return dateAEnd.getTime() - dateBEnd.getTime();
      }
    });

    setMemberList(newmemberList);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleMembersClick = (index) => {
    setIsReasonVisible((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    setIsReasonVisible(memberList.map(() => false));
  }, [memberList]);

  return (
    <Datafd>
      <ListName>
        <Name>이름</Name>
        <Value>휴가 종류</Value>
        <Start>휴가 시작</Start>
        <End>휴가 종료</End>
        <SubStatus>신청 상태</SubStatus>
      </ListName>
      {memberList.map(
        (member, index) =>
          (!selectedLabel || member.absenceOption == selectedLabel) &&
          (!results ||
            member.id.includes(results) ||
            member.absenceOption.includes(results) ||
            member.reason.includes(results) ||
            member.startDate.includes(results) ||
            member.endDate.includes(results) ||
            member.status.includes(results)) && (
            <MembersWrapper
              key={index}
              onClick={() => handleMembersClick(index)}
            >
              <Members>
                <Id>{member.id}</Id>
                <AbsenceOption>
                  <AbsenceOptionwrap value={member.absenceOption}>
                    {member.absenceOption === "예비군"
                      ? "🪖 " + member.absenceOption
                      : member.absenceOption === "외출"
                      ? "🏃🏻‍♂️ " + member.absenceOption
                      : member.absenceOption === "병가"
                      ? "💊 " + member.absenceOption
                      : member.absenceOption === "조퇴"
                      ? "🎒 " + member.absenceOption
                      : member.absenceOption === "연차"
                      ? "🏖️ " + member.absenceOption
                      : member.absenceOption === "반차"
                      ? "🕧 " + member.absenceOption
                      : member.absenceOption === "사유 선택"
                      ? "❌ "
                      : member.absenceOption === "반차(시간 선택)"
                      ? "❌ "
                      : member.absenceOption}
                  </AbsenceOptionwrap>
                </AbsenceOption>
                <StartDate>
                  {member.startDate && member.startDate.slice(0, -1)}
                </StartDate>
                <EndDate>
                  {member.endDate && member.endDate.slice(0, -1)}
                </EndDate>
                <Status>
                  <Statuswrap value={member.status}>{member.status}</Statuswrap>
                </Status>
              </Members>
              <ReasonWrap
                style={{
                  maxHeight: isReasonVisible[index] ? "120px" : "0",
                  transition: "max-height 0.5s ease-in-out",
                  overflow: "hidden",
                  borderBottom: isReasonVisible[index]
                    ? "1px solid #C8CCE5"
                    : "",
                  borderLeft: isReasonVisible[index] ? "1px solid #C8CCE5" : "",
                  borderRight: isReasonVisible[index]
                    ? "1px solid #C8CCE5"
                    : "",
                }}
              >
                <ReasonContent>상세 사유 : </ReasonContent>
                <Reason>{member.reason}</Reason>
              </ReasonWrap>
            </MembersWrapper>
          )
      )}
    </Datafd>
  );
};

export default Datafield;

const Datafd = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 6;
`;

const ListName = styled.div`
  position: relative;
  grid-column: 1 / 6;
  display: flex;
  align-items: center;
  width: 98%;
  height: 40px;
  padding: 10px;
  margin: 0px auto;
  margin-bottom: 10px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #c8cce5;
`;

const Name = styled.div`
  flex: 1;
`;

const Value = styled.div`
  flex: 1;
`;

const Start = styled.div`
  flex: 1;
`;

const End = styled.div`
  flex: 1;
`;

const SubStatus = styled.div`
  flex: 1;
`;

const MembersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Members = styled.div`
  position: relative;
  grid-column: 1 / 6;
  display: flex;
  align-items: center;
  width: 98%;
  height: 40px;
  padding: 10px 5px 10px 10px;
  margin: 0px auto;
  text-align: center;
  border: 1px solid #c8cce5;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.25);
  transition-duration: 0.1s;
  cursor: pointer;

  &:hover {
    border: 2px solid #0ba5ec;
  }
`;

const Id = styled.div`
  flex: 1;
  font-size: 23px;
  font-weight: 600;
`;

const AbsenceOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #fff;
`;

const AbsenceOptionwrap = styled.div`
  border-radius: 30px;
  font-size: 15px;
  width: ${(props) =>
    props.value == "연차"
      ? "55px"
      : props.value == "반차"
      ? "55px"
      : props.value == "반차(오전)"
      ? "70px"
      : props.value == "반차(오후)"
      ? "70px"
      : props.value == "예비군"
      ? "70px"
      : props.value == "조퇴"
      ? "55px"
      : props.value == "외출"
      ? "55px"
      : props.value == "병가"
      ? "55px"
      : props.value == "사유 선택"
      ? "55px"
      : props.value == "반차(시간 선택)"
      ? "70px"
      : "none"};

  height: ${(props) =>
    props.value == "연차"
      ? "18px"
      : props.value == "반차"
      ? "18px"
      : props.value == "반차(오전)"
      ? "23px"
      : props.value == "반차(오후)"
      ? "23px"
      : props.value == "예비군"
      ? "23px"
      : props.value == "조퇴"
      ? "18px"
      : props.value == "외출"
      ? "18px"
      : props.value == "병가"
      ? "18px"
      : props.value == "사유 선택"
      ? "18px"
      : props.value == "반차(시간 선택)"
      ? "18px"
      : "none"};

  padding: ${(props) =>
    props.value == "연차"
      ? "8px 8px 4px 3px"
      : props.value == "반차"
      ? "8px 8px 4px 3px"
      : props.value == "반차(오전)"
      ? "8px 5px 0px 5px"
      : props.value == "반차(오후)"
      ? "8px 3px 0px 3px"
      : props.value == "예비군"
      ? "8px 3px 0px 3px"
      : props.value == "조퇴"
      ? "8px 8px 4px 3px"
      : props.value == "외출"
      ? "8px 8px 4px 3px"
      : props.value == "병가"
      ? "8px 8px 4px 3px"
      : props.value == "사유 선택"
      ? "8px 8px 4px 3px"
      : props.value == "반차(시간 선택)"
      ? "8px 8px 4px 3px"
      : "none"};

  background-image: ${(props) =>
    props.value == "연차"
      ? "linear-gradient(3deg, #9B8AFB, #DD2590)"
      : props.value == "반차"
      ? "linear-gradient(3deg, #FEB273, #EC4A0A)"
      : props.value == "반차(오전)"
      ? "linear-gradient(0deg, #FECB4B, #F04438)"
      : props.value == "반차(오후)"
      ? "linear-gradient(30deg, #FEB273, #000)"
      : props.value == "예비군"
      ? "linear-gradient(3deg, #12B76A, #000)"
      : props.value == "조퇴"
      ? "linear-gradient(3deg, #717BBC, #363F72)"
      : props.value == "외출"
      ? "linear-gradient(3deg, #851651, #510B24)"
      : props.value == "병가"
      ? "linear-gradient(3deg, #717BBC, #363F72)"
      : "none"};
`;

const ReasonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 120px;
  margin: 0px auto;
  margin-bottom: 20px;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
`;

const ReasonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin-left: 30px;
  font-size: 23px;
  font-weight: 600;
`;

const Reason = styled.div`
  width: 80%;
  height: 80px;
  padding: 10px 10px 0px 10px;
  margin: 10px 30px 10px 0;
  border: 2px solid #c8cce5;
  border-radius: 10px;

  &:hover {
    border-color: #0ba5ec;
  }
`;

const StartDate = styled.div`
  flex: 1;
`;

const EndDate = styled.div`
  flex: 1;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #fff;
`;

const Statuswrap = styled.div`
  width: 56px;
  height: 23px;
  padding-top: 9px;
  border-radius: 10px;
  font-size: 15px;
  background-image: ${(props) =>
    props.value == "승인 전"
      ? "linear-gradient(3deg, #2E90FA, #175CD3)"
      : props.value == "승인"
      ? "linear-gradient(3deg, #32D583, #039855)"
      : props.value == "거절"
      ? "linear-gradient(3deg, #F97066, #D92D20)"
      : "none"};
`;
