const AbsenceOptionwrap = styled.div`
  border-radius: 30px;
  font-size: 15px;
  width: ${props => (props.value == '연차' ? '55px'
          : props.value == '반차' ? '55px' 
          : props.value == '반차(오전)' ? '70px' 
          : props.value == '반차(오후)' ? '70px' 
          : props.value == '예비군' ? '70px' 
          : props.value == '조퇴' ? '55px' 
          : props.value == '외출' ? '55px'
          : props.value == '병가' ? '55px'
          : props.value == '기타' ? '55px'
          : 'none')};

  height:  ${props => (props.value == '연차' ? '18px'
            : props.value == '반차' ? '18px'
            : props.value == '반차(오전)' ? '23px' 
            : props.value == '반차(오후)' ? '23px'
            : props.value == '예비군' ? '23px'  
            : props.value == '조퇴' ? '18px'
            : props.value == '외출' ? '18px' 
            : props.value == '병가' ? '18px'
            : props.value == '기타' ? '18px' 
            : 'none')};

  padding: ${props => (props.value == '연차' ? '8px 8px 4px 3px'
            : props.value == '반차' ? '8px 8px 4px 3px'
            : props.value == '반차(오전)' ? '8px 5px 0px 5px' 
            : props.value == '반차(오후)' ? '8px 3px 0px 3px' 
            : props.value == '예비군' ? '8px 3px 0px 3px' 
            : props.value == '조퇴' ? '8px 8px 4px 3px'
            : props.value == '외출' ? '8px 8px 4px 3px'
            : props.value == '병가' ? '8px 8px 4px 3px'
            : props.value == '기타' ? '8px 8px 4px 3px'
            : 'none')};

  background-image: ${props => (props.value == '연차' ? 'linear-gradient(3deg, #9B8AFB, #DD2590)'
                                : props.value == '반차' ? 'linear-gradient(3deg, #FEB273, #EC4A0A)' 
                                : props.value == '반차(오전)' ? 'linear-gradient(0deg, #FECB4B, #F04438)' 
                                : props.value == '반차(오후)' ? 'linear-gradient(30deg, #FEB273, #000)' 
                                : props.value == '예비군' ? 'linear-gradient(3deg, #12B76A, #000)' 
                                : props.value == '조퇴' ? 'linear-gradient(3deg, #717BBC, #363F72)'
                                : props.value == '외출' ? 'linear-gradient(3deg, #851651, #510B24)'
                                : props.value == '병가' ? 'linear-gradient(3deg, #717BBC, #363F72)' 
                                : props.value == '기타' ? 'linear-gradient(3deg, #717BBC, #363F72)'
                                : 'none')};
`

export default AbsenceOptionwrap;