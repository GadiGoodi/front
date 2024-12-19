import React, { useState, useEffect } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import {
//   NaverLogin,
//   GoogleLogin,
//   KakaoLogin,
// } from '@/app/(components)/common/Social';
import { login as apiLog, apiLogin } from '@/app/(apis)/userApi';
import { useAuthStore } from '@/app/store/store'; // Zustand store import
// import useSignUp from '@/app/(hooks)/useSignUp';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const LogIn: React.FC<Props> = ({ setCurrentModal }) => {
  // const { handleKeyDown } = useSignUp();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = () => {
    setCurrentModal(null);
  };

  // 비밀번호 보였다 안보였다
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 이메일 유효성 검사
  const validateEmailExists = (value: string) => {
    if (!value) return '이메일을 입력해주세요.';
    if (value !== 'test@example.com') return '존재하지 않는 이메일입니다.';
    return '';
  };

  // 비번 유효성 검사
  const validatePassword = (value: string) => {
    if (!value) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(validateEmailExists(email));
    setPasswordError(validatePassword(password));

    // 로그인 로직 처리
    if (!email || !password || emailError || passwordError) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // API 호출하여 로그인 시도
      const data = await apiLogin(email, password);
      console.log('Login success:', data);

      // 로그인 성공 시, Zustand 상태에 로그인 정보 저장
      login({
        name: data.nickname,
        email: data.email,
        password: data.password,
        profileImage: '',
      });

      // 로컬 스토리지에 로그인 정보 저장 (비밀번호도 저장해도되나??)
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: data.nickname,
          email: data.email,
          password: data.password,
        }),
      );

      // 로그인 후 처리
      setCurrentModal(null); // 로그인 성공 시 모달 닫기
    } catch (err) {
      setError('로그인 실패');
      console?.error('Login failed:', err);
    }
    window.location.reload();
  };

  // 로컬 스토리지에서 로그인 정보 가져오기......
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      login({
        name: parsedData.name,
        email: parsedData.email,
        password: parsedData.password,
        profileImage: '',
      });
    }
  }, [login]);

  // 엔터 클릭으로 로그인
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
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
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 감지
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
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown} // Enter 키 감지
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
              onClick={() => setCurrentModal('find-password')}
            >
              비밀번호 찾기
            </button>
          </div>
          <button
            className="w-full text-white bg-[#0095E8] py-2 px-4 rounded-full hover:bg-gray-400"
            onClick={handleSubmit}
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
              onClick={() => setCurrentModal('signup')}
              className="text-[#0095E8] font-bold"
            >
              회원가입 하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
