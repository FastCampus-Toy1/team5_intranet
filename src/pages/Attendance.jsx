import React, { useState } from 'react';
import styled from 'styled-components';
import Attendname from '../components/Attend_Name';
import Select from '../components/Attend_Select';
import Search from '../components/Attend_Search';
import Header from '../components/Header';
import Datafield from '../components/Attend_Datafield';
import checkLogin from '../components/CheckLogin.jsx';
import { createGlobalStyle } from 'styled-components';

const Attendance = () => {
  // 로그인여부체크
  checkLogin();

  const [selectedLabel, setSelectedLabel] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <GlobalStyle />
          <Header />
          <Container>
            <Attendname />
            <Select setSelectedLabel={setSelectedLabel} />
            <Search setSearchInput={setSearchInput}/>
            <Datafield selectedLabel={selectedLabel} results={searchInput}/>
          </Container>
      </>
  );
};

export default Attendance;

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%; 
    margin: 0;
    padding: 0;
    background-color: #EAECF5;
  }
`;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 101px 101px minmax(200px, 1fr);
  grid-template-columns: 20% 20% 20% 20% 20%;
  height: auto;
  min-height: 500px;
  top: 20px;
  overflow-x: hidden;
  padding: 10px 100px 50px 100px;
  margin: 0px 50px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #c8cce5;
`;
