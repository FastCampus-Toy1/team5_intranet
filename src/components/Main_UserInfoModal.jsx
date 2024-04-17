import React, { useState } from 'react';
import Main_UserInfo from './Main_UserInfo';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      {isModalOpen && <Main_UserInfo closeModal={closeModal} />} {/* 모달 표시 조건 설정 */}
    </div>
  );
}

export default App;