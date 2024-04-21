import { db } from '../core/firebase.js';
import { getDocs, collection, orderBy, query, limit, startAfter } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { Link } from "react-router-dom";
import Button from './Button.jsx';
import Search from './Notice_Search.jsx';
import Message from './Notice_Message.jsx';

// 컬렉션이름
const NOTICE_COLLECTION = "Notice";
const DATA_CNT_PER_PAGES = 5;


export default function Notice () {

  const [noticeList, setNoitceList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState('');
  const observerTarget = useRef(null);

  async function getList() {

    try {
      let q;
      // 첫번째 페이지
      if (!lastVisible) {
        q = query(
          collection(db, NOTICE_COLLECTION), 
          orderBy("timestamp", "desc"),
          limit(DATA_CNT_PER_PAGES)
        );
      } else {  
        q = query(
          collection(db, NOTICE_COLLECTION), 
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(DATA_CNT_PER_PAGES)
        );
      }
      // 복사
      const newNoticeList = [...noticeList];
      const documentSnapshots = await getDocs(q);
  
      if (documentSnapshots.size === 0) {
        if (currentPage < 1) {
          setMessage('등록된 공지사항이 없습니다.');
        } 
        return;
      }
  
      setCurrentPage(prev => prev + 1 );
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length-1]);
  
      documentSnapshots.forEach((doc) => {
        newNoticeList.push({
          id : doc.id,
          img_url : doc.data().img_url,
          title : doc.data().title,
          content: doc.data().content
        });
      })
      setNoitceList(newNoticeList);
      setDisplayList(newNoticeList);


    } catch (e) {
      setMessage('리스트를 가져오는데 실패했습니다.', e);
    }
  }

  // 첫리스트 가져오기  
  useEffect(() => {
    getList();
  },[])


  useEffect(() => {
    const io = new IntersectionObserver((entries) => {   

      entries.forEach(async entry => {  
      
        if (entry.isIntersecting) {
          getList();
          io.observe(observerTarget?.current);  
        }
      });
    }, {threshold: 1}); 

    if (observerTarget.current) io.observe(observerTarget.current); 

    return () => {
      io.disconnect(); 
    };
  },[currentPage]);

  async function getListAll() { 
    const allList = [];
    const documentSnapshots = await getDocs(collection(db, NOTICE_COLLECTION),orderBy("timestamp", "desc"));
    documentSnapshots.forEach((doc) => {
      allList.push({
        id : doc.id,
        img_url : doc.data().img_url,
        title : doc.data().title,
        content: doc.data().content
      });
    })
    return allList;
  }
  //검색기능
  async function handleSearch(keyword) {

    // 검색어 넣었다가 지웠을경우
    if (!keyword) {
      setDisplayList(noticeList);
      setCurrentPage(1);
      return;
    }
    const searchedList = [];
    const allList = await getListAll();
    const searchKey = new RegExp(keyword,'i');

    allList.filter(notice => {
      if (searchKey.test(notice.title)) {
        searchedList.push(notice);
      } else if (searchKey.test(notice.content))   {
        searchedList.push(notice);
      } 
    })
    setDisplayList(searchedList);
  }

  return (
    <NoticeSection>
    <NoticeHeader>
    <NoticeH2>공지사항</NoticeH2> 
    <Search handleSearch={handleSearch}></Search>
    <Link to="/noticeAdd"><Button>글쓰기</Button></Link>
    </NoticeHeader>
    <NoitceList>
    { displayList.map((notice, index) => {    
      // 마지막 요소
      if( displayList.length === index + 1 ) {
        return (  
          <NoticeImgDiv $url={notice.img_url} ref={observerTarget} key={notice.id}>
            <NoticeContentDiv>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeContent>{notice.content}</NoticeContent>
          </NoticeContentDiv>
          </NoticeImgDiv>
        );
      } else {
        return (  
          <NoticeImgDiv $url={notice.img_url} key={notice.id}>
            <NoticeContentDiv>
            <NoticeTitle>{notice.title}</NoticeTitle>
            <NoticeContent>{notice.content}</NoticeContent>
          </NoticeContentDiv>
          </NoticeImgDiv>
        );
      }
  })}
    </NoitceList> 
    {message && <Message>{message}</Message>}
    </NoticeSection>
  );
}

const NoticeSection = styled.section`
  border: solid 2px #C8CCE5;
  border-radius: 10px;
  width: 90%;
  height: 100%;
  padding: 20px;
  margin: auto;
  margin-top: 15px;
  background-color: #FFFFFF;
`;
const NoticeHeader = styled.div`
  display: flex;
  margin: 20px;
  flex-grow: 1;
`;

const NoticeH2 = styled.h2`
  font-size: 40px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-right: auto;
`;
const NoitceList = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const NoticeImgDiv = styled.div`
  margin-left: 20px;
  border: solid 1px #C8CCE5;
  min-width: 280px;
  height: 330px;
  background-image: url(${({$url}) => $url});
  background-size: 300px 240px;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 6%;
  position: relative;
  box-shadow: 5px 5px rgba(0,0,0,.1);
`;

const NoticeContentDiv = styled.div`
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left:0;
  border-top: solid 1px #C8CCE5;
`;

const NoticeTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin: 10px;
`;

const NoticeContent = styled.div`
  margin: 10px;
  line-height: 1.3;
  overflow: hidden;
  word-wrap: break-word;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2 ;
  -webkit-box-orient: vertical;
`;
