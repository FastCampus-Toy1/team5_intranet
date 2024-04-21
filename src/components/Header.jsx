import HeaderClock from "./HeaderClock.jsx";
import Button from "./Button.jsx";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";

export default function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <HeaderSection>
      <GoBackWrapper>{location.pathname !== '/' && <Button onClick={handleGoBack}>돌아가기</Button>} </GoBackWrapper>
      <LogoutWrapper><Link to ="/logout"><Button>로그아웃</Button></Link></LogoutWrapper>
      <ClockWrapper><HeaderClock /></ClockWrapper>
    </HeaderSection>
  );
}

const HeaderSection = styled.header`
  height: 40px;
  display: flex;
  padding: 10px 0;
  align-items: center;
  gap: 1rem;
`;

const GoBackWrapper = styled.div`
  margin-right: auto;
`;

const LogoutWrapper = styled.div``;
const ClockWrapper = styled.div`
`;


