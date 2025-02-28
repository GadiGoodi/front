'use client';

import UserStore from '@/shared/store/store'; // Zustand store
import { postLoginInfo } from '@/features/auth/apis/userApi'; // API 요청 함수
import { Login } from '../types';

const handleLogin = async (loginInfo: Login) => {
  try {
    const response = await postLoginInfo(loginInfo);
    const { token, userInfo } = response.data;

    // Zustand에 상태 저장
    UserStore.getState().setToken({ atk: token });
    UserStore.getState().setUserInfo(userInfo);

    console.log('로그인 성공');
    return response;
  } catch (error) {
    console.error('로그인 실패', error);
    throw error;
  }
};

export default handleLogin;
