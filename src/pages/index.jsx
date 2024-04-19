import React from 'react';
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from '../components/Main_Notice.jsx';
import Header from '../components/Header.jsx';

function MainPage() {
  return (
    <>
      <Header />
      <Notice />
      <UserAbsenceContainer />
      <Main_UserProfile />
    </>
  );
}

export default MainPage;
