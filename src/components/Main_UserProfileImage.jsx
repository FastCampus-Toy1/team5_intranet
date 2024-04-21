import React from "react";
import styled from "styled-components";
import profileImg from '../assets/profileImg.png/';

function Main_UserProfileImage() {
  return (
    <UserProfileImg src={profileImg}></UserProfileImg>
  )
};

export default Main_UserProfileImage;

const UserProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
`;
