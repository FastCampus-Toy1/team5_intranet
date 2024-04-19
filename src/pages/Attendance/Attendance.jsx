import React, { useState } from "react";
import styled from "styled-components";
import Attendname from "../../components/Attend_Name";
import Select from "../../components/Attend_Select";
import Search from "../../components/Attend_Search";
import Gohome from "../../components/Attend_Gohome";
import Datafield from "../../components/Attend_Datafield";
import { createGlobalStyle } from "styled-components";

const Attendance = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <GlobalStyle />
      <Gohome />
      <Container>
        <Attendname />
        <Select setSelectedLabel={setSelectedLabel} />
        <Search setSearchInput={setSearchInput} />
        <Datafield selectedLabel={selectedLabel} results={searchInput} />
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
  min-height: 400px;
  height: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 101px 101px minmax(200px, 1fr);
  grid-template-columns: 20% 20% 20% 20% 20%;
  top: 15px;
  padding: 10px 100px 50px 100px;
  margin: 0px 50px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #c8cce5;
  top: 20px;
`;
