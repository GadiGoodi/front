import { signupType } from '@/shared/types/loginSignuptype';
// import { metadata } from './../qna/layout';
import axios from "axios";
import router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { postSignupInfo } from '../apis/userApi';

const useSignUp = () => {

  // const [emailError, setEmailError] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');
  // const [nicknameError, setNicknameError] = useState('');
  const [nicknameError, setNicknameError] = useState<boolean>(false); // boolean 타입으로 수정

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 타입 지정 추가
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // 회원가입 정보...
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, issued, verified, wrong, expired
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState('initial'); // "initial", "waiting", "success", "error", "timeout"
  const [timer, setTimer] = useState(10); // 타이머 초기값 (10초)
  const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지 상태
  const [inputValue, setInputValue] = useState<string>(''); // 입력 값 상태
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [emailError, setEmailError] = useState<string>(''); // 이메일 오류 메시지
  // 이메일 인증 코드
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [serverAuthCode, setServerAuthCode] = useState(""); // 서버에서 반환된 인증코드
  const [message, setMessage] = useState("");
  const [nicknameValidationMessage, setNicknameValidationMessage] = useState<string | null>(null); // 닉네임 검증 메시지 상태

  const signupInfo = {
    email: email,
    nickname: nickname,
    password: password,
    checkPassword: checkPassword,
  };

  // 이메일 인증코드 발급 요청
  const handleSendAuthCode = async (email: string) => {
    console.log("handleSendAuthCode 발송 Email : " + email);
    
    if (!email) {
      setMessage("이메일을 입력해주세요.");
      return; // 이메일이 없으면 요청을 중단하고 함수 종료
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/join-code?email=${email}`);
      setIsCodeSent(true);
      setServerAuthCode(response.data.authCode); // 서버에서 인증코드 반환
      setMessage("인증코드가 이메일로 발송되었습니다.");
    } catch (error) {
      console?.error(error);
      setMessage("인증코드 발송에 실패했습니다.");
    }
  };

  // 인증코드 확인 요청 , 회원가입 인증 코드 확인
  const handleVerifyAuthCode = async (email: string, code: string) => {
    console.log("인증 코드 확인 요청");
    if (!code) {
      setErrorMessage("인증코드를 입력해주세요."); // 오류 메시지 설정
      setState("error"); // 상태 변경
      return;
    }

      await axios.post("http://localhost:8080/api/auth/join-code/check", {
        email,
        code,
      })
      .then(
        res => {
          if(res.status === 200) {
            setErrorMessage(""); // 성공 시 오류 메시지 초기화
            setState("success"); // 인증 성공 상태로 변경
          }
        }
      )
      .catch(error => {
        console.log(error);
        if(error.status === 404) {
          setErrorMessage("인증 확인 중 오류가 발생했습니다.")
        } else {
        setErrorMessage(error.response.data.message); // 인증 실패 시 메시지 설정
        setState("wrong"); // 인증 실패 상태로 변경
        }
      });

      // console.error(error);
      // setErrorMessage("인증 확인 중 오류가 발생했습니다."); // 오류 발생 시 메시지 설정
      // setState("error"); // 오류 상태로 변경

  };
  
   // 닉네임 오류
  const validateNickname = (value: string) => {
    if (!value) return '닉네임을 입력해주세요.';
    if (value.length < 2 || value.length > 8) return '닉네임은 2 ~ 8자입니다.';
    // if () return '중복체크를 해주세요.'
    return '';
  };

  // 비밀번호 오류
  const validatePassword = (password: string) => {
    const PASSWORD_REGEX =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,17}$/;
    if (!PASSWORD_REGEX.test(password))
      return '비밀번호는 영어, 숫자, 특수문자를 모두 포함한 8~17자여야 합니다.';
    return '';
  };

  // 약관 동의 눌렀는지 확인
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
    setCheckboxError('');
  };



  //비밀번호 보였다 안보였다...
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // 비번 재발급, 임시 비번 받기
  const handleSendPassword = async (email: string) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    if (!email) {
      setMessage("이메일을 확인해주세요");
      return;
    }

    axios.post("http://localhost:8080/api/auth/reset-password", {})
      .then(response => {
        // setIsCodeSent(true);
        // setServerAuthCode(response.data.);
      })
      .catch(error => {
        console.log(error);
        setMessage("인증코드 발송에 실패했습니다.");
      });
  }

  // 비밀번호 변경 인증코드 확인
  // const checkResetCodeValidity = async ()=> {
  //   axios.post("https://localhost:8080/api/auth/ddddd", {})
  //   .then(response => )
  // }

  useEffect(() => {
    let intervalId: number | null = null;

    if (state === 'waiting' && timer > 0) {
      intervalId = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0 && state === 'waiting') {
      setState('timeout');
      setErrorMessage(''); // 시간 초과 시 오류 메시지 제거
    }

    return () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [state, timer]);

  const handleIssue = () => {
    setState('waiting');
    setTimer(300); // 타이머 초기화 (10초)
    setErrorMessage(''); // 오류 메시지 초기화
    setInputValue(''); // 입력 값 초기화
  };

  const handleVerify = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('인증코드를 작성하세요');
      return;
    }
  };

  const handleReissue = () => {
    setState('waiting');
    setTimer(300); // 타이머 초기화
    setErrorMessage(''); // 오류 메시지 초기화
    setInputValue(''); // 입력 값 초기화
  };

  const EmailVerification = () => {
    // const { handleSendAuthCode } = useSignUp();
    const [state, setState] = useState('initial'); // "initial", "waiting", "success", "error", "timeout"
    const [timer, setTimer] = useState(300); // 타이머 초기값 (10초)
    const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지 상태
    const [inputValue, setInputValue] = useState<string>(''); // 입력 값 상태
    const [email, setEmail] = useState<string>(''); // 이메일 상태
    const [emailError, setEmailError] = useState<string>(''); // 이메일 오류 메시지

    useEffect(() => {
      let intervalId: number | null = null;

      if (state === 'waiting' && timer > 0) {
        intervalId = window.setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }

      if (timer === 0 && state === 'waiting') {
        setState('timeout');
        setErrorMessage(''); // 시간 초과 시 오류 메시지 제거
      }

      // Clean up the interval when the component unmounts or timer stops
      return () => {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
        }
      };
    }, [state, timer]);
  };


  // 엔터키 눌렀을대

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null); // 상태 선언
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const validateEmail = (value: string) => {
    const EMAIL_REGEX =
      /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!value) return '이메일을 입력해주세요.';
    if (!EMAIL_REGEX.test(value)) return '이메일 형식이 올바르지 않습니다.';
    return ''; // 유효한 경우 빈 문자열 반환
  };

  // 인증 코드 확인
  const verifyAuthCode = async (code: string) => {
    try {
      const response = await axios.post('/api/auth/verify', { authCode });
      return response.data;
    } catch (error) {
      console.error('Error verifying auth code:', error);
      throw error;
    }
  };

  // 비밀번호 업데이트
  const updatePassword = async (authCode: string, newPassword: string) => {
    try {
      const response = await axios.post('/api/password/update', {
        authCode,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };
  
  const checkEmailAvailability = async (email: string) => {

      if (email === '') {
        setEmailCheckMessage("이메일을 입력해주세요.");
      } 
      
      axios.get(`http://localhost:8080/api/auth/email?email=${email}`)
      .then(
        res => {
          
          if (res.data === false) {
            setEmailCheckMessage("사용 가능한 이메일입니다.");
            // setIsEmailAvailable(false);
          }
        }
      ).catch(
        res => {
        setEmailCheckMessage("중복된 이메일 입니다.")
        // setIsEmailAvailable(false);
        }
      )
      }

    const [nickCheckMessage, setNicknameCheckMessage] = useState('');
    const [newnickname, setNewnickname] = useState('');

  // 닉네임 중복 검사
  const [canUseNickname, setCanUseNickname] = useState<boolean | null>(null);

  const checkNicknameAvailability = async (nickname: string): Promise<boolean> => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/auth/nickname?nickname=${nickname}`
      );
      console.log('닉네임 중복체크 클릭');
      console.log(res.data);
      const canUse = res.data === false;
      setCanUseNickname(canUse);
      return canUse;
    } catch (error) {
      console.error(error);
      setCanUseNickname(false);
      return false; 
    }
  };
  
  
  
  const register = async (signupInfo : signupType) => {
      const response = await postSignupInfo(signupInfo); // 서버에 데이터를 보내는 부분
      console.log(response);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // 유효성 검사
    if (password !== checkPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isCheckboxChecked) {
      setErrorMessage('약관에 동의해야 합니다.');
      return;
    }
      register(signupInfo); 
  };

  return {
    checkEmailAvailability, 
    nickCheckMessage,
    nicknameValidationMessage,
    // handleNicknameCheck,
    checkNicknameAvailability,
    isCodeSent,
    handleSendAuthCode,
    handleVerifyAuthCode,
    // checkEmailDuplicate,
    setEmail,
    emailError,
    email,
    setAuthCode,
    nicknameError,
    setNickname,
    passwordError,
    setPassword,
    showPassword,
    confirmPasswordError,
    setCheckPassword,
    showConfirmPassword,
    isCheckboxChecked,
    checkboxError,
    // checkEmailAvailability,
    register,
    // validateEmail,
    // validateAuthCode,
    validateNickname,
    validatePassword,
    handleSubmit,
    handleCheckboxChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    // handleBackgroundClick,
    // handleIssueCode,
    // handleVerifyCode,
    handleIssue,
    handleVerify,
    handleReissue,
    state,
    errorMessage,
    timer,
    EmailVerification,
    inputValue,
    setInputValue,
    handleSendPassword,
    nickname,
    isEmailAvailable,
    verifyAuthCode,
    updatePassword,
    emailCheckMessage,
    validateEmail,
    setEmailError,
    password,
    checkPassword,
    canUseNickname,
  }

}
export default useSignUp;