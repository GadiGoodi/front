type Role = 'ADMIN' | 'USER' | 'GUEST'; // 예시로 설정, 실제 값에 맞게 수정
type Social = 'LOCAL' | 'GOOGLE' | 'KAKAO'; // 예시로 설정, 실제 값에 맞게 수정

// User 타입 정의
interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  isActivated: boolean;
  isBanned: boolean;
  role: Role;
  social: Social;
}

// Manager 타입 정의 (Manager 엔티티가 어떤 필드를 가지는지 추가로 정의 필요)
export interface AdminNoticesListDTO {
  id: number;
  manager: User; // User 타입을 포함하는 경우
  title: string;
  category: string;
  viewCount: number;
}
