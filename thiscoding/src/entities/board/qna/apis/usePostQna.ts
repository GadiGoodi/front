'use client';

import postQnaApi from '@/entities/board/my-qna/apis/postQnaApi';
import { PostQnaType } from '@/entities/board/my-qna/types/PostQnaType';
import { useState } from 'react';

const usePostQna = () => {
  const { getQnaList } = postQnaApi();

  const [postQnaList, setPostQnaList] = useState<Array<PostQnaType>>([]);

  const fetchQnaList = async () => {
    const result = await getQnaList();
    setPostQnaList(result);
  };

  return {
    fetchQnaList,
    postQnaList,
  };
};
export default usePostQna;
