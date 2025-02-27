import { User } from '@/entities/user/types/user';
export interface AdminNoticesDetailDTO {
  id: number;
  // manager: User; // User 타입을 포함하는 경우
  title: string;
  content: string;
  category: string;
  viewCount: number;
}

export interface NoticePostData {
  title: string;
  content: string;
  category: string;
}
