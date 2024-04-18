import { styled } from 'styled-components';
import Button from './Button';

const Section = styled.div`
  width: 239px;
  height: 110.15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular';
`;
const InfoContainer = styled.div`
  display: flex;

`
const InfoSection = styled.div`
  width: 75px;
  height: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const InfoTitle = styled.h1`
  width: 75px;
  height: 24px;
  text-align: center;
`
const Seperator = styled.p`
  width: 11px;
  height: 24px;
  font-size: 35px;
  color: #98A2B3;
`

const InfoStatusSection = styled.div`
  width: 67px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
`

const InfoContent = styled.p`
  width: 46px;
  height: 17px;
  text-align: center;
`

function TimeTable() {

  return(
    <Section>
      <InfoContainer>
        <InfoSection>
          <InfoTitle></InfoTitle>
        </InfoSection>
        <Seperator>|</Seperator>
        <InfoSection>
          <InfoTitle></InfoTitle>
          <InfoStatusSection>
            <InfoStatus></InfoStatus>
            <InfoContent></InfoContent>
          </InfoStatusSection>
        </InfoSection>
      </InfoContainer>
      <Button></Button>
    </Section>
  );
}

export default TimeTable;
