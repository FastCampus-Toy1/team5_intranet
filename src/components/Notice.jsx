import { db } from '../core/firebase.js';
import { doc, setDoc, getDocs, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
// 컬렉션이름
const NOTICE_COLLECTION = "Notice";


const NoticeSection = styled.section`
  border: solid 2px #C8CCE5;
  border-radius: 10px;
  width: 95%;
  height: 100%;
  padding: 20px;
  margin:auto;
`;

const NoticeH2 = styled.h2`
  font-size: 40px;
  margin-left: 20px;
  margin-bottom: 20px;
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
  min-width: 300px;
  height: 350px;
  background-image: url(${({$url}) => $url});
  background-size: 300px 250px;
  background-repeat: no-repeat;
  background-position-x: center;
  border-radius: 6%;
  position: relative;
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
  text-aling: left;
  display: -webkit-box;
  -webkit-line-clamp: 2 ;
  -webkit-box-orient: vertical;
`;

export default function Notice () {

  const [noticeList, setNoitceList] = useState([]);

  // useEffect(() => {
  //   async function setData (){
  //     await setDoc(doc(db, NOTICE_COLLECTION, "5"), {  
  //       title: 'test123',
  //       content: 'test123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏtest123아주길게해보려구테스트를하는데이게어떤지모르겠네아아아아아아아아아하기시러놀러가고싶다ㅏㅏㅏㅏㅏㅏ',
  //       img_url: 'https://firebasestorage.googleapis.com/v0/b/toyproject-team5.appspot.com/o/%E1%84%8B%E1%85%AE%E1%84%89%E1%85%AE%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AF%E1%86%AB.jpg?alt=media&token=a84b7555-f875-4eac-af2b-032c0ef2a3b2',
  //       timestamp: serverTimestamp()
  //   })
  // } 
  // setData();
  // }, []);



  // 리스트 가져오기  
  useEffect(() => {
    // 복사
    const newNoticeList = [...noticeList];
    async function getList() {

      const q = query(collection(db, NOTICE_COLLECTION), orderBy("timestamp", "desc"));

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

  return (
  <NoticeSection>
    <NoticeH2>공지사항</NoticeH2>
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
  </NoticeSection>
  );
}