import 'app/global.css';
import React, { useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserStore from '@/shared/store/store';
import Logo from '@/shared/layouts/header/Logo';
import NavMenu from '@/shared/layouts/header/NavMenu';
import UserMenu from '@/shared/layouts/header/UserMenu';

interface User {
  email: string;
  nickname: string;
  imageUrl: string;
}

const Headers = () => {
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, userInfo } = UserStore();

  // hydration 에러 수정
  useEffect(() => {
    if (isLoggedIn()) {
      setUser(userInfo);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return (
    <header className="bg-white h-[105] flex items-center justify-between px-6">
      <nav className="flex gap-10 justify-center items-center">
        <Logo />
        <NavMenu />
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            className="bg-[#EBEBEB] border-2 border-[#D0D0D0] p-2 pr-10 rounded-[14px]"
          />
          <button>
            <SearchOutlinedIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              style={{ color: '#0095E8', fontSize: '30px' }}
            />
          </button>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Headers;
