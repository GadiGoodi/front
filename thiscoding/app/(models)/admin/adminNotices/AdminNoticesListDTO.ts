import { User } from "@/app/(models)/users/User"
// Manager 타입 정의 (Manager 엔티티가 어떤 필드를 가지는지 추가로 정의 필요)
export interface AdminNoticesListDTO {
  id: number;
  manager: User; // User 타입을 포함하는 경우
  title: string;
  category: string;
  viewCount: number;
  createDate: string;
}
