type Role = 'ADMIN' | 'USER' | 'GUEST'; // 예시로 설정, 실제 값에 맞게 수정
type Social = 'LOCAL' | 'GOOGLE' | 'KAKAO'; // 예시로 설정, 실제 값에 맞게 수정

// User 타입 정의
export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  isActivated: boolean;
  isBanned: boolean;
  role: Role;
  social: Social;
}