import React, { useState } from 'react';
import styled from 'styled-components';

const Search = ({ setSearchInput }) => {
  const [localSearchInput, setLocalSearchInput] = useState('');

  const handleInputChange = (event) => {
    setLocalSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchInput(localSearchInput);
    }
  };

  return (
    <Searchwrap>
      <Input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='검색하세요 !' />
    </Searchwrap>
  );
};

export default Search;

const Searchwrap = styled.div`
  grid-column: 5 / 6;
  display: flex;
  justify-content: flex-end;
  height: 35px;
`

const Input = styled.input`
  background: #ffffff;
  border-radius: 6px;
  border-style: solid;
  border-color: #1656fd;
  border-width: 1px;
  padding: 8px 12px 8px 12px;
  gap: 8px;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  top: 25px;
`