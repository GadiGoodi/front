'use client'

import { postLoginInfo, postLogout } from "@/app/(apis)/userApi";
import UserStore from "@/app/store/store";
import { loginType } from "@/app/type";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useLogin = (setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>) => {


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

  const login = useMutation({
    mutationFn: (loginInfo: loginType) => postLoginInfo(loginInfo),
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
      setCurrentModal(null);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 다시 시도해주세요.');
    },
  });
  
  
  // 배경 클릭 시 모달 닫기
  const handleBackgroundClick = () => {
    setCurrentModal(null);
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await handleLogin({ email, password });
  //     alert('로그인 성공');
  //   } catch {
  //     alert('로그인 실패. 다시 시도해주세요.');
  //   }
  // };

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
      // mutateAsync를 사용하여 비동기 로그인 처리
      await login.mutateAsync(info); 
      console.log('로그인 성공');
      // setCurrentModal(null);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };
  
  

  const logout = () => {
    postLogout();
    deleteUserInfo();
    deleteToken();

    // if (pathname === '/home') {
    //   router.refresh();
    // } else {
    //   router.push('/');
    // }
  };
  // const router = useRouter(); // next/navigation 사용
  // const [success, setSuccess] = useState(false); // success 상태 관리



  return {
    email, password,
    emailHanler, passwordHanler,
    loginHandler, logout,
    userInfo,
    success,
    handleBackgroundClick,
    emailError,
    showPassword,
    togglePasswordVisibility,
    passwordError,
  }
}
export default useLogin;

// function UserStore(): { userInfo: any; token: any; setToken: any; setUserInfo: any; deleteUserInfo: any; deleteToken: any; } {
//   throw new Error("Function not implemented.");
// }
