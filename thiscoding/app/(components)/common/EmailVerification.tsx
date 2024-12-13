import useSignUp from '@/app/(hooks)/useSignUp';
import React, { useState, useEffect } from 'react';

const EmailVerification = () => {
  const { handleSendAuthCode } = useSignUp();
  const [state, setState] = useState('initial'); // "initial", "waiting", "success", "error", "timeout"
  const [timer, setTimer] = useState(10); // 타이머 초기값 (10초)
  const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지 상태
  const [inputValue, setInputValue] = useState<string>(''); // 입력 값 상태
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [emailError, setEmailError] = useState<string>(''); // 이메일 오류 메시지

  useEffect(() => {
    let intervalId: number | null = null;

    if (state === 'waiting' && timer > 0) {
      intervalId = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && state === 'waiting') {
      setState('timeout');
      setErrorMessage(''); // 시간 초과 시 오류 메시지 제거
    }

    // Clean up the interval when the component unmounts or timer stops
    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [state, timer]);

  const handleIssue = () => {
    setState('waiting');
    setTimer(10); // 타이머 초기화 (10초)
    setErrorMessage(''); // 오류 메시지 초기화
    setInputValue(''); // 입력 값 초기화
  };

  const handleVerify = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('인증코드를 작성하세요'); // 입력값이 비어 있을 경우
      return;
    }

    if (inputValue.trim() === '222') {
      setState('success'); // 인증 성공
      setErrorMessage(''); // 오류 메시지 제거
    } else {
      setErrorMessage('인증이 올바르지 않습니다.'); // 인증 실패
    }
  };

  const handleReissue = () => {
    setState('waiting');
    setTimer(10); // 타이머 초기화
    setErrorMessage(''); // 오류 메시지 초기화
    setInputValue(''); // 입력 값 초기화
  };

  const checkEmailAvailability = () => {
    // 이메일 중복 체크 로직
    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    // 예시로 이메일 오류 처리
    if (email.includes('@')) {
      setEmailError('');
    } else {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* 이메일 */}
      {/* 인증 코드 입력 */}
      <div className="flex justify-start w-full text-white mb-2 mt-6">
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
          onClick={
            () => handleSendAuthCode()
            // state === 'initial' || state === 'timeout' // "발급" 버튼
            //   ? handleIssue
            //   : handleVerify
          }
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[70px] cursor-pointer bg-[#0095E8] rounded-md text-white p-1"
        >
          {state === 'initial' || state === 'timeout' ? '발급' : '확인'}
        </button>
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
      {/* 오류 메시지 표시 */}
      {errorMessage && state !== 'timeout' && (
        <div style={{ marginTop: '5px', color: '#EA4B48' }}>{errorMessage}</div>
      )}
    </div>
  );
};

export default EmailVerification;
