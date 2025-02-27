export interface QnaSearchItem {
  id: string;
  userId: number;
  title: string;
  content: string;
  language: string;
  parentId: number | null;
  likeCount: number;
  viewCount: number;
  answerCount: number;
  createDate: Date;
  selected: boolean;
}
