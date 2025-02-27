'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import CodingroomsModal from '@/entities/codingrooms/ui/CodingroomsModal';
import UserStore from '@/shared/store/store';
import useModalStore from '@/shared/store/store';
import Modal from '@/shared/ui/ModalManager';
import Search from './Search';

interface User {
  email: string;
  nickname: string;
  imageUrl: string;
  password: string;
}

const Header = () => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // 사용자 정보 상태 관리
  const { isLoggedIn, userInfo, deleteToken, deleteUserInfo } = UserStore();
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    console.log('userInfo:', userInfo.email);
    console.log('isLoggedIn:', isLoggedIn());

    if (isLoggedIn()) {
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }, [isLoggedIn(), userInfo]);

  const dropDownHandler = () => {
    setProfileDropDown(!profileDropDown);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const coderoomOpenModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    setUser(null);
    deleteToken();
    deleteUserInfo();
    setCurrentModal(null);
    window.location.href = '/';
    alert('로그아웃 되었습니다.');
  };

  return (
    <header className="bg-white h-[105] flex items-center justify-between px-6">
      <nav className="flex gap-10 justify-center items-center">
        <Link href="/" className="text-2xl font-bold">
          THISCODING;
        </Link>

        <button onClick={coderoomOpenModal} className="hover:text-[#0095E8]">
          코드방 생성
        </button>
        {isModalOpen && <CodingroomsModal />}

        <Link href="/qna" className="hover:text-[#0095E8]">
          질문 & 답변
        </Link>
        <Link href="/notices" className="hover:text-[#0095E8]">
          고객센터
        </Link>
        {isLoggedIn() ? (
          <Link href="/mypage" className="hover:text-[#0095E8]">
            마이페이지
          </Link>
        ) : null}
      </nav>

      <div className="flex items-center space-x-4">
        <Search />

        {isLoggedIn() && user ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={dropDownHandler} className="relative cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  className="bg-gray-700 size-10 rounded-full"
                  type="image"
                  src={user?.imageUrl || '/png/defaultImage.png'} // user가 있으면 프로필 이미지 사용
                  alt="프로필 이미지"
                />
                <span>{userInfo?.nickname}</span>
              </div>
              {profileDropDown && (
                <div className="w-[250px] h-[180px] bg-[#EFEFEF] rounded-2xl absolute right-2 top-14 flex-col justify-between items-center z-50">
                  <div className="border-b h-[70px] ml-4 mt-3">
                    <div>닉네임</div>
                    <div className="text-[#666666]">{userInfo?.nickname}</div>
                  </div>
                  <div className="h-[70px] ml-4 mt-3">
                    <Link href="/mypage" className="hover:text-[#0095E8]">
                      <div>마이페이지</div>
                    </Link>
                    <div>
                      <DarkModeIcon /> <LightModeIcon /> 다크모드 / 라이트모드
                    </div>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="text-[#666666] bg-[#D4D4D4] rounded-b-2xl h-[40px] flex justify-center items-center cursor-pointer"
                  >
                    <LogoutIcon />
                    로그아웃
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // <button onClick={() => setCurrentModal('login')}>로그인</button>
          <>
            <button onClick={() => openModal('login')}>로그인</button>
            <Modal />
          </>
        )}

        {/* {currentModal === 'login' && (
          <LogIn setCurrentModal={setCurrentModal} />
        )}
        {currentModal === 'signup' && (
          <SignUp setCurrentModal={setCurrentModal} />
        )}
        {currentModal === 'find-password' && (
          <FindPassword setCurrentModal={setCurrentModal} />
        )} */}
      </div>
    </header>
  );
};

export default Header;
