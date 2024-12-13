'use client';

import '@/app/globals.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSignUp from '@/app/(hooks)/useSignUp';
import EmailVerification from '@/app/(components)/common/EmailVerification';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const SignUp: React.FC<Props> = ({ setCurrentModal }) => {
  const {
    isCodeSent,
    handleEmailChange,
    handleSendAuthCode,
    handleVerifyAuthCode,
    // handleEmailChange,
    // checkEmailDuplicate,
    setEmail,
    emailError,
    email,
    setAuthCode,
    nicknameError,
    setNickname,
    passwordError,
    setPassword,
    showPassword,
    confirmPasswordError,
    setConfirmPassword,
    showConfirmPassword,
    isCheckboxChecked,
    checkboxError,
    checkEmailAvailability,
    checkNicknameAvailability,
    register,
    validateEmail,
    validateAuthCode,
    validateNickname,
    validatePassword,
    handleSubmit,
    handleCheckboxChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    emailHandler,
    // handleBackgroundClick,
    // handleIssueCode,
    // handleVerifyCode,
    // renderTimer
  } = useSignUp();

  // const SignUpData = {
  //   email: email,
  //   // nickname: nickname,
  //   password,
  //   confirmPassword,
  //   authCode,
  //   isCheckboxChecked,
  // };

  // const {login, register} = userApi();
  // const renderTimer = () => {
  //   if (status === 'issued') {
  //     const minutes = Math.floor(timer / 60);
  //     const seconds = timer % 60;
  //     return (
  //       <p className="text-sm text-white">
  //         남은 시간: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  //       </p>
  //     );
  //   }
  //   if (status === 'verified')
  //     return <p className="text-sm text-green-500">인증 완료</p>;
  //   if (status === 'wrong')
  //     return <p className="text-sm text-red-500">인증 올바르지 않음</p>;
  //   if (status === 'expired')
  //     return <p className="text-sm text-red-500">시간 초과</p>;
  //   return null;
  // };

  const handleBackgroundClick = () => {
    setCurrentModal(null);
  };

  return (
    <form
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
      onSubmit={handleSubmit}
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5 overflow-y-auto max-h-[90vh]">
          <div className="text-white text-2xl font-bold">회원가입</div>
          {/* 이메일 */}
          <div className="flex justify-start w-full text-white">이메일 </div>
          {/* 이메일 중복 체크 */}
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                emailError ? 'border-red-500' : 'border-[#E6E6E6]'
              } bg-[#444444] text-white`}
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={(e) => emailHandler(e)}
            />
            <button
              type="button"
              onClick={checkEmailAvailability}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
            >
              중복체크
            </button>
          </div>
          {emailError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {emailError}
            </p>
          )}
          {/* 인증코드 */}
          {/* <EmailVerification /> */}
          <div className="w-full">
            <div className="flex justify-start w-full text-white mb-2">
              인증 코드
            </div>
            <div className="relative w-full">
              <input
                className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                  status === 'wrong' || status === 'expired'
                    ? 'border-red-500 bg-[#444444] text-white'
                    : 'border-[#E6E6E6] bg-[#444444] text-white'
                }`}
                type="text"
                placeholder="인증 코드를 입력해주세요"
                // value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                disabled={status === 'verified'}
              />
              <button
                onClick={handleSendAuthCode}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
              >
                발급
              </button>
            </div>
            {isCodeSent && (
              <div>
                <label>인증코드:</label>
                <input
                  type="text"
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="인증코드 입력"
                />
                <button onClick={handleVerifyAuthCode}>확인</button>
              </div>
            )}
            {/* {message && <p>{message}</p>} */}
            {/* 타이머 및 상태 메시지 */}
            {/* {renderTimer()} */}
          </div>
          {/*
          <div className="flex justify-start w-full text-white">인증 코드</div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                authCodeError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type="text"
              placeholder="인증 코드를 입력해주세요"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button
              onClick={checkEmailAvailability}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
            >
              발급
            </button>
          </div>
          {authCodeError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {authCodeError}
            </p>
          )} */}
          {/* 닉네임 */}
          <div className="flex justify-start w-full text-white">닉네임</div>
          {/* 닉네임 중복 체크 */}
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                nicknameError ? 'border-red-500' : 'border-[#E6E6E6]'
              } bg-[#444444] text-white`}
              type="text"
              placeholder="초성, 특수문자 제외 1~8자"
              onChange={(e) => setNickname(e.target.value)}
            />
            <button
              type="button"
              onClick={() => checkNicknameAvailability}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
            >
              중복체크
            </button>
          </div>
          {nicknameError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {nicknameError}
            </p>
          )}

          {/* 비밀번호 */}
          <div className="flex justify-start w-full text-white  items-center gap-1">
            비밀번호
            <span className="text-xs items-center">
              (영문, 숫자, 특수문자 조합하여 8~16자)
            </span>
          </div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                passwordError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <VisibilityOffOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              ) : (
                <VisibilityOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {passwordError}
            </p>
          )}
          {/* 비밀번호 확인 */}
          <div className="flex justify-start w-full text-white">
            비밀번호 확인
          </div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                confirmPasswordError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 확인해주세요"
              // value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              ) : (
                <VisibilityOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              )}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {confirmPasswordError}
            </p>
          )}
          {/* 약관 동의 */}
          <div className="flex justify-start w-full text-white">
            <input
              type="checkbox"
              className="mr-2"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            약관에 동의합니다.
          </div>
          {checkboxError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {checkboxError}
            </p>
          )}
          <div className="mt-3 w-full">
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-[#0095E8] hover:bg-[#007BB5]"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
function userHistory() {
  throw new Error('Function not implemented.');
}
function userApi(): { login: any; register: any } {
  throw new Error('Function not implemented.');
}
