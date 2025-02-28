'use client';

import { useEffect, useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Image from 'next/image';
import UserStore from '@/shared/store/store';
import defaultProfileImage from 'public/png/defaultImage.png';
import Link from 'next/link';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@/shared/ui/ModalManager';
import useModalStore from '@/shared/store/store';
import useLogin from '@/features/auth/log-in/useLogin';

interface User {
  email: string;
  nickname: string;
  imageUrl: string;
  // password: string;
}

const UserMenu = () => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [alarmsDropDown, setAlarmsDropDown] = useState(false);
  const { isLoggedIn, userInfo } = UserStore();
  const [user, setUser] = useState<User | null>(null);
  const { openModal } = useModalStore();
  const { logout } = useLogin();

  useEffect(() => {
    console.log('userInfo:', userInfo.email);
    console.log('isLoggedIn:', isLoggedIn());

    if (isLoggedIn()) {
      setUser(userInfo);
    } else {
      setUser(null);
    }
  }, [isLoggedIn(), userInfo]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.closest('.alarm-dropdown') &&
        !target.closest('.alarm-button')
      ) {
        setAlarmsDropDown(false);
      }

      if (
        !target.closest('.profile-dropdown') &&
        !target.closest('.profile-button')
      ) {
        setProfileDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
    alert('로그아웃 되었습니다.');
  };

  const alarmsDropDownHandler = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.alarm-button')) {
      setProfileDropDown(false);
      setAlarmsDropDown(!alarmsDropDown);
    }
  };

  const dropDownHandler = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.profile-button')) {
      setAlarmsDropDown(false);
      setProfileDropDown(!profileDropDown);
    }
  };

  return (
    <>
      <button
        className="hover:text-[#0095E8] relative alarm-button"
        onClick={alarmsDropDownHandler}
      >
        <NotificationsNoneOutlinedIcon style={{ fontSize: '30px' }} />
        {/* {isAlarm && ( */}
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
        {/* )} */}
      </button>

      {alarmsDropDown && (
        <div className="alarm-dropdown w-[300px] bg-white rounded-2xl absolute right-7 top-20 flex-col justify-between items-center z-50 shadow-custom2 max-h-[400px] overflow-y-auto">
          {/* 친구 요청 */}
          <div className="group cursor-pointer p-5 hover:bg-[#EFEFEF]">
            <span className="group-hover:underline">
              <span className="font-bold">왕만두</span>님이 친구를 요청했습니다.
            </span>
            <div className="flex py-1 gap-3">
              <button className="p-2 px-3 bg-[#0095E8] text-white rounded hover:bg-[#007bb5]">
                수락
              </button>
              <button className="p-2 px-3 bg-[#FF7262] text-white rounded hover:bg-[#E85D49]">
                거절
              </button>
            </div>
          </div>

          {/* 코딩방에 친구 초대시 */}
          <div className="group cursor-pointer p-5 hover:bg-[#EFEFEF]">
            <span className="group-hover:underline">
              <span className="font-bold">왕만두</span>님이{' '}
              <span className="font-bold">자바</span>코딩방으로 초대했습니다.
            </span>
            <div className="flex py-1 gap-3">
              <button className="p-2 px-3 bg-[#0095E8] text-white rounded hover:bg-[#007bb5]">
                수락
              </button>
              <button className="p-2 px-3 bg-[#FF7262] text-white rounded hover:bg-[#E85D49]">
                거절
              </button>
            </div>
          </div>

          {/* 질문에 답변 */}
          <div className="group cursor-pointer p-5 hover:bg-[#EFEFEF]">
            <span className="group-hover:underline">
              "<span className="font-bold">이거 풀어줘요</span>" 질문에 답변이
              달렸습니다.
            </span>
          </div>

          {/* 게시글 나 언급 */}
          <div className="group cursor-pointer p-5 hover:bg-[#EFEFEF]">
            <span className="group-hover:underline">
              "<span className="font-bold">이거 풀어줘요</span>" 답변에 답글이
              달렸습니다.
            </span>
          </div>

          {/* 언급 */}
          <div className="group cursor-pointer p-5 hover:bg-[#EFEFEF]">
            <span className="group-hover:underline">
              <span className="font-bold">왕만두</span>님이 "
              <span className="font-bold">이거 풀어줘요</span>" 게시글에
              회원님을 언급하였습니다.
            </span>
          </div>
        </div>
      )}

      {isLoggedIn() && user ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={dropDownHandler} className="relative cursor-pointer">
            <div className="profile-button flex items-center gap-2">
              <Image
                className="bg-gray-700 size-10 rounded-full"
                src={user?.imageUrl || defaultProfileImage}
                alt="프로필 이미지"
                width={40}
                height={40}
              />
              <span>{userInfo?.nickname}</span>
            </div>
            {profileDropDown && (
              <div className="profile-dropdown w-[250px] h-[180px] bg-[#EFEFEF] rounded-2xl absolute right-2 top-14 flex-col justify-between items-center z-50 shadow-custom2">
                <div className="border-b h-[70px] ml-4 mt-3">
                  <div>닉네임</div>
                  <div className="text-[#666666]">{userInfo?.nickname}</div>
                </div>
                <div className="h-[70px] ml-4 mt-3">
                  <Link href="/mypage" className="hover:text-[#0095E8]">
                    <div>마이페이지</div>
                  </Link>
                  <div>
                    <DarkModeIcon /> <LightModeIcon /> 다크모드 / 라이트모드
                  </div>
                </div>
                <div
                  onClick={handleLogout}
                  className="text-[#666666] bg-[#D4D4D4] rounded-b-2xl h-[40px] flex justify-center items-center cursor-pointer"
                >
                  <LogoutIcon />
                  로그아웃
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => openModal('login')}>로그인</button>
          <Modal />
        </>
      )}
    </>
  );
};
export default UserMenu;
