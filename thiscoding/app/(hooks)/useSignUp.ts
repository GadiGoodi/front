import axios from "axios";
import router from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

const useSignUp =() => {

const [emailError, setEmailError] = useState('');
const [authCode, setAuthCode] = useState('');
const [authCodeError, setAuthCodeError] = useState('');
const [nicknameError, setNicknameError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');
const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
const [checkboxError, setCheckboxError] = useState('');
const [isChecking, setIsChecking] = useState(false);
const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 타입 지정 추가
const [error, setError] = useState<string | null>(null);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 회원가입 정보...
const [email, setEmail] = useState('');
const [nickname, setNickname] = useState('');
const [password, setPassword] = useState('');
const [checkPassword, setCheckPassword] = useState('');
const [isClient, setIsClient] = useState(false);
const [status, setStatus] = useState('idle'); // idle, issued, verified, wrong, expired
const [timer, setTimer] = useState(300);
const [success, setSuccess] = useState(false);
// const router = useRouter();

// 이메일 인증 코드
// const [authCode, setAuthCode] = useState(""); // 사용자가 입력한 인증코드
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [serverAuthCode, setServerAuthCode] = useState(""); // 서버에서 반환된 인증코드
  const [message, setMessage] = useState("");

// 이메일 인증
const handleEmailChange = ({e}: any) => {
  setEmail(e.target.value);
};

// 인증코드 발급 요청
const handleSendAuthCode =  async() => {
  // if (!email) {
  //   setMessage("이메일을 입력해주세요.");
  //   return;
  // }
console.log("Email : " + email);
console.log(nickname);

const result =   await axios.post("http://localhost:8080/api/auth/join-code",  email )
  .then(response => {
    setIsCodeSent(true);
    setServerAuthCode(response.data.authCode); // 서버에서 인증코드 반환
    setMessage("인증코드가 이메일로 발송되었습니다.");
  })
  .catch(error => {
    console?.error(error);
    setMessage("인증코드 발송에 실패했습니다.");
  });
  return result;
};

const emailHandler = (e : ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
  setEmail(e.target.value);
}

// 인증코드 확인 요청
const handleVerifyAuthCode = async () => {
  if (!authCode) {
    setMessage("인증코드를 입력해주세요.");
    return;
  }

  axios.post("http://localhost:8080/api/auth/join-code/check", {
    email,
    authCode,
  })
    .then(response => {
      if (response.data.success) {
        setMessage("인증 성공!");
      } else {
        setMessage("인증코드가 일치하지 않습니다.");
      }
    })
    .catch(error => {
      console.error(error);
      setMessage("인증 확인 중 오류가 발생했습니다.");
    });
  
};
// 클라이언트 사이드에서만 useRouter를 사용할 수 있도록 설정
// useEffect(() => {
//   setIsClient(true);
// }, []);

const register = (email?: string, password?: string) => {
  // if (!isEmailAvailable) {
  //   alert('이메일 중복 검사 후 다시 시도해주세요');
  //   return;
  // }

  // 비밀번호 일치 확인
  if (password !== checkPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  // 약관 동의 여부 확인
  if (!isCheckboxChecked) {
    alert('약관에 동의해야 합니다.');
    return;
  }

  axios
    .post('http://localhost:8080', {
      email: email,
      nickname: nickname,
      password: password,
      checkPassword: checkPassword,
    })
    .then((response) => {
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);

      localStorage.setItem('token', response.data.jwt);

      // 회원가입 성공 후 로그인 페이지로 이동 (클라이언트에서만 실행)
      if (isClient) {
        router.replace('/login'); // 로그인 페이지로 이동
      }
    })
    .catch((error) => {
      console.error('Error registering:', error);
    });
};

// 이메일 중복검사
const checkEmailAvailability = async () => {
  if (!email) {
    setEmailError('이메일을 입력해주세요.');
    return;
  }

  // 이메일 중복 테스트
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1',
    );
    alert('사용 가능한 이메일');
  } catch (error) {
    console.error('Mock API 실패:', error);
    setEmailError('Mock API 요청에 실패했습니다.');
  }
};
// const checkEmailAvailability = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/auth/email?email=${email}`
//     );

//     if (response.status === 200) {
//       setEmailError('');
//       setIsEmailAvailable(true);
//       alert('사용 가능한 이메일입니다.');
//     }
//   } catch (error: any) {
//     if (error.response && error.response.data.message) {
//       setEmailError(error.response.data.message);
//     } else {
//       setEmailError('이메일 중복 검사에 실패했습니다.');
//     }
//     setIsEmailAvailable(false);
//   }
// };

// 닉네임 중복검사const [nicknameError, setNicknameError] = useState('');

  const checkNicknameAvailability = async (newNickname: string) => {
    if (!newNickname) {
      setNicknameError('닉네임을 입력해주세요.');
      return false;  // 닉네임이 비어 있으면 중복 체크하지 않음
    }

    try {
      // 실제 API 요청 부분 (여기서는 Mock API로 대체)
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts/1',  // 여기에 실제 API URL 사용
      );

      // 여기에 중복 검사 로직 추가
      if (response.status === 200) {
        return true;  // 사용 가능한 닉네임
      } else {
        return false;  // 사용 불가능한 닉네임
      }
    } catch (error) {
      console.error('Mock API 실패:', error);
      setNicknameError('중복 확인 오류');
      return false;
    }
  };
//   try {
//     const response = await axios.post(
//       'http://localhost:8080/api/auth/nickname',
//       {
//         nickname,
//       },
//     );

