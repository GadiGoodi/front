'use client';

import '@/app/globals.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from 'react';
import useSignUp from '@/app/(hooks)/useSignUp';
import useModalStore from '@/app/store/store';

interface Props {
  setCurrentModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const FindPassword = () => {
  const { handleSendPassword, verifyAuthCode, updatePassword } = useSignUp();
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');

  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const { openModal, closeModal } = useModalStore();

  const validateEmail = (value: string) => {
    const EMAIL_REGEX =
      /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!value) return '필수 입력사항입니다.';
    if (!EMAIL_REGEX.test(value)) return '이메일 형식이 올바르지 않습니다.';
    return '';
  };

  const validatePassword = (value: string) => {
    const PASSWORD_REGEX =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,17}$/;
    if (!value) return '비밀번호를 입력해주세요.';
    if (!PASSWORD_REGEX.test(value))
      return '비밀번호는 영어, 숫자, 특수문자를 모두 포함한 8~17자여야 합니다.';
    return '';
  };

  const handleSendPasswordClick = async () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setLoading(true);
    setFeedbackMessage(null);
    try {
      await handleSendPassword(email);
      setFeedbackMessage('임시 비밀번호가 이메일로 발송되었습니다.');
    } catch (error) {
      setFeedbackMessage('임시 비밀번호 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthCodeVerification = async () => {
    if (!authCode) {
      setAuthCodeError('인증 코드를 입력해주세요.');
      return;
    }
    setLoading(true);
    setFeedbackMessage(null);
    try {
      await verifyAuthCode(authCode);
      setFeedbackMessage('인증이 완료되었습니다.');
    } catch (error) {
      setFeedbackMessage('인증 코드가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    setConfirmPasswordError(
      password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : '',
    );
    setCheckboxError(isCheckboxChecked ? '' : '필수 약관에 동의해야 합니다.');

    if (
      !validateEmail(email) &&
      !validatePassword(password) &&
      password === confirmPassword &&
      isCheckboxChecked
    ) {
      setLoading(true);
      setFeedbackMessage(null);
      try {
        await updatePassword(authCode, password);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        openModal('login');
      } catch (error) {
        setFeedbackMessage('비밀번호 변경에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
    setCheckboxError('');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <form
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
      onSubmit={handleSubmit}
    >
      <div
        className="border border-white bg-[#2C2C2C] w-[520px] grid place-items-center rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[470px] py-20 grid place-items-center gap-5 overflow-y-auto max-h-[90vh]">
          <div className="text-white text-2xl font-bold">비밀번호 찾기</div>
          <div className="flex justify-start w-full text-white">이메일 </div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                emailError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#0095E8] rounded-md text-white p-1">
              비밀번호 재발급
            </button>
          </div>
          {emailError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {emailError}
            </p>
          )}
          {/* 재발급된 비밀번호 */}
          <div className="flex justify-start w-full text-white">
            재발급된 비밀번호
          </div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                authCodeError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type="text"
              placeholder="이메일로 재발급된 비밀번호를 입력해주세요"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-[#0095E8] rounded-md text-white p-1">
              비밀번호 확인
            </button>
          </div>
          {authCodeError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {authCodeError}
            </p>
          )}
          {/* 새로운 비밀번호 */}
          <div className="flex justify-start w-full text-white items-center">
            비밀번호
            <span className="text-xs ml-2 leading-normal font-light">
              ( 영문, 숫자, 특수문자 조합하여 8~16자 )
            </span>
          </div>

          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                passwordError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type={showPassword ? 'text' : 'password'}
              placeholder="새로운 비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-[#D0D0D0]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {passwordError}
            </p>
          )}
          {/* 비밀번호 확인 */}
          <div className="flex justify-start w-full text-white">
            비밀번호 확인
          </div>
          <div className="relative w-full">
            <input
              className={`h-14 rounded-xl w-full border-2 px-3 py-2 focus:outline-none ${
                confirmPasswordError
                  ? 'border-red-500 bg-[#444444] text-white'
                  : 'border-[#E6E6E6] bg-[#444444] text-white'
              }`}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="새로운 비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-[#D0D0D0]"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {confirmPasswordError}
            </p>
          )}
          {/* 약관 동의 */}
          <div className="w-full flex items-center justify-start">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            <div className="ml-2 text-white text-sm">약관에 동의합니다.</div>
          </div>

          {checkboxError && (
            <p className="text-left text-[#EA4B48] text-sm w-full">
              {checkboxError}
            </p>
          )}
          {/* 제출 버튼 */}
          <button
            className="w-full py-2 bg-[#0095E8] text-white rounded-xl"
            type="submit"
          >
            비밀번호 변경하기
          </button>
          <div className="text-white flex space-x-1.5">
            <span>이미 계정이 있으신가요?</span>
            <button
              onClick={() => openModal('login')}
              className="text-[#0095E8] font-bold"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FindPassword;
