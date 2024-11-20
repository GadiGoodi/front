'use client';

import '@/app/globals.css';
import React, { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Image from 'next/image';
import Naver from '@/public/asset/naverIcon.png';
import Google from '@/public/asset/googleIcon.png';
import Kakao from '@/public/asset/kakaoIcon.png';

const Login = ({
  onClose,
  toggleModal,
}: {
  onClose: () => void;
  toggleModal: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5">
          <div className="text-white text-2xl font-bold">로그인</div>
          <input
            className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 focus:outline-none "
            type="text"
            placeholder="이메일"
          />
          <div className="flex justify-start w-full text-[#EA4B48]">
            존재하지 않는 이메일입니다.
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
            />
            {showPassword ? (
              <VisibilityOffOutlinedIcon
                className="absolute right-3 text-gray-400 cursor-pointer"
                style={{ fontSize: '24px' }}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOutlinedIcon
                className="absolute right-3 text-gray-400 cursor-pointer"
                style={{ fontSize: '24px' }}
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" />
              <div className="text-[#D0D0D0]">로그인 상태 유지</div>
            </div>
            <button className="text-[#D0D0D0]">비밀번호 찾기</button>
          </div>
          <button className="w-full text-white bg-[#0095E8] py-2 px-4 rounded-full hover:bg-gray-400 ">
            로그인
          </button>
          <div className="text-[#D0D0D0]">SNS계정으로 간편 로그인/회원가입</div>
          <div className="flex space-x-2.5">
            <Image
              src={Kakao}
              alt="Kakao"
              layout="fixed"
              width={40}
              height={40}
            />
            <Image
              src={Naver}
              alt="Naver"
              layout="fixed"
              width={40}
              height={40}
            />
            <Image
              src={Google}
              alt="Google"
              layout="fixed"
              width={40}
              height={40}
            />
          </div>
          <div className="flex space-x-1.5">
            <div className="text-[#D0D0D0]">아직 회원이 아니신가요?</div>
            <button className="text-blue-600 font-bold" onClick={toggleModal}>
              회원가입 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
