'use client';

import React, { useState, useEffect } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import UserStore from '@/shared/store/store';
import { postLoginInfo, postLogout } from '@/features/auth/apis/userApi';
import { useRouter } from 'next/navigation';
import useLogin from '@/features/auth/log-in/useLogin';
import useModalStore from '@/shared/store/store';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const LogIn = () => {
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
      closeModal();
      if (typeof window !== 'undefined') {
        router.push('/');
      }
    }
  }, [success, router]);
  const { openModal, closeModal } = useModalStore();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-overlay"
      onClick={handleBackgroundClick}
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5">
          <div className="text-white text-2xl font-bold">로그인</div>
          <input
            className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 focus:outline-none"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => emailHanler(e)}
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
              onChange={(e) => passwordHanler(e)}
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
