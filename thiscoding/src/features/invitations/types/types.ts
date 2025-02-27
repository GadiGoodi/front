export interface Invitations {
  alarmId: number;
  codeRoomId: number;
  title: string;
  content: string;
  language: string;
  headCount: number;
  nickname: string;
  imageUrl: string;
}

export interface GetInvitationsData {
  content: Invitations[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}
