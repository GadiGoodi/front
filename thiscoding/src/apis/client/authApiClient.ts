import Axios, { AxiosError } from 'axios';
import Store from '@/shared/store/store';

export interface CustomAxiosError extends AxiosError {
  serverMessage?: string;
}

const authApiClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

authApiClient.interceptors.request.use((config) => {
  const token = Store.getState().token.atk;

  if (token) {
    config.headers.Authorization = `${token}`;
  } else {
    return Promise.reject(new Error('토큰이 없습니다.'));
  }

  return config;
});

authApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('네트워크 에러:', error.message);
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    error.serverMessage = data?.message;
    console.error(`에러 상태: ${status}, 에러 메시지: ${data?.message}`);

    const state = Store.getState();

    if (status === 401) {
      alert('로그인이 필요합니다.');
      state.openModal('login');
    } else if (status === 403) {
      alert('권한이 없습니다.');
      state.openModal('signup');
    }

    return Promise.reject(error);
  },
);

export default authApiClient;
