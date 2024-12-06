export interface QnaListType {
  id: number,
  userId: string,
  language: string,
  title: string,
  content: string,
  likeCount: number,
  viewCount: number,
  answerCount: number,
  isSelected: boolean,
  createDate: string,
}