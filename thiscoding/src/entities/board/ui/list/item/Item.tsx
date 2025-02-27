'use client';

import { Title, Content, SubInfo } from '../../item';

interface QnaItemProps {
  QnaItem: {
    qnaId: string;
    language: string;
    title: string;
    nickname: string;
    content: string;
    viewCount: number;
    createDate: string;
    answerCount: number | null;
    likeCount: number | null;
  };
}

export const TestQna = ({
  QnaItem: {
    qnaId,
    language,
    title,
    content,
    nickname,
    createDate,
    viewCount,
    answerCount,
    likeCount,
  },
}: QnaItemProps) => {
  return (
    <>
      <div className="flex-col border-b w-[900px] border-black border-collapse h-[80]">
        <Title language={language} title={title} qnaId={qnaId} />
        <Content content={content} />
        <SubInfo
          nickname={nickname}
          createDate={createDate}
          viewCount={viewCount}
          likeCount={likeCount}
          answerCount={answerCount}
        />
      </div>
    </>
  );
};
