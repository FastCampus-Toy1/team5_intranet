import React, { useState } from 'react';
import styled from 'styled-components';
import Attendname from '../../components/Attend_Name';
import Select from '../../components/Attend_Select';
import Search from '../../components/Attend_Search';
import Gohome from '../../components/Attend_Gohome';
import Datafield from '../../components/Attend_Datafield';
import "../../style.scss";

const Attendance = () => {

  const [selectedLabel, setSelectedLabel] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  return (
      <Full>
        <Gohome />
        <Container>
          <Attendname />
          <Select setSelectedLabel={setSelectedLabel} />
          <Search setSearchInput={setSearchInput}/>
          <Datafield selectedLabel={selectedLabel} results={searchInput}/>
        </Container>
      </Full>
  );
};

export default Attendance;

const Full = styled.div`
  background-color: #EAECF5;
  height: 100vh;
`

const Container = styled.div`
  position: relative;
  height: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 101px 101px 1fr;
  grid-template-columns: 16.66% 16.66% 16.66% 16.66% 16.66% 16.66%;
  top: 15px;
  padding: 10px 150px 80px 150px;
  margin: 0px 50px 100px 50px;
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #C8CCE5;
  top: 20px;
`

