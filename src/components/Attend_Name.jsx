import styled from 'styled-components';
import React from 'react';

const Attendnav = () => {

  return (
    <NavWrapper>
      <h1>부재 신청 현황</h1>
    </NavWrapper>
  );
};

export default Attendnav;

const NavWrapper = styled.nav`
  position: relative;
  grid-column: 1 / 7;
  width: 100%;
  height: 80px;
  padding-top: 25px; 
  border-bottom: 1px solid #C8CCE5;
  font-size: 35px;
`