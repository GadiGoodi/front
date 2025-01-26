'use client';

import React, { useState, useEffect } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import { login as apiLog, apiLogin, postLoginInfo, postLogout } from '@/app/(apis)/userApi';
import UserStore from '@/app/store/store'; // Zustand store import
import { loginType } from '@/app/type';
import { usePathname } from 'next/navigation';
import { postLoginInfo, postLogout } from '@/app/(apis)/userApi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import router, { Router } from 'next/router';
// import useSignUp from '@/app/(hooks)/useSignUp';
import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 사용
import useLogin from '@/app/(hooks)/user/useLogin';
import useModalStore from '@/app/store/store';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

// const LogIn: React.FC<Props> = ({ setCurrentModal }) => {
const LogIn = () => {
  // const { handleKeyDown } = useSignUp();
  // const { login } = UserStore();
  const {
    email,
    password,
    emailHanler,
    passwordHanler,
    loginHandler,
    logout,
    // userInfo,
    success,
    handleBackgroundClick,
    emailError,
    showPassword,
    togglePasswordVisibility,
    passwordError,
  } = useLogin();
  const { userInfo } = UserStore();

  const router = useRouter();

  useEffect(() => {
    if (success) {
      // setCurrentModal(null); // 모달 닫기
      closeModal();
      // 클라이언트 사이드에서만 실행
      if (typeof window !== 'undefined') {
        router.push('/');
      }
    }
  }, [success, router]);
  const { openModal, closeModal } = useModalStore();

  return (
    // <form onSubmit={handleSubmit}>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-overlay"
      onClick={handleBackgroundClick} // 배경 클릭 시 호출
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg relative"
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5">
          <div className="text-white text-2xl font-bold">로그인</div>
          <input
            className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 focus:outline-none"
            type="email"
            placeholder="이메일"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => emailHanler(e)}
            // onKeyDown={handleKeyDown} // Enter 키 감지
          />

          {emailError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {emailError}
            </p>
          )}
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setPassword(e.target.value);
              // }}
              onChange={(e) => passwordHanler(e)}
              // onKeyDown={handleKeyDown} // Enter 키 감지
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
          {passwordError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {passwordError}
            </p>
          )}
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" />
              <div className="text-[#D0D0D0]">로그인 상태 유지</div>
            </div>
            <button
              className="text-[#D0D0D0]"
              // onClick={() => setCurrentModal('find-password')}
              onClick={() => openModal('find-password')}
            >
              비밀번호 찾기
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#0095E8] py-2 px-4 rounded-full hover:bg-gray-400"
            onClick={(e) => loginHandler(e)}
          >
            로그인
          </button>
          <div className="text-[#D0D0D0]">SNS계정으로 간편 로그인/회원가입</div>
          <div className="flex space-x-2.5">
            {/* <NaverLogin />
            <GoogleLogin />
            <KakaoLogin /> */}
          </div>
          <div className="flex space-x-1.5">
            <div className="text-[#D0D0D0]">아직 회원이 아니신가요?</div>
            <button
              // onClick={() => setCurrentModal('signup')}
              onClick={() => openModal('signup')}
              className="text-[#0095E8] font-bold"
            >
              회원가입 하기
            </button>
          </div>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default LogIn;
