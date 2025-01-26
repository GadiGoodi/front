'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface userInfoType {
  email: string;
  nickname: string;
  imageUrl: string;
  password: string;
}

interface tokenType {
  atk: string;
}

interface userState {
  userInfo: userInfoType;
  token: tokenType;
  currentModal: 'login' | 'signup' | 'find-password' | null;
  isModalOpen: boolean;
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

  // 모달
  openModal: (modalType: 'login' | 'signup' | 'find-password') => void;
  closeModal: () => void;
}

type UserStoreType = userState & userActions;

const defaultToken: tokenType = { atk: '' };
const defaultUserInfo: userInfoType = {
  email: '',
  imageUrl: '',
  nickname: '',
  password: '',
};

const UserStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      userInfo: defaultUserInfo,
      token: defaultToken,
      currentModal: null,
      isModalOpen: false,

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
