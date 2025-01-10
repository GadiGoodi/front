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
  atk: any;
}

interface userState {
  userInfo: userInfoType;
  token: tokenType;
}

interface userActions {
  setUserInfo: (userInfo: userInfoType) => void;
  setToken: (token: tokenType) => void;
  deleteToken: () => void;
  deleteUserInfo: () => void;
}

const defaultToken: tokenType = { atk: '' };
const defaultUserInfo: userInfoType = {
  email: '',
  imageUrl: '',
  nickname: '',
  password: '',
};

const UserStore = create(
  persist<userState & userActions>(
    (set) => ({
      userInfo: defaultUserInfo,
      token: defaultToken,
      setUserInfo: (userInfo: userInfoType) => {
        set({ userInfo });
      },
      setToken: (token: tokenType) => {
        set({ token });
      },
      deleteToken: () => {
        set({ token: defaultToken });
      },
      deleteUserInfo: () => {
        set({ userInfo: defaultUserInfo });
      },
    }),
    {
      name: 'user-info-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default UserStore;
