'use client';

import '@/app/globals.css';
import SideTap from '@/app/(components)/SideTap';
import Headers from '@/app/(components)/common/Headers';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Image from 'next/image';
import React, { useState } from 'react';
import defaultProfileImage from '@/public/asset/defaultImage.png';

const UserInfo: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  return (
    <div className="w-[960px] h-[650px] bg-white rounded-xl shadow-lg m-10">
      <div className="mx-[40px]">
        <div className="font-bold mt-[20px]">사용자 정보</div>

        <div className="flex justify-between items-center">
          <div>
            <div>이메일</div>
            <div className="flex justify-between w-[480px] h-[40px] bg-[#D9D9D9] text-[#8A8A8A] p-2 rounded-lg ">
              <span>ddd@naver.com</span>
              <span className="flex items-center">
                <Image
                  src="/asset/naverIcon.png"
                  alt="Naver Icon"
                  width={30}
                  height={30}
                />
              </span>
            </div>

            <div className="mt-4">닉네임</div>
            <div className="flex justify-between w-[480px] h-[40px] p-2 border items-center rounded-lg">
              <input
                type="text"
                placeholder="닉네임있는닉네임 "
                className="placeholder-black"
              ></input>
              <button className="bg-[#0095E8] text-white w-20 h-8 rounded-lg text-[12px]">
                중복 체크
              </button>
            </div>
          </div>

          <div className="text-center">
            <label
              htmlFor="image-upload"
              className="block w-[170px] h-[170px] rounded-full cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-blue-500"
              style={{
                backgroundImage: `url(${image || defaultProfileImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!image && (
                <span className="flex items-center justify-center h-full text-gray-500">
                  {/* 프로필 업로드 */}
                </span>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="mt-4">
              <span className="bg-[#0095E8] text-white inline-block m-2 px-3 rounded-lg">
                Top10
              </span>
              <span>닉네임있는닉네임</span>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="mx-[40px]">
        <div className="font-bold my-[20px]">비밀번호 변경</div>
        <div>현재 비밀번호</div>
        <div className="relative flex items-center w-[875px] h-[40px]">
          {showCurrentPassword ? (
            <VisibilityOffOutlinedIcon
              className="text-gray-400 cursor-pointer absolute right-2"
              style={{ fontSize: '24px' }}
              onClick={toggleCurrentPasswordVisibility}
            />
          ) : (
            <VisibilityOutlinedIcon
              className="text-gray-400 cursor-pointer absolute right-2"
              style={{ fontSize: '24px' }}
              onClick={toggleCurrentPasswordVisibility}
            />
          )}
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            className="w-full h-[40px] pl-2 pr-8 border border-gray-300"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <div>
            <div>새로운 비밀번호</div>
            <div className="relative flex items-center w-[430px]">
              {showPassword ? (
                <VisibilityOffOutlinedIcon
                  className="text-gray-400 cursor-pointer absolute right-2"
                  style={{ fontSize: '24px' }}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <VisibilityOutlinedIcon
                  className="text-gray-400 cursor-pointer absolute right-2"
                  style={{ fontSize: '24px' }}
                  onClick={togglePasswordVisibility}
                />
              )}
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full h-[40px] pl-2 pr-8 border border-gray-300"
              />
            </div>
          </div>

          <div>
            <div>비밀번호 확인</div>
            <div className="relative flex items-center w-[430px]">
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon
                  className="text-gray-400 cursor-pointer absolute right-2"
                  style={{ fontSize: '24px' }}
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <VisibilityOutlinedIcon
                  className="text-gray-400 cursor-pointer absolute right-2"
                  style={{ fontSize: '24px' }}
                />
              )}
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full h-[40px] pl-2 pr-8 border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between w-full">
          <button className="bg-[#0095E8] text-white w-20 h-8 rounded-lg text-[12px]">
            저장하기
          </button>

          <button className="border border-[#D0D0D0] text-[#D0D0D0] w-20 h-8 rounded-lg text-[12px]">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <UserInfo />
      </div>
    </div>
  );
}
