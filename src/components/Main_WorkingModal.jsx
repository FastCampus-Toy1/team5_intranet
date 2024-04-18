import { styled } from "styled-components";
import Button from "./Button";
import '../style.scss';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 580px;
  height: 332px;
  border-radius: 20px;
  border: 1px solid #C8CCE5;
`;

const TimeInfo = styled.h1`
  font-family: 'Pretendard-Regular';
  text-align: center;
  width: 339px;
  height: 58px;
  font-size: 30px;
  margin-bottom:30px;
`;

function Main_WorkingModal({isOpen, time, status, onClick}) {
  return(
    <ModalContainer style={{ display: isOpen ? "flex" : "none" }}>
      <TimeInfo>현재 시간 {time}입니다.<br/> 근무 {!status ? "시작" : "종료"}하시겠습니까?</TimeInfo>
      <Button onClick={onClick}>{!status ? "근무 시작" : "근무 종료"}</Button>
    </ModalContainer>
  );
}

export default Main_WorkingModal;