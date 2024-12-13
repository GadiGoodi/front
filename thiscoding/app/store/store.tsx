import { create } from 'zustand';

// User 타입 정의
interface User {
  // password: User | null;
  password: string;
  name: string;
  email: string;
}

// 상태의 타입 정의
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => void;
  deleteAccount: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null, // 초기 상태 설정
  login: (user: User) =>
    set((state) => {
      // 상태 업데이트 시, 기존 상태(state)를 기반으로 새로운 상태를 반환
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      return { isLoggedIn: true, user };
    }),
  logout: () =>
    set(() => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      return { isLoggedIn: false, user: null };
    }),
  initialize: () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;
    set({ isLoggedIn, user });
  },
  deleteAccount: () => {
    set(() => {
      // 로컬 스토리지에서 사용자 정보 및 로그인 상태 삭제...
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      // 탈퇴 후 상태 초기화
      return { isLoggedIn: false, user: null };
    });
  },
}));
