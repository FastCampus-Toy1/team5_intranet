import React from 'react';
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from '../components/Main_Notice.jsx';

function MainPage() {
  return (
    <>
      <Notice />
      <UserAbsenceContainer />
      <Main_UserProfile />
    </>
  );
}

export default MainPage;
