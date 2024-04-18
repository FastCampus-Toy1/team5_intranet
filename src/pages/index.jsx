import React from "react";
import UserAbsenceContainer from "../components/Main_UserAbsenceContainer";
import Notice from '../components/Main_Notice.jsx';
import Attendance from "../pages/Attendance/Attendance.jsx";

function MainPage() {
  return (
    <>
      <Notice />
      <Attendance />
      <UserAbsenceContainer />
    </>
  );
}

export default MainPage;
