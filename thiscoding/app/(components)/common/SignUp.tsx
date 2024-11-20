'use client';

import '@/app/globals.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useState } from 'react';

const SignUp = ({
  onClose,
  toggleModal,
}: {
  onClose: () => void;
  toggleModal: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg"
        onClick={handleModalClick}
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5 overflow-y-auto max-h-[90vh]">
          <div className="text-white text-2xl font-bold">회원가입</div>

          <div className="flex justify-start w-full text-white font-bold">
            이메일
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 focus:outline-none"
              type="text"
              placeholder="이메일을 입력해주세요"
            />
            <button className="w-[70px] absolute right-3 cursor-pointer bg-[#0095E8] rounded-md text-white p-1">
              중복 체크
            </button>
          </div>
          <div className="flex justify-start w-full text-[#EA4B48] text-left">
            이메일 형식이 올바르지 않습니다.
          </div>

          <div className="flex justify-start w-full text-white font-bold">
            인증코드
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type="text"
              placeholder="인증코드를 입력하세요"
            />
            <button className="w-[70px] absolute right-3 cursor-pointer bg-[#0095E8] rounded-md text-white p-1">
              발급
            </button>
          </div>
          <div className="flex justify-start w-full text-[#EA4B48] text-left">
            인증 코드가 올바르지 않습니다.
          </div>

          <div className="flex justify-start w-full text-white font-bold">
            닉네임
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type="text"
              placeholder="초성, 특수문자 제외 1~8자"
            />
            <button className="w-[70px] absolute right-3 cursor-pointer bg-[#0095E8] rounded-md text-white p-1">
              중복체크
            </button>
          </div>
          <div className="flex justify-start w-full text-[#EA4B48] text-left">
            필수 입력사항입니다. / 형식이 올바르지 않습니다. / 이미 존재하는
            닉네임입니다.
          </div>

          <div className="flex justify-start w-full text-white font-bold">
            비밀번호
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type={showPassword ? 'text' : 'password'}
              placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
            />
            <VisibilityOutlinedIcon
              className="absolute right-3 text-gray-400 cursor-pointer"
              style={{ fontSize: '24px' }}
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="flex justify-start w-full text-[#EA4B48] text-left">
            필수 입력사항입니다. / 형식이 올바르지 않습니다.
          </div>

          <div className="flex justify-start w-full text-white font-bold">
            비밀번호 재입력
          </div>
          <div className="relative w-full flex items-center">
            <input
              className="h-14 rounded-xl w-full border-2 text-white border-[#E6E6E6] bg-[#444444] px-3 py-2 pr-10 focus:outline-none"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 재입력하세요"
            />
            <VisibilityOutlinedIcon
              className="absolute right-3 text-gray-400 cursor-pointer"
              style={{ fontSize: '24px' }}
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>
          <div className="flex justify-start w-full text-[#EA4B48] text-left">
            필수 입력사항입니다. / 비밀번호가 일치하지 않습니다.
          </div>

          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" />
              <div className="text-[#D0D0D0]">필수 약관 동의</div>
            </div>
          </div>

          <button className="w-full text-white bg-[#0095E8] py-2 px-4 rounded-full hover:bg-gray-400">
            가입하기
          </button>

          <div className="flex space-x-1.5">
            <div className="text-[#D0D0D0]">이미 계정이 있으신가요?</div>
            <button className="text-blue-600 font-bold" onClick={toggleModal}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
