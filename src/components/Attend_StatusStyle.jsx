const Status = styled.div`
  width: 56px;
  height: 23px;
  padding-top: 9px;
  border-radius: 10px;
  font-size: 15px;
  background-image: ${props => (props.value == '승인 전' ? 'linear-gradient(3deg, #2E90FA, #175CD3)' 
                    : props.value == '승인' ? 'linear-gradient(3deg, #32D583, #039855)' 
                    : props.value == '거절' ? 'linear-gradient(3deg, #F97066, #D92D20)': 'none')};
`;

export default Status;