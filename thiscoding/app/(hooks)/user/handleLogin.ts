import UserStore from '@/app/store/store'; // Zustand store
import { postLoginInfo } from '@/app/(apis)/userApi'; // API 요청 함수
import { loginType } from "@/app/type";

const handleLogin = async (loginInfo: loginType) => {
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