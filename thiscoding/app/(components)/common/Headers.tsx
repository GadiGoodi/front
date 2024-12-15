'use client';

import '@/app/globals.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileImg from '@/public/asset/defaultImage.png';
import LogIn from './LogIn';
import SignUp from './SignUp';
import FindPassword from './FindPassword';
import { useAuthStore } from '@/app/store/store';
import CodingroomsModal from '../codingrooms/CodingroomsModal';

interface User {
  name: string;
  nickname: string;
  profileImage: string;
}

const Headers = () => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [isLoggedIn, setISLoggedIn] = useState<boolean>(false); // 로그인 상태 관리
  const [user, setUser] = useState<User | null>(null); // 사용자 정보 상태 관리

  // 로그인 상태와 사용자 정보를 로컬 스토리지에서 불러오는 useEffect
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 'true'로 저장된 값 확인
    const storedUser = localStorage.getItem('user');

    if (storedIsLoggedIn && storedUser) {
      setISLoggedIn(true);
      setUser(JSON.parse(storedUser)); // JSON.parse()로 user 객체 불러오기
    }
  }, []);

  const dropDownHandler = () => {
    setProfileDropDown(!profileDropDown);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    setUser(null);
    setISLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setCurrentModal(null); // 모달 닫기
    window.location.href = '/';

    // 클라이언트 사이드에서 리다이렉트
    // if (typeof window !== 'undefined') {
    //   router.push('/'); // 메인 페이지로 이동
    // }
  };

  return (
    <header className="bg-white h-[105] flex items-center justify-between px-6">
      <nav className="flex gap-10 justify-center items-center">
        <Link href="/" className="text-2xl font-bold">
          THISCODING;
        </Link>

        <button onClick={openModal} className="hover:text-[#0095E8]">
          코드방 생성
        </button>
          {isModalOpen && <CodingroomsModal />}

        <Link href="/qna" className="hover:text-[#0095E8]">
          질문 & 답변
        </Link>
        <Link href="/notices" className="hover:text-[#0095E8]">
          고객센터
        </Link>
        {isLoggedIn ? (
          <Link href="/mypage" className="hover:text-[#0095E8]">
            마이페이지
          </Link>
        ) : null}
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="bg-[#EBEBEB] border-2 border-[#D0D0D0] p-2 pr-10 rounded-[14px]"
          />
          <button>
            <SearchOutlinedIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: '#0095E8', fontSize: '30px' }}
            />
          </button>
        </div>
        <button className="hover:text-[#0095E8]">
          <NotificationsNoneOutlinedIcon style={{ fontSize: '30px' }} />
        </button>

        <div>
          {/* 로그인 상태가 true일 때만 프로필 렌더링 */}
          {isLoggedIn && user ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                onClick={dropDownHandler}
                className="relative cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <input
                    className="bg-gray-700 size-10 rounded-full"
                    type="image"
                    src={user?.profileImage || '/asset/defaultImage.png'} // user가 있으면 프로필 이미지 사용
                    alt="프로필 이미지"
                  />
                  <span>{user?.name}</span>
                </div>
                {profileDropDown && (
                  <div className="w-[250px] h-[180px] bg-[#EFEFEF] rounded-2xl absolute right-2 top-14 flex-col justify-between items-center z-50">
                    <div className="border-b h-[70px] ml-4 mt-3">
                      <div>닉네임</div>
                      <div className="text-[#666666]">{user?.name}</div>
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
            <button onClick={() => setCurrentModal('login')}>로그인</button>
          )}

          {currentModal === 'login' && (
            <LogIn setCurrentModal={setCurrentModal} />
          )}
          {currentModal === 'signup' && (
            <SignUp setCurrentModal={setCurrentModal} />
          )}
          {currentModal === 'find-password' && (
            <FindPassword setCurrentModal={setCurrentModal} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Headers;
function setIsModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
