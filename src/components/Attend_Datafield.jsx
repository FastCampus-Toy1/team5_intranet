import React, { useState, useEffect } from 'react';
import { db } from '../core/firebase';
import { getDocs, collection } from 'firebase/firestore';
import styled from 'styled-components';

const Datafield = ({selectedLabel, results}) => {
  const [memberList, setMemberList] = useState([]);
  const MEMBER_COLLECTION = "Members";

  async function getList() {
    const newmemberList = []; // 빈 배열로 초기화
    const querySnapshot = await getDocs(collection(db, MEMBER_COLLECTION));
    querySnapshot.forEach((doc) => {
      newmemberList.push({
        id : doc.id,
        absenceOption: doc.data().absenceOption,
        startDate : new Date(doc.data().startDate).toLocaleDateString('ko-KR'), 
        endDate: new Date(doc.data().endDate).toLocaleDateString('ko-KR'),
        reason: doc.data().reason,
        status: doc.data().status,
      });
    });

    // startDate 값에 따라 정렬
    newmemberList.sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      return dateA.getTime() - dateB.getTime();
    });
    
    setMemberList(newmemberList);
  };

  useEffect(() => {
    getList();
  },[]);


  return (
    <Datafd>
      <ListName>
        <Name>이름</Name>
        <Value>휴가 종류</Value>
        <SubReason>휴가 이유</SubReason>
        <Start>휴가 시작</Start>
        <End>휴가 종료</End>
        <SubStatus>신청 상태</SubStatus>
      </ListName>
      {memberList.map((member, index) => (
        (!selectedLabel || member.absenceOption == selectedLabel) &&
        (!results || 
          member.id.includes(results) || 
          member.absenceOption.includes(results) || 
          member.reason.includes(results) || 
          member.startDate.includes(results) || 
          member.endDate.includes(results) || 
          member.status.includes(results)) && (
          <Members key={member.id + index}>
            <Id>{member.id}</Id>
            <AbsenceOption>
              <AbsenceOptionwrap value={member.absenceOption}>
              {member.absenceOption}
              </AbsenceOptionwrap>
            </AbsenceOption>
            <Reason>{member.reason === '예비군' ? '🪖 ' + member.reason
                        : member.reason === '외출' ? '🏃🏻‍♂️ ' + member.reason
                        : member.reason === '병가' ? '💊 ' + member.reason
                        : member.reason === '휴가' ? '🏖️ ' + member.reason
                        : member.reason}</Reason>
            <StartDate>{member.startDate.slice(0, -1)}</StartDate>
            <EndDate>{member.endDate.slice(0, -1)}</EndDate>
            <Status>
              <Statuswrap value={member.status}>
                {member.status}
              </Statuswrap>
            </Status>
          </Members>
        )
      ))}
    </Datafd>
  );
};

export default Datafield;

const Datafd = styled.div`
  grid-row: 3 / 4;
  grid-column: 1 / 7;🪖
`

const ListName = styled.div`
  grid-column: 1 / 7;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #C8CCE5;
  width: 98%;
  height: 40px;
  margin: 0px auto;
  position: relative;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Name = styled.div`
  flex: 1;
`

const Value = styled.div`
  flex: 1;
`

const SubReason = styled.div`
  flex: 1;
`

const Start = styled.div`
  flex: 1;
`

const End = styled.div`
  flex: 1;
`

const SubStatus = styled.div`
  flex: 1;
`

const Members = styled.div`
  grid-column: 1 / 7;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 1px solid #C8CCE5;
  border-radius: 10px;
  width: 98%;
  height: 40px;
  margin: 0px auto;
  position: relative;
  margin-bottom: 10px;
`;

const Id = styled.div`
  flex: 1;
  font-size: 23px;
  font-weight: 600;
`;

const AbsenceOption = styled.div`
  flex: 1;
  flex: 1;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AbsenceOptionwrap = styled.div`
  border-radius: 10px;
  width: 39px;
  height: 18px;
  font-size: 15px;
  padding: 8px 3px 4px 3px;
  background-image: ${props => (props.value == '연차' ? 'linear-gradient(3deg, #D6BBFB, #6941C6)' 
                                : props.value == '반차' ? 'linear-gradient(3deg, #FEB273, #EC4A0A)' 
                                : props.value == '조퇴' ? 'linear-gradient(3deg, #FEB273, #EC4A0A)' 
                                : 'none')};
`

const Reason = styled.div`
  flex: 1;
`;

const StartDate = styled.div`
  flex: 1;
`;

const EndDate = styled.div`
  flex: 1;
`;

const Status = styled.div`
  flex: 1;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Statuswrap = styled.div`
  background-image: ${props => (props.value == '신청 중' ? 'linear-gradient(3deg, #2E90FA, #175CD3)' 
                    : props.value == '승인' ? 'linear-gradient(3deg, #32D583, #039855)' 
                    : props.value == '거절' ? 'linear-gradient(3deg, #F97066, #D92D20)': 'none')};
  border-radius: 10px;
  width: 56px;
  height: 23px;
  font-size: 15px;
  padding-top: 9px;
`;


