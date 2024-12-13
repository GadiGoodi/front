import axios from "axios";

// Node.js (Express) 예시
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// 이메일 중복 체크 API
// app.post('/check-email', ({req}: any, {res}: any) => {
//   const { email } = req.body;

//   // 이메일이 이미 존재하는지 확인 (여기서는 가상의 데이터베이스로 예시)
//   const existingEmails = ['test@example.com', 'user@example.com'];

//   if (existingEmails.includes(email)) {
//     res.status(400).json({ message: 'Email already exists' });
//   } else {
//     res.status(200).json({ message: 'Email is available' });
//   }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));


// 로그인
const API_URL = 'http://localhost:8080/api/auth/';

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}login`, { email, password })
    .then(response => {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      return response.data;
    })
    .catch(error => {
      console.error('Login Error:', error);
      throw error;
    });
};


// 회원가입   묶어서 객체 형태로 보내기... SignUpData
export const register = async (email: string, nickname: string, password: string, checkPassword: string) => {
    const response = await axios.post(`${API_URL}register`, { email, nickname, password, checkPassword })
    .then(res => {
      return res.data; // 성공했을때
    }).catch(err => {
      console.log(err);
    })
    return response;
};

// 로그인 유지
// const handleLogin = async (email, password) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/login', { email, password });
//     const { token } = response.data;

//     // 토큰을 localStorage 또는 쿠키에 저장
//     localStorage.setItem('authToken', token); // 또는 쿠키에 저장
//     console.log('로그인 성공:', response.data);
//   } catch (error) {
//     console.error('로그인 실패:', error);
//   }
// };


// 더미 데이터로 테스트.....
export const apiLogin = async (email: string, password: string) => {
  // 더미 데이터 (아이디와 비밀번호)
  const dummyUser = {
    email: 'test',
    password: '123',
    nickname: '테스트',
  };

  // 로그인 시도한 이메일과 비밀번호가 더미 데이터와 일치하는지 확인
  if (email === dummyUser.email && password === dummyUser.password) {
    return { nickname: dummyUser.nickname, email: dummyUser.email, password: dummyUser.password }; // 성공 시 반환
  } else {
    throw new Error('잘못된 이메일 또는 비밀번호입니다.'); // 실패 시 에러
  }
};
