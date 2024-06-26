import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import { db } from '../core/firebase.js';
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import Button from './Button.jsx';
import Message from './Notice_Message.jsx';

const NOTICE_COLLECTION = "Notice";

export default function Main_Notice () {

  const [noticeList, setNoticeList] = useState([]);
  const [message, setMessage] = useState('');

  try{
    // 리스트 가져오기  
    useEffect(() => {
      // 복사
      const newNoticeList = [...noticeList];

      async function getList() {

        const q = query(collection(db, NOTICE_COLLECTION), orderBy("timestamp", "desc"), limit(3));

        const querySnapshot = await getDocs(q); 
      
        querySnapshot.forEach((doc) => {

          newNoticeList.push({
            id : doc.id,
            img_url : doc.data().img_url,
            title : doc.data().title,
            content: doc.data().content
          });
        })
        setNoticeList(newNoticeList);
      }
      getList();  
    },[])
  } catch (e) {
    setMessage('리스트를 가져오는데 실패했습니다.', e);
  }

  return (
  <NoticeSection>
    <NoticeHeader>
      <NoticeH2>공지사항</NoticeH2>
      <Link to="/notice"><Button>더보기</Button></Link>
    </NoticeHeader>
    <NoticeList>
  {noticeList.map(notice => {
   return( 
    <NoticeImgDiv $url={notice.img_url} key={notice.id}>
        <NoticeContentDiv>
          <NoticeTitle>{notice.title}</NoticeTitle>
          <NoticeContent>{notice.content}</NoticeContent>
        </NoticeContentDiv>
      </NoticeImgDiv>
    )
  })}
    </NoticeList> 
    {message && <Message>{message}</Message>}
  </NoticeSection>
  );
}


const NoticeSection = styled.section`
  border: solid 2px #C8CCE5;
  border-radius: 10px;
  width: 100%;
  height: 41vh;
  min-width: 600px;
  min-height: 100px;
  margin: auto;
  margin-top: 20px;
  margin-right: 20px;
  padding: 13px;
  box-sizing: border-box;
  background-color: #FFFFFF;
`;

const NoticeHeader = styled.div`
  display: flex;
  margin: 5px 20px;
  flex-grow: 1;
  align-items: center;
`;

const NoticeH2 = styled.h2`
  font-size: 30px;
  font-weight: 700;
  margin-right: auto;
  font-weight: 700;
`;

const NoticeList = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  margin-bottom: 10px;
`;

const NoticeImgDiv = styled.div`
  border: solid 1px #C8CCE5;
  width: 32%;
  height: 80%;
  background-image: url(${({$url}) => $url});
  background-size: 100% 75%;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 6%;
  position: relative;
  box-shadow: 5px 5px rgba(0,0,0,.1);
`;

const NoticeContentDiv = styled.div`
  height: 25%;
  width: 100%;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left:0;
  border-top: solid 1px #C8CCE5;
`;

const NoticeTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  margin: 7px;
`;

const NoticeContent = styled.div`
  margin: 5px;
  line-height: 1.1;
  font-size: 12px;
  overflow: hidden;
  word-wrap: break-word;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2 ;
  -webkit-box-orient: vertical;
`;


