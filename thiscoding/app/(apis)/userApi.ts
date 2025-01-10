import axios, { AxiosResponse } from "axios";
import { axiosNonAuth, axiosWithAuth } from "../(models)/axiosWithAuth";
import { loginType, signupType } from "@/app/type";

// 로그인
export const postLoginInfo = async (loginType: loginType) => {
  const result = await axiosNonAuth.post('/api/auth/login', loginType)
  // .then(res => {
  //   console.log(res)
  // })
  console.log(axiosNonAuth.defaults.headers.common.Authorization);

  return result;
}

// 로그아웃
export const postLogout = async () => {
  await axiosWithAuth.post(`/api/auth/logout`);
}

// 회원가입
export const postSignupInfo = async (signupInfo: signupType) => {
    const result = await axiosNonAuth.post('/api/auth/sign-up', signupInfo)
    .then()
    .catch(
      err => {
        console.error(err)
        // alert(err.response.data.message);
      }
    )
};

// 이메일 중복 체크
export const checkEmailAvailability = async (email: string) => {
  // try {
    const response = await axios.get(`http://localhost:8080/api/auth/email`, {
      params: { email : email}
    });

    console.log(response.data)

    const isDuplicate = response.data; // 서버에서 반환한 값 (true/false)

    if (isDuplicate) {
      console.log("중복된 이메일입니다.");
    } else {
      console.log("가입 가능한 이메일입니다.");
    }

    return isDuplicate; // 결과를 반환 (필요하면)
    };
    
// 비밀번호 변경 및 재발급된 비밀번호(임시) 발급
export const resetPassword = async () => {
  const response = await axios.post('/reset-password', {})
  .then(res => {
    return res.data; // 성공했을때
  }).catch(err => {
    console.log(err);
  })
  return response;
}
