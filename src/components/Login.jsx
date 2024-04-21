import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../core/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { styled } from "styled-components";

const USER_COLLECTION = "User";
const PROFILE_COLLECTION = "Profile";

const LoginBox = styled.section`
  width: 350px;
  height: 300px;
  border: solid 1px #d0d5dd;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginAttribute = styled.div`
  width: 290px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin: 10px;
  font-size: 25px;
`;

const InputBox = styled.input`
  display: block;
  width: 284px;
  height: 25px;
  margin: 15px 0;
  border: solid 1px #d0d5dd;
`;

const LoginBtn = styled.button`
  width: 290px;
  height: 40px;
  margin-top: 10px;
  background-color: #d0d5dd;
  border: 0;
  font-size: 15px;
  cursor: pointer;
`;

const ErrorDiv = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  color: red;
`;

export default function Login() {
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const session = window.sessionStorage.getItem("isLoggedIn");

  const [isLoggedIn, setIsLoggedIn] = useState(session ? true : false);
  const navigate = useNavigate();

  // 로그인 중인지 체크
  if (isLoggedIn) {
    useEffect(() => {
      navigate("/");
    }, []);
  }

  async function handleLogin(event) {
    // form 태그가 유발하는 새로고침 방지
    event.preventDefault();

    if (!userId || !pw) return;

    const docUserSnap = await getDoc(doc(db, USER_COLLECTION, userId));

    // ID 입력오류
    if (!docUserSnap.data()) {
      setErrMsg("ID가 존재하지 않습니다.");
      return;
    }

    if (docUserSnap?.data()?.PW === pw) {
      // 유저이름 가져오기
      const docProfileSnap = await getDoc(doc(db, PROFILE_COLLECTION, userId));
      if (docProfileSnap) {
        // 세션스토리지에 정보 저장
        window.sessionStorage.setItem("isLoggedIn", true);
        window.sessionStorage.setItem("userID", docUserSnap.id);
        window.sessionStorage.setItem("userName", docProfileSnap.data().name);
        setIsLoggedIn(true);
        // 이동
        navigate("/");
      }
      // PW 입력오류
    } else {
      setErrMsg("비밀번호를 확인해 주세요.");
      return;
    }
  }

  return (
    <LoginBox>
      <LoginAttribute>
        <LoginTitle>로그인</LoginTitle>
        <form>
          <InputBox
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value.trim())}
            placeholder="ID"
          ></InputBox>
          <InputBox
            required
            type="password"
            autoComplete="on"
            value={pw}
            onChange={(e) => setPw(e.target.value.trim())}
            placeholder="비밀번호"
          ></InputBox>
          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
        </form>
        {errMsg && <ErrorDiv>{errMsg}</ErrorDiv>}
      </LoginAttribute>
    </LoginBox>
  );
}
