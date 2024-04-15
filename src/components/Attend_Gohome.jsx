import React from 'react';
import styled from 'styled-components';

const Gohome = () => {
  return (
    <Btn>
      <div>
        <p>Home</p>
      </div>
    </Btn>
  );
};

export default Gohome;

const Btn = styled.button`
  width: 80px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #C8CCE5;
  background-color: #FFFFFF;
  margin-top: 20px;
  margin-left: 50px;

  button {
    border: none;
    background-color: #FFFFFF;
  }
`