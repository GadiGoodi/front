import '@/app/globals.css';
import React from 'react';
import Link from 'next/link';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Headers = () => {
  return (
    <header className="h-[105] flex items-center justify-between px-6">
      <nav className="flex gap-10 justify-center items-center">
        <Link href="#" className="text-2xl font-bold">
          THISCODING;
        </Link>
        <Link href="#" className="hover:text-[#0095E8]">
          코드방
        </Link>
        <Link href="#" className="hover:text-[#0095E8]">
          질문 & 답변
        </Link>
        <Link href="#" className="hover:text-[#0095E8]">
          고객센터
        </Link>
        <Link href="#" className="hover:text-[#0095E8]">
          마이페이지
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="bg-[#EBEBEB] border-2 border-[#D0D0D0] p-2 pr-10 rounded-[14px]"
          />
          <SearchOutlinedIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            style={{ color: '#0095E8', fontSize: '30px' }}
          />
        </div>
        <button className="hover:text-[#0095E8]">
          <NotificationsNoneOutlinedIcon style={{ fontSize: '30px' }} />
        </button>
        <button className="flex items-center hover:text-[#0095E8] gap-3">
          <input
            className="bg-gray-700 size-10 rounded-full"
            type="image"
            src="#"
            alt="프로필 이미지"
          />
          <div>닉네임</div>
        </button>
      </div>
    </header>
  );
};

export default Headers;
