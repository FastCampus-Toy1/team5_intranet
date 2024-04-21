import { styled } from "styled-components";
import Button from "./Button";
import { useRef } from 'react';

const Body = styled.div`
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -1;
`;

const Blur = styled.div`
  background-color: rgba(0,0,0,.5);
  z-index: 2;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 580px;
  height: 332px;

  border-radius: 20px;
  border: 1px solid #C8CCE5;
  background-color: #fff;
`;

const TimeInfo = styled.h1`
  width: 339px;
  height: 58px;

  margin-bottom:30px;

  font-size: 30px;
  text-align: center;
`;

function Main_WorkingModal({isOpen, time, status, onClick, clickOutsideOfModal}) {
  const ref = useRef(null);

  return(
    <>
      <Body />
      {isOpen && <Blur ref={ref} onClick={(e) => clickOutsideOfModal(ref,e)} />}
        <ModalContainer style={{ display: isOpen ? "flex" : "none" }} >
          <TimeInfo>현재 시간 {time}입니다.<br/> 근무 {!status ? "시작" : "종료"}하시겠습니까?</TimeInfo>
          <Button onClick={onClick}>{!status ? "근무 시작" : "근무 종료"}</Button>
        </ModalContainer>
    </>
  );
}

export default Main_WorkingModal;