import React, { useState } from "react";
import styled from "styled-components";

function Main_UserInfoInput({ labelText, placeholderText, value, onChange, disabled }) {
  const [placeholder, setPlaceholder] = useState(placeholderText);

  return (
    <InputWrap>
      <InputLabel>{labelText}</InputLabel>
      <ProfileInput
        type="text"
        placeholder={placeholder}
        onFocus={() => setPlaceholder('')}
        onBlur={() => setPlaceholder(placeholderText)}
        value={value}
        onChange={onChange}
        disabled={disabled} />
    </InputWrap>
  );
}

export default Main_UserInfoInput;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  width: 390px;
  margin-bottom: 10px;
`;

const InputLabel = styled.p`
  margin-right: 37px;
`;

const ProfileInput = styled.input`
  width: 220px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #C8CCE5;
  padding: 0 10px;
`;
