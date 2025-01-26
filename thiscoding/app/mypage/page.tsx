'use client';

import '@/app/globals.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SideTap from '@/app/(components)/SideTap';
import Headers from '@/app/(components)/common/Headers';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EditIcon from '@mui/icons-material/Edit';
import defaultProfileImage from '@/public/asset/defaultImage.png';
import useSignUp from '../(hooks)/useSignUp';
import UserStore from '../store/store';

const UserInfo: React.FC = () => {
  const { userInfo } = UserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [nickname, setNickname] = useState<string>(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.name || '';
    }
    return '';
  });
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
      // deleteAccount();
    }
  };

  useEffect(() => {
    if (nickname) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        parsedUser.name = nickname;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }
    }
  }, [nickname]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // 이미지 데이터를 로컬 스토리지에 저장하기 전에 user 객체를 업데이트?
          const user = localStorage.getItem('user');
          if (user) {
            const parsedUser = JSON.parse(user);
            parsedUser.profileImage = reader.result; // 프로필 이미지 경로를 user 객체에 추가하기
            localStorage.setItem('user', JSON.stringify(parsedUser)); // 수정된 user 객체를 다시 저장
            setImage(reader.result); // 상태에도 이미지 업데이트
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const [newNickname, setNewNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState(''); // 새 비번
  const [confirmPassword, setConfirmPassword] = useState(''); // 비번 확인
  const { checkNicknameAvailability } = useSignUp();

  const checkNickname = async () => {
    if (!newNickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    try {
      const isAvailable = await checkNicknameAvailability(newNickname);
      if (isAvailable) {
        setIsNicknameAvailable(true);
        setErrorMessage('');
      } else {
        setIsNicknameAvailable(false);
        setErrorMessage('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      setErrorMessage('중복 확인 오류');
      console.error(error);
    }
  };

  const updateNickname = UserStore((state) => state.updateNickname);
  const handleNicknameChange = () => {
    if (isNicknameAvailable) {
      updateNickname(newNickname); // UserStore의 updateNickname 호출
      setNewNickname(nickname);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.profileImage) {
        setImage(parsedUser.profileImage);
      }
    }
  }, []);

  // top10인가 아닌가..
  const checkTop10 = () => {
    // 답변 채택수 위에서 10명 자릑
  };

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/;
    if (!regex.test(value)) {
      return '비밀번호는 8~16자 영문, 숫자, 특수문자를 포함해야 합니다.';
    }
    return '';
  };
  const [passwordError, setPasswordError] = useState(''); // 새 비밀번호 에러

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    const error = validatePassword(value);
    setPasswordError(error); // 에러 메시지 설정
  };
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // 확인 비밀번호 에러
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value !== newPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setEmail(parsedUser.email || ''); // 이메일을 상태에 설정
      setCurrentPassword(parsedUser.password || ''); // 로컬 스토리지에서 비밀번호 가져오기
    }
  }, []);

  const handleSavePassword = () => {
    // 비밀번호 확인
    if (passwordError || confirmPasswordError) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('새로운 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 비밀번호 변경 로직
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      parsedUser.password = newPassword; // 새 비밀번호로 업데이트
      localStorage.setItem('user', JSON.stringify(parsedUser)); // 로컬스토리지에 저장
      alert('비밀번호가 변경되었습니다.');
    }
  };

  return (
    <div className="w-[960px] h-[650px] bg-white rounded-xl shadow-lg m-10">
      <div className="mx-[40px]">
        <div className="font-bold mt-[20px]">사용자 정보</div>
        <div className="flex justify-between items-center">
          <div>
            <div>이메일</div>
            <div className="flex justify-between w-[480px] h-[40px] bg-[#D9D9D9] text-[#8A8A8A] p-2 rounded-lg ">
              <span>{userInfo.email}</span>
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
              {isEditing ? (
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => {
                    if (e.target.value.length <= 8) {
                      setNewNickname(e.target.value);
                    }
                  }}
                  className="placeholder-gray w-full"
                  placeholder="최대 8자"
                />
              ) : (
                <span>{userInfo.nickname}</span>
              )}

              {isEditing ? (
                <button
                  onClick={
                    isNicknameAvailable ? handleNicknameChange : checkNickname
                  }
                  className="bg-[#0095E8] text-white w-20 h-8 rounded-lg text-[12px]"
                >
                  {isNicknameAvailable ? '저장' : '중복 확인'}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#0095E8] text-white w-20 h-8 rounded-lg text-[12px]"
                >
                  변경
                </button>
              )}
            </div>

            {isEditing && (
              <div className="mt-2">
                {isNicknameAvailable === false && (
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
                {isNicknameAvailable === true && (
                  <p style={{ color: 'green' }}>사용 가능한 닉네임입니다.</p>
                )}
              </div>
            )}
          </div>

          <div className="text-center">
            <label
              htmlFor="image-upload"
              className="relative block w-[170px] h-[170px] rounded-full cursor-pointer overflow-hidden group shadow-custom"
              style={{
                backgroundImage: `url(${image || defaultProfileImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
                <EditIcon
                  className="text-white opacity-0 group-hover:opacity-100 transition duration-300"
                  style={{ fontSize: '36px' }}
                />
              </div>
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
                {/* {checkTop10 ? <div>TOP10</div> : null} */}
              </span>
              <span>{nickname}</span>
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
            value={currentPassword} // 로컬 스토리지에서 가져온 실제 비밀번호를 보여줍니다
            readOnly // readOnly를 추가하여 수정 불가하도록 합니다.
            className="w-full h-[40px] pl-2 pr-8 border border-gray-300"
          />
        </div>

        {/* 새로운 비밀번호와 새로운 비밀번호 확인을 가로로 나란히 배치 */}
        <div className="mt-4 flex gap-4">
          {/* 새 비밀번호 입력 */}
          <div className="w-[430px]">
            <div>새로운 비밀번호</div>
            <div className="relative flex items-center w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="8~16자 영문, 숫자, 특수문자 혼합"
                className={`w-full h-[40px] pl-2 pr-8 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
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
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="w-[430px]">
            <div>새로운 비밀번호 확인</div>
            <div className="relative flex items-center w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                placeholder="비밀번호를 다시 입력해주세요"
                className={`w-full h-[40px] pl-2 pr-8 border ${
                  confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                }`}
              />
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
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-between w-full">
          <button
            onClick={handleSavePassword}
            className="bg-[#0095E8] text-white w-20 h-8 rounded-lg text-[12px]"
          >
            저장하기
          </button>
          <button
            onClick={handleDeleteAccount}
            className="border border-[#D0D0D0] text-[#D0D0D0] w-20 h-8 rounded-lg text-[12px]"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
    // </div>
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
