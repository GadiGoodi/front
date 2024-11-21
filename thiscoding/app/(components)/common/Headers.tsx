'use client';

import '@/app/globals.css';
import React, { useState } from 'react';
import Link from 'next/link';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CodingroomsModal from '../codingrooms/CodingroomsModal';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';

const Headers = () => {

  const [profileDropDown, setProfileDropDown] = useState(false);

  const dropDownHandler = () => {
    setProfileDropDown(!profileDropDown);
  }
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(!isModalOpen); // 모달 열기

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
        <Link href="/mypage" className="hover:text-[#0095E8]">
          마이페이지
        </Link>
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
        <div onClick={dropDownHandler} className='relative'>
          <input
            className="bg-gray-700 size-10 rounded-full"
            type="image"
            src="/asset/defaultImage.png"
            alt="프로필 이미지"
          />
          {profileDropDown === true ?
            <div className='w-[250] h-[180] bg-[#EFEFEF] rounded-2xl absolute right-2 top-14 flex-col justify-between items-center'>
              <div className='border-b h-[70] ml-4 mt-3'>
                <div>닉네임</div>
                <div className='text-[#666666]'>abc@naver.com</div>
              </div>
              <div className='h-[70] ml-4 mt-3'>
                <div>마이페이지</div>
                <div><DarkModeIcon /> <LightModeIcon /> 다크모드 / 라이트모드</div>
              </div>
              <div className='text-[#666666] bg-[#D4D4D4] rounded-b-2xl h-[40] flex justify-center items-center'>
                <LogoutIcon />Log-Out
              </div>
            </div>
            : <></>}
        </div>
        <Link
          href="/mypage"
          className="flex items-center hover:text-[#0095E8] gap-3"
        >
          <div>닉네임</div>
        </Link>
      </div>
    </header>
  );
};

export default Headers;
