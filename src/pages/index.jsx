import React from 'react';
import Main_UserProfile from "../components/Main_UserProfile";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from '../components/Main_Notice.jsx';
import Attendance from "../pages/Attendance/Attendance.jsx";

function MainPage() {
  return (
    <>
      <Notice />
      <Attendance />
      <UserAbsenceContainer />
      <Main_UserProfile />
    </>
  );
}

export default MainPage;
