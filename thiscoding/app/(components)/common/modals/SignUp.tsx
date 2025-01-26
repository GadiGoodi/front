'use client';

import '@/app/globals.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSignUp from '@/app/(hooks)/useSignUp';
import { postSignupInfo } from '@/app/(apis)/userApi';
import useModalStore from '@/app/store/store';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const SignUp = () => {
  const {
    checkEmailAvailability,
    nickCheckMessage,
    nicknameValidationMessage,
    handleSendAuthCode,
    handleVerifyAuthCode,
    setEmail,
    emailError,
    setAuthCode,
    nicknameError,
    setNickname,
    passwordError,
    setPassword,
    showPassword,
    confirmPasswordError,
    setCheckPassword,
    showConfirmPassword,
    isCheckboxChecked,
    checkboxError,
    checkNicknameAvailability,
    handleSubmit,
    handleCheckboxChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleIssue,
    state,
    errorMessage,
    timer,
    inputValue,
    setInputValue,
    email,
    isEmailAvailable,
    emailCheckMessage,
    nickname,
  } = useSignUp();
  const { openModal, closeModal } = useModalStore();

  const handleBackgroundClick = () => {
    closeModal();
  };

  return (
    <form
      className="scrollbar-none fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
      // onSubmit={(e) => {
      //   e.preventDefault(); // form 제출 방지
      //   handleSubmit(e); // 필요한 경우 명시적으로 호출
      // }}
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => checkEmailAvailability(email)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
            >
              중복체크
            </button>
          </div>
          <p
            className={`mt-2 text-left ${
              emailCheckMessage === '사용 가능한 이메일입니다.'
                ? 'text-blue-500'
                : 'text-red-500'
            }`}
          >
            {emailCheckMessage}
          </p>

          <div className="w-full mx-auto">
            <div className="w-full">
              {/* 인증 코드 입력 */}
              <div className="flex justify-start w-full text-white mb-2 ">
                인증 코드
              </div>

              <div className="relative w-full">
                <input
                  className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                    state === 'wrong' || state === 'error'
                      ? 'border-[#EA4B48] bg-[#444444] text-white'
                      : 'border-[#E6E6E6] bg-[#444444] text-white'
                  }`}
                  type="text"
                  placeholder={state === 'initial' ? '인증코드' : ''}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={state === 'success'}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (state === 'initial' || state === 'timeout') {
                      handleSendAuthCode(email);
                      handleIssue();
                    } else {
                      handleVerifyAuthCode(email, inputValue);
                    }
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
                >
                  {state === 'initial' || state === 'timeout' ? '발급' : '확인'}
                </button>
              </div>
            </div>

            <div style={{ marginTop: '10px', color: '#555' }}>
              {state === 'waiting' && timer > 0 && (
                <span>{`남은 시간: ${Math.floor(timer / 60)}분 ${timer % 60}초`}</span>
              )}
              {state === 'success' && <span>인증 완료</span>}
              {state === 'timeout' && (
                <span style={{ color: '#EA4B48' }}>시간 초과</span>
              )}
            </div>
          </div>

          {/* 닉네임 */}
          <div className="flex justify-start w-full text-white">닉네임</div>
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
              onClick={() => checkNicknameAvailability(nickname)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
            >
              중복체크
            </button>
          </div>
          {/* 결과 메시지 */}

          <p
            className={`mt-2 text-start ${
              nickCheckMessage === '사용 가능한 닉네임입니다.'
                ? 'text-blue-500'
                : 'text-red-500'
            }`}
          >
            {nickCheckMessage}
          </p>

          {nicknameValidationMessage !== null && (
            <p
              className={`!text-left ${
                nicknameValidationMessage === '사용 가능한 닉네임입니다.'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {nicknameValidationMessage}
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
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
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
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              ) : (
                <VisibilityOutlinedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[35px] cursor-pointer text-gray-400" />
              )}
            </button>
          </div>

          {errorMessage && state !== 'timeout' && (
            <div style={{ marginTop: '5px', color: '#EA4B48' }}>
              {errorMessage}
            </div>
          )}

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
              onClick={(e) => handleSubmit(e)}
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
