
'use client'

import { postLoginInfo, postLogout} from "@/features/auth/apis/userApi";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
// import { loginType } from "@/features/auth/apis/use";
import { loginType } from "@/shared/types/loginSignuptype";
import useModalStore  from '@/shared/store/store';
import UserStore from "@/shared/store/store";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(UserStore.getState().keepLoggedIn);
  
  const {
    userInfo,
    token,
    setToken,
    setUserInfo,
    deleteUserInfo,
    deleteToken,
    setKeepLoggedIn: setStoreKeepLoggedIn
  } = UserStore();
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    setStoreKeepLoggedIn(keepLoggedIn);
  }, [keepLoggedIn, setStoreKeepLoggedIn]);

  const login = useMutation({
    mutationFn: (loginInfo: loginType) => postLoginInfo(loginInfo),
    onSuccess: (res) => {
      console.log('서버 응답:', res);
  
      const userData = {
        email: res.data.email,
        nickname: res.data.nickname,
        imageUrl: res.data.imageUrl,
        keepLoggedIn: keepLoggedIn,
        role: res.data.role,
      };

      const tokenData = {
        atk: res.headers['authorization'],
      };
  
      setUserInfo(userData);
      setToken(tokenData);
      setSuccess(true);
  
      const storageData = {
        ...userData,
        token: tokenData.atk
      };
  
      if (keepLoggedIn) {
        localStorage.setItem("user", JSON.stringify(storageData));
        sessionStorage.removeItem("user"); // 세션 스토리지 정리
      } else {
        sessionStorage.setItem("user", JSON.stringify(storageData));
        localStorage.removeItem("user"); // 로컬 스토리지 정리
      }
  
      closeModal();
      alert("로그인 성공!");
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 실패! 다시 시도해주세요.');
    },
  });
  
  const handleBackgroundClick = () => {
    closeModal();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const emailHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHanler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
  
    const info = {
      email: email,
      password: password,
    };
  
    try {
      await login.mutateAsync(info);
    } catch (error) {
      console.error("로그인 처리 중 오류:", error);
    }
  };

    // 로그아웃 - 스토리지 정리 추가
  const logout = () => {
    postLogout();
    deleteUserInfo();
    deleteToken();
    
    // 브라우저 스토리지 모두 정리
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  return {
    postLogout,
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
    keepLoggedIn, 
    setKeepLoggedIn
  };
};

export default useLogin;