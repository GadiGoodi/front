import axios, { AxiosInstance } from 'axios';
import Store from '@/shared/store/store';
import { BASE_URL } from '../constants/baseUrl';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const {
        status,
        data: { message },
      } = error.response;
      console.error('에러 상태:', status, '에러 메시지:', message);
    }
    const state = Store.getState();
    if (error.response?.status === 401) {
      alert('로그인이 필요합니다.');
      state.openModal('login'); // 로그인 모달 열기
    } else if (error.response?.status === 403) {
      alert('권한이 없습니다.');
      state.openModal('signup'); // 회원가입 모달 열기
    }
    return Promise.reject(error);
  },
);

export default apiClient;
