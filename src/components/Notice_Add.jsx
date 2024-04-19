import { db } from '../core/firebase.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import Button from './Button.jsx';
import Message from './Notice_Message.jsx';


// 컬렉션이름
const NOTICE_COLLECTION = "Notice";
// dummy 이미지 경로
const NOTICE_DUMMY_IMG = 'https://firebasestorage.googleapis.com/v0/b/toyproject-team5.appspot.com/o/notice%2Fno-image.jpg?alt=media&token=66ce5f54-a7b4-4f17-b1a2-336d629f4bea';


export default function Notice_Add () {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleAddData() {

    if (!title) {
      setMessage('제목을 입력해주세요.');
      return;
    }
    if (!content) {
      setMessage('내용을 입력해주세요.');
      return;
    }

    let imgUrl = '';

    try {
      // 이미지가 있으면 이미지를 먼저 업데이트
      if (imgFile) {
        const storage = await getStorage();
        const storageRef = await ref(storage, 'notice/' + imgFile.name);
        const snapshot = await uploadBytes(storageRef, imgFile);
        imgUrl = await getDownloadURL(snapshot.ref);
      // 이미지가 없으면 dummy 세팅
      } else {
        imgUrl = NOTICE_DUMMY_IMG;
      }

      await addDoc(collection(db, NOTICE_COLLECTION), {  
        title: title,
        content: content,
        img_url: imgUrl,
        timestamp: serverTimestamp()
      })
      // 리스트 페이지로 이동
      navigate('/notice');

    } catch (e) {
      setMessage('등록을 실패하였습니다.', e);
    }
  } 
  return (
    <Section> 
    <Header>공지사항 입력</Header>
    <AddForm>
    <TitleLine>
      <Subtitle>제 목</Subtitle> 
      <InputForm value={title} required onChange={(e) => setTitle(e.target.value)}></InputForm>
    </TitleLine>
    <ContentLine>
      <Subtitle>내 용</Subtitle> 
      <Textarea value={content} required onChange={(e) => setContent(e.target.value)}></Textarea>
    </ContentLine>
    <FileLine>
      <Subtitle>이미지 </Subtitle>
      <InputForm type="file" onChange={(e) => setImgFile(e.target.files[0])} accept=".png, .jpeg, .jpg, .webp" ></InputForm>
    </FileLine>
    {message && <Message>{message}</Message>}
    <ButtonLine>
      <Button onClick={handleAddData}>등록</Button>
    </ButtonLine>
    </AddForm>
    </Section>
  );
}

const Section = styled.section`
  border: solid 2px #C8CCE5;
  border-radius: 10px;
  width: 700px;
  height: 500px;
  padding: 10px;
  margin: auto;
  position: relative;
`;

const Header = styled.h2`
  font-size: 25px;
  margin-right: auto;
  text-align: center;
  margin-top: 15px;
`;

const AddForm = styled.div`
  display: block;
  width: 650px;
  margin-top: 30px;
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
`;

const Subtitle = styled.div`
  width: 50px;
  font-size: 18px;
`;

const InputForm = styled.input`
  width : 580px;
  height: 25px;
  display: block;
  margin-left: 10px;
`;

const Textarea = styled.textarea`
  width : 580px;
  height: 200px;
  display: block;
  margin-left: 10px;
`;

const TitleLine = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const ContentLine = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const FileLine = styled.div`
display: flex;
margin-bottom: 10px;
`;
const ButtonLine = styled.div`
text-align: center;
margin-top: 30px;
`;
