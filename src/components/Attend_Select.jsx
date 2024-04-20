import React, { useState } from 'react';
import styled from 'styled-components';

const Select = (props) => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [label, setLabel] = useState('부재 옵션');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  return (
    <Selectsimple>
      <Baseselect>
        <Inputframestates>
          <Field>
            <Frame>
              <Alarm xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.25325 2.30662L4.39992 1.28662L1.33325 3.85329L2.19325 4.87329L5.25325 2.30662ZM14.6666 3.85995L11.5999 1.28662L10.7399 2.30662L13.8066 4.87995L14.6666 3.85995ZM7.99992 2.71329C4.68659 2.71329 1.99992 5.39995 1.99992 8.71329C1.99992 12.0266 4.67992 14.7133 7.99992 14.7133C11.3133 14.7133 13.9999 12.0266 13.9999 8.71329C13.9999 5.39995 11.3133 2.71329 7.99992 2.71329ZM7.99992 13.38C5.41992 13.38 3.33325 11.2933 3.33325 8.71329C3.33325 6.13329 5.41992 4.04662 7.99992 4.04662C10.5799 4.04662 12.6666 6.13329 12.6666 8.71329C12.6666 11.2933 10.5799 13.38 7.99992 13.38ZM8.66659 6.04662H7.33325V8.04662H5.33325V9.37996H7.33325V11.38H8.66659V9.37996H10.6666V8.04662H8.66659V6.04662Z"
                  fill="#445275"
                />
              </Alarm>
              <Placeholder style={{color: label !== '부재 옵션' ? '#000' : 'gray'}}>{label}</Placeholder>
            </Frame>
            <Arrow xmlns="http://www.w3.org/2000/svg" onClick={toggleDropdown} $isOpen={dropdownVisible}>
              <path
                d="M4.43685 5.78571C4.2427 6.07143 3.75731 6.07143 3.56315 5.78571L0.0683346 0.642856C-0.125822 0.357142 0.116873 -6.89165e-07 0.505186 -6.55218e-07L7.49481 -4.41647e-08C7.88313 -1.02174e-08 8.12582 0.357143 7.93167 0.642857L4.43685 5.78571Z"
                fill="black"
              />
            </Arrow>
          </Field>
        </Inputframestates>
        <Dropdown style={{display: dropdownVisible ? 'flex' : 'none'}}>
          <Content>
            <Slot>
              <DropdownList>
              <ListItem onClick={() => { window.location.reload(); }} >
                  <Content2>
                    <Label>전체</Label>
                  </Content2>
                </ListItem>
                </DropdownList>
                <DropdownList>
                <ListItem onClick={() => {setLabel('연차'), toggleDropdown(), props.setSelectedLabel('연차')}} >
                  <Content2>
                    <Label>연차</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('반차(오전)'), toggleDropdown(), props.setSelectedLabel('반차(오전)')}}>
                  <Content2>
                    <Label>반차(오전)</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('반차(오후)'), toggleDropdown(), props.setSelectedLabel('반차(오후)')}}>
                  <Content2>
                    <Label>반차(오후)</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('예비군'), toggleDropdown(), props.setSelectedLabel('예비군')}}>
                  <Content2>
                    <Label>예비군</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('조퇴'), toggleDropdown(), props.setSelectedLabel('조퇴')}}>
                  <Content2>
                    <Label>조퇴</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('외출'), toggleDropdown(), props.setSelectedLabel('외출')}}>
                  <Content2>
                    <Label>외출</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
              <DropdownList>
                <ListItem onClick={() => {setLabel('병가'), toggleDropdown(), props.setSelectedLabel('병가')}}>
                  <Content2>
                    <Label>병가</Label>
                  </Content2>
                </ListItem>
              </DropdownList>
            </Slot>
          </Content>
        </Dropdown>
      </Baseselect>
    </Selectsimple>
  );
};

export default Select;

const Selectsimple = styled.div`
  position: relative;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 25px;
  width: 200px;
  height: 128px;
  z-index: 1;
`

const Baseselect = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  gap: 4px;
`


const Inputframestates = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  border-radius: 4px;
  gap: 10px;
`

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;
  overflow: hidden;
  padding: 8px 12px 8px 12px;
  border-radius: 6px;
  border-style: solid;
  border-color: #1656fd;
  border-width: 1px;
  gap: 8px;
  background: #FFFFFF;
`

const Frame = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  height: 16px;
  gap: 8px;
`

const Placeholder = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: 1;
  color: gray;
`

const Alarm = styled.svg`
  position: relative;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  overflow: visible;
`

const Arrow = styled.svg`
  position: absolute;
  flex-shrink: 0;
  width: 8px;
  height: 6px;
  right: 0px;
  top: 17%;
  padding: 14px; 
  box-sizing: content-box;
  overflow: visible;
  cursor: pointer;
  transform: ${props => props.$isOpen ? 'translate(-8px, -6px) rotate(180deg)' : 'translate(-8px, -6px)'};
  transition: transform 0.3s ease-in-out; 
`

const Dropdown = styled.div`
  position: relative;
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 6px;
  border-style: solid;
  border-color: #b6c2e2;
  border-width: 1px;
  overflow: hidden;
  gap: 10px;
  background: #FFFFFF;
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  gap: 16px;
`

const Slot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  gap: 4px;
`

const DropdownList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  gap: 10px;
`

const ListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  padding: 8px;
  border-radius: 4px;
  gap: 0px;

  &:hover {
    background-color: lightgray;
  }
`

const Content2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;
  gap: 8px;
`

const Label = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  color: #11151F;
  font-weight: 500;
`
