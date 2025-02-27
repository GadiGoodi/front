'use client';

import { postLoginInfo, postLogout } from '@/features/auth/apis/userApi';
import UserStore from '@/shared/store/store';
import type { Login } from '../types/index';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useModalStore from '@/shared/store/store';

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const {
    userInfo,
    token,
    setToken,
    setUserInfo,
    deleteUserInfo,
    deleteToken,
  } = UserStore();
  const { openModal, closeModal } = useModalStore();

  const login = useMutation({
    mutationFn: (loginInfo: Login) => postLoginInfo(loginInfo),
    onSuccess: (res) => {
      console.log('서버 응답:', res); // 응답을 로그로 찍어 확인
      setUserInfo({
        email: res.data.email,
        nickname: res.data.nickname,
        imageUrl: res.data.imageUrl,
        password: res.data.password,
      });
      setToken({
        atk: res.headers['authorization'],
      });
      setSuccess(true);
      // setCurrentModal(null);
      closeModal();
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 다시 시도해주세요.');
    },
  });

  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = () => {
    // setCurrentModal(null);
    closeModal();
  };

  // 비밀번호 보였다 안보였다
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 엔터 클릭으로 로그인
  // const handleKeyDow = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit(e as any);
  //   }
  // };

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

  const emailHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const info = {
      email: email,
      password: password,
    };

    try {
      const response = await login.mutateAsync(info);

      console.log('로그인 응답 데이터:', response);

      if (response?.status !== 200 || !response?.data) {
        throw new Error('서버 응답 오류');
      }

      UserStore.getState().setUserInfo({
        email: response.data.email,
        nickname: response.data.nickname,
        imageUrl: response.data.imageUrl,
        password: '',
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 다시 시도해주세요.');
    }
  };

  const logout = () => {
    postLogout();
    deleteUserInfo();
    deleteToken();
    alert('로그아웃 되었습니다.');
  };

  // if (pathname === '/home') {
  //   router.refresh();
  // } else {
  //   router.push('/');
  // }
  // const router = useRouter(); // next/navigation 사용
  // const [success, setSuccess] = useState(false); // success 상태 관리

  return {
    email,
    password,
    emailHanler,
    passwordHanler,
    loginHandler,
    logout,
    userInfo,
    success,
    handleBackgroundClick,
    emailError,
    showPassword,
    togglePasswordVisibility,
    passwordError,
  };
};
export default useLogin;

// function UserStore(): { userInfo: any; token: any; setToken: any; setUserInfo: any; deleteUserInfo: any; deleteToken: any; } {
//   throw new Error("Function not implemented.");
// }
