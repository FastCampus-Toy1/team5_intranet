const Status = styled.div`
  background-image: ${props => (props.value == '신청 중' ? 'linear-gradient(3deg, #2E90FA, #175CD3)' 
                    : props.value == '승인' ? 'linear-gradient(3deg, #32D583, #039855)' 
                    : props.value == '거절' ? 'linear-gradient(3deg, #F97066, #D92D20)': 'none')};
  border-radius: 10px;
  width: 56px;
  height: 23px;
  font-size: 15px;
  padding-top: 9px;
`;