import { styled } from "styled-components";

const Btn = styled.button`
  width: 108px;
  height: 37.15px;

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

function Button ({ children, onClick }) {
  return(
    <Btn type="button" onClick={onClick}>{ children }</Btn>
  )
}

export default Button;