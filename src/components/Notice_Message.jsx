import { styled } from "styled-components";

export default function Message ({children}) {
  return <MessageDiv>{children}</MessageDiv>;
}

const MessageDiv = styled.div`
  color : red;
  font-size : 15px;
  text-align: center;
`;