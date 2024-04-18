import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Gohome = () => {
  return (
    <Link to="/">
      <Btn>
      <div>
        <p>Home</p>
      </div>
      </Btn>
    </Link>
  );
};

export default Gohome;

const Btn = styled.button`
width: 108px;
height: 37.15px;
margin: 20px 0 0 50px;
border-radius: 10px;
border: 1px #C8CCE5 solid;

font-family: 'Pretendard-Regular';

background-color: white;
box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
transition-duration: 0.1s;

&:active {
  position: relative;
  left: 2px;
  top: 2px;
  box-shadow: none;
  }
`