//     if (response.status === 200) {
//       setNicknameError('');
//       alert('사용 가능한 닉네임입니다.');
//     }
//   } catch (error: any) {
//     if (error.response && error.response.data.message) {
//       setNicknameError(error.response.data.message);
//     } else {
//       setNicknameError('닉네임 중복 검사에 실패했습니다.');
//     }
//   }
// };

// 이메일 오류
const validateEmail = (value: string) => {
  const EMAIL_REGEX =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!value) return '이메일을 입력해주세요.';
  if (!EMAIL_REGEX.test(value)) return '이메일 형식이 올바르지 않습니다.';
  // if () return '중복체크를 해주세요.'
  return '';
};

// 인증코드 오류
const validateAuthCode = (value: string) => {
  if (!value) return '인증 코드가 올바르지 않습니다.';
  return '';
};

// 닉네임 오류
const validateNickname = (value: string) => {
  if (!value) return '닉네임을 입력해주세요.';
  if (value.length < 2 || value.length > 8) return '닉네임은 2 ~ 8자입니다.';
  // if () return '중복체크를 해주세요.'
  return '';
};

// 비밀번호 오류
const validatePassword = (value: string) => {
  const PASSWORD_REGEX =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,17}$/;
  if (!value) return '비밀번호를 입력해주세요.';
  if (!PASSWORD_REGEX.test(value))
    return '비밀번호는 영어, 숫자, 특수문자를 모두 포함한 8~17자여야 합니다.';
  return '';
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailValidation = validateEmail(email);
  const nicknameValidation = validateNickname(nickname);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation =
    password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : '';
  const termsValidation = isCheckboxChecked
    ? ''
    : '필수 약관에 동의해야 합니다.';

  setEmailError(emailValidation);
  setNicknameError(nicknameValidation);
  setPasswordError(passwordValidation);
  setConfirmPasswordError(confirmPasswordValidation);
  setCheckboxError(termsValidation);

  if (
    !emailValidation &&
    !nicknameValidation &&
    !passwordValidation &&
    !confirmPasswordValidation &&
    !termsValidation
  ) {
    // 회원가입 요청 로직 추가
    register();
  }
};

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();

//   setEmailError(validateEmail(email));
//   setNicknameError(validateNickname(nickname));
//   setPasswordError(validatePassword(password));
//   setConfirmPasswordError(
//     password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : '',
//   );
//   setCheckboxError(isCheckboxChecked ? '' : '필수 약관에 동의해야 합니다.');

//   if (
//     !validateEmail(email) &&
//     !validateNickname(nickname) &&
//     !validatePassword(password) &&
//     password === confirmPassword &&
//     isCheckboxChecked
//   ) {
//     alert('회원가입 성공!');
//   }
// };

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

// // 타이머 관리
// useEffect(() => {
//   let interval: string | number | NodeJS.Timeout | undefined;
//   if (status === 'issued' && timer > 0) {
//     interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);
//   } else if (timer <= 0 && status === 'issued') {
//     setStatus('expired');
//   }
//   return () => clearInterval(interval);
// }, [status, timer]);

// // 인증 코드 발급 처리
// const handleIssueCode = () => {
//   setAuthCode('');
//   setStatus('issued');
//   setTimer(300); // 타이머 초기화
// };

// // 인증 코드 확인 처리
// const handleVerifyCode = () => {
//   if (authCode === '1234') {
//     setStatus('verified');
//   } else {
//     setStatus('wrong');
//   }
// };

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  if (password !== confirmPassword) {
    setError('비밀번호가 일치하지 않습니다.');
    return;
  }

  try {
    const data = await register(email, password);
    console.log('Register Successful:', data); // 회원가입 성공 후 처리
    setSuccess(true);
  } catch (err) {
    setError('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

// 이메일 중복 체크
// const handleEmailChange = (e: any) => {
//   setEmail(e.target.value);
//   setIsDuplicate(null); // 이메일 변경 시 중복 여부 초기화
// };

// const checkEmailDuplicate = async () => {
//   if (!email) {
//     alert("이메일을 입력해주세요!");
//     return;
//   }

//   setIsChecking(true);
//   setError(null);

//   try {
//     const response = await axios.post("/api/auth/email", { email });
//     setIsDuplicate(response.data.isDuplicate); // boolean 값 설정
//   } catch (err) {
//     console.error(err);
//     setError("중복 확인 중 오류가 발생했습니다.");
//   } finally {
//     setIsChecking(false);
//   }
// };

  // 비번 재발급 메일 받기
  const handleSendPassword = async () => {
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

  // 임시비번 확인 요청
  // const handleVerifyPassword = async () => {
  //   if (!Passs) {
  //     setMessage("인증코드를 입력해주세요");
  //     return;
  //   }
    
  //   axios.post("http://localhost:8080/api/auth/reset-password", {
  //     email, reissuedPassword, resetPassword, checkPassword,
  //   })
  //   .then(reponse => {
  //     if (response.data.success) {
  //       setMessage("인증 성공!");
  //     } else {
  //       setMessage("인증코드가 일치하지 않습니다.")
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     setMessage("인증 확인 중 오류가 발생했습니다.");
  //   });
  // }


return {
  checkNicknameAvailability,
  isCodeSent,
  handleEmailChange,
handleSendAuthCode,
handleVerifyAuthCode,
  // handleEmailChange,
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
  setConfirmPassword,
  showConfirmPassword,
  isCheckboxChecked,
  checkboxError,
  checkEmailAvailability,
  register,
  validateEmail,
  validateAuthCode,
  validateNickname,
  validatePassword,
  handleSubmit,
  handleCheckboxChange,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  emailHandler,
  // handleBackgroundClick,
  // handleIssueCode,
  // handleVerifyCode,
}
}

export default useSignUp;