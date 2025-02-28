'use client';

import axios, { AxiosInstance } from 'axios';
import Store from "@/shared/store/store";

export const axiosWithAuth: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosNonAuth: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosWithAuth.interceptors.request.use((config) => {
  const token = Store.getState().token.atk;

  if (token) {
    config.headers.Authorization = `${token}`;
  } else {
    return Promise.reject(new Error('토큰이 없습니다.'));
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const state = Store.getState();

    if (error.response?.status === 401) {
      alert('로그인이 필요합니다.');
      state.openModal('login'); // 로그인 모달 열기
    } else if (error.response?.status === 403) {
      alert('권한이 없습니다.');
      state.openModal('signup'); // 회원가입 모달 열기
    }

    return Promise.reject(error);
  }
);
