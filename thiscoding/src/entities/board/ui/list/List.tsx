'use client';

import { TestQna } from './item/Item';
import { useQnaList } from './query';

export default interface QnaItem {
  qnaId: string;
  language: string;
  title: string;
  nickname: string;
  content: string;
  viewCount: number;
  createDate: string;
  answerCount: number | null;
  likeCount: number | null;
}

export const QnaList = () => {
  const {
    data: { content, totalElements, currentPage, totalPage, pageSize },
  } = useQnaList();
  return (
    <>{content?.map((qna) => <TestQna key={qna.qnaId} QnaItem={qna} />)}</>
  );
};
