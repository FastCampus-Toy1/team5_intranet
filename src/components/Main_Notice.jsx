import { Link } from "react-router-dom";
import { db } from '../core/firebase.js';
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import  Button  from './Button.jsx';

const NOTICE_COLLECTION = "Notice";


const NoticeSection = styled.section`
  border: solid 2px #C8CCE5;
  border-radius: 10px;
  width: 697px;
  height: 458px;
  padding: 10px;
  margin:auto;
`;

const NoticeHeader = styled.div`
  display: flex;
  margin: 20px;
  flex-grow: 1;
`;

const NoticeH2 = styled.h2`
  font-size: 30px;
  margin-right: auto;
`;


const NoitceList = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
`;

const NoticeImgDiv = styled.div`
  border: solid 1px #C8CCE5;
  min-width: 300px;
  height: 350px;
  background-image: url(${({$url}) => $url});
  background-size: 300px 250px;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 6%;
  position: relative;
  box-shadow: 5px 5px rgba(0,0,0,.1);
`;

const NoticeContentDiv = styled.div`
  height: 100px;
  width: 100%;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  left:0;
`;

const NoticeTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin: 10px;
`;

const NoticeContent = styled.div`
  margin: 10px;
  line-height: 1.5;
  overflow: hidden;
  word-wrap: break-word;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2 ;
  -webkit-box-orient: vertical;
`;

const MessageDiv = styled.div`
  color : red;
  font-size : 15px;
  text-align: center;
`;


export default function Main_Notice () {

  const [noticeList, setNoitceList] = useState([]);
  const [message, setMessage] = useState('');

  try{
    // 리스트 가져오기  
    useEffect(() => {
      // 복사
      const newNoticeList = [...noticeList];

      async function getList() {

        const q = query(collection(db, NOTICE_COLLECTION), orderBy("timestamp", "desc"), limit(2));

        const querySnapshot = await getDocs(q); 
      
        querySnapshot.forEach((doc) => {

          newNoticeList.push({
            id : doc.id,
            img_url : doc.data().img_url,
            title : doc.data().title,
            content: doc.data().content
          });
        })
        setNoitceList(newNoticeList);
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
    <NoitceList>
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
    </NoitceList> 
    {message && <MessageDiv>{message}</MessageDiv>}
  </NoticeSection>
  );
}