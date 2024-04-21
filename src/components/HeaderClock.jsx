import { useState, useEffect } from "react";
import { styled } from "styled-components";

const ClockH1 = styled.h1`
  font-size: 30px;
`;

function HeaderClock() {
  const currentTimer = () => {
    const date = new Date();
    return `${date.toLocaleString()}`;
  };
  
  const [timer, setTimer] = useState(currentTimer());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer(currentTimer());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <ClockH1>{timer}</ClockH1>;
}

export default HeaderClock;
