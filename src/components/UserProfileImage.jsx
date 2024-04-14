import React from "react";
import styled from "styled-components";
import profileImg from '../assets/profileImg.png/'

const UserProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;

function UserProfileImage() {
  return (
    <UserProfileImg src={profileImg}></UserProfileImg>
  )
}

export default UserProfileImage;