import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface userInfoType {
  email: string;
  nickname: string;
  imageUrl: string;
  keepLoggedIn: boolean;
  role: string;
}

interface tokenType {
  atk: string;
}

interface userState {
  userInfo: userInfoType;
  token: tokenType;
  currentModal: 'login' | 'signup' | 'find-password' | null;
  isModalOpen: boolean;
  keepLoggedIn: boolean;
}

interface userActions {
  setUserInfo: (userInfo: userInfoType) => void;
  setToken: (token: tokenType) => void;
  deleteToken: () => void;
  deleteUserInfo: () => void;
  setEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  updateNickname: (nickname: string) => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
  setKeepLoggedIn: (keep: boolean) => void;
  checkStoredAuth: () => void;
  openModal: (modalType: 'login' | 'signup' | 'find-password') => void;
  closeModal: () => void;
}

type UserStoreType = userState & userActions;

const defaultToken: tokenType = { atk: '' };
const defaultUserInfo: userInfoType = {
  email: '',
  imageUrl: '',
  nickname: '',
  keepLoggedIn: false,
  role: '',
};

const UserStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      userInfo: defaultUserInfo,
      token: defaultToken,
      currentModal: null,
      isModalOpen: false,
      keepLoggedIn: false,

      setUserInfo: (userInfo: userInfoType) => {
        set({ userInfo });
      },
      setToken: (token: tokenType) => {
        console.log('Setting token:', token);
        set({ token });
      },
      deleteToken: () => {
        set({ token: defaultToken });
      },
      deleteUserInfo: () => {
        set({ userInfo: defaultUserInfo });
      },
      setEmail: (email: string) => {
        set((state) => ({
          userInfo: { ...state.userInfo, email },
        }));
      },
      setNickname: (nickname: string) => {
        set((state) => ({
          userInfo: { ...state.userInfo, nickname },
        }));
      },
      updateNickname: (nickname: string) => {
        set((state) => ({
          userInfo: { ...state.userInfo, nickname },
        }));
      },

      isLoggedIn: () => {
        return !!get().token.atk;
      },

      isAdmin: () => {
        return get().isLoggedIn() && get().userInfo.role === 'ADMIN';
      },

      setKeepLoggedIn: (keep: boolean) => {
        set({ keepLoggedIn: keep });
      },

      checkStoredAuth: () => {
        const localUser = localStorage.getItem('user');
        if (localUser) {
          try {
            const userData = JSON.parse(localUser);
            set({
              userInfo: {
                email: userData.email || '',
                nickname: userData.nickname || '',
                imageUrl: userData.imageUrl || '',
                keepLoggedIn: true,
                role: userData.role || '',
              },
              token: { atk: userData.token || '' },
              keepLoggedIn: true,
            });
            return;
          } catch (e) {
            console.error('로컬 스토리지 인증 정보 파싱 실패', e);
          }
        }

        // 로컬 스토리지에 없으면 세션 스토리지 확인
        const sessionUser = sessionStorage.getItem('user');
        if (sessionUser) {
          try {
            const userData = JSON.parse(sessionUser);
            set({
              userInfo: {
                email: userData.email || '',
                nickname: userData.nickname || '',
                imageUrl: userData.imageUrl || '',
                keepLoggedIn: false,
                role: userData.role || '',
              },
              token: { atk: userData.token || '' },
              keepLoggedIn: false,
            });
          } catch (e) {
            console.error('세션 스토리지 인증 정보 파싱 실패', e);
          }
        }
      },

      // 모달 관련
      openModal: (modalType: 'login' | 'signup' | 'find-password') => {
        set({ currentModal: modalType, isModalOpen: true });
      },
      closeModal: () => {
        set({ currentModal: null, isModalOpen: false });
      },
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default UserStore;
