import axios, { AxiosResponse } from 'axios';

import { apiClient, authApiClient } from '@/apis/client';

import { Login, SignUp } from '../types';
import Store from '@/shared/store/store';

// 로그인
// export const postLoginInfo = async (loginType: loginType) => {
//   const result = await axiosNonAuth.post('/api/auth/login', loginType)
//   // .then(res => {
//   //   console.log(res)
//   // })
//   console.log(axiosNonAuth.defaults.headers.common.Authorization);

//   return result;
// }
export const postLoginInfo = (login: Login) => {
  return apiClient
    .post('/auth/login', login)
    .then((result) => {
      const token = result.data.token;
      authApiClient.defaults.headers.common['Authorization'] =
        `Bearer ${token}`; // axios에 Authorization 헤더 설정

      return result;
    })
    .catch((err) => {
      console.error('로그인 오류:', err);
      throw new Error('로그인 실패');
    });
};

const { openModal } = Store.getState();

export const postSignupInfo = (signUp: SignUp) => {
  return apiClient
    .post('/auth/sign-up', signUp)
    .then((result) => {
      console.log('회원가입 성공:', result);
      alert('회원가입 성공! 로그인 해주세요');
      openModal('login');
      return result;
    })
    .catch((err) => {
      console.error('회원가입 오류:', err);
      alert(err.response?.data?.message || '회원가입 실패');
      throw err;
    });
};

// 로그아웃
export const postLogout = async () => {
  await authApiClient.post(`/api/auth/logout`);
};

// top10 유무확인
export const getTop10User = () => {
  return apiClient
    .get('/users/me/top10')
    .then((result) => {})
    .catch((err) => {});
};

// 이메일 중복 체크
export const checkEmailAvailability = async (email: string) => {
  // try {
  const response = await axios.get(`http://localhost:8080/api/auth/email`, {
    params: { email: email },
  });

  console.log(response.data);

  const isDuplicate = response.data;

  if (isDuplicate) {
    console.log('중복된 이메일입니다.');
  } else {
    console.log('가입 가능한 이메일입니다.');
  }

  return isDuplicate;
};

// 비밀번호 변경 및 재발급된 비밀번호(임시) 발급
export const resetPassword = async () => {
  const response = await axios
    .post('/reset-password', {})
    .then((res) => {
      return res.data; // 성공했을때
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
