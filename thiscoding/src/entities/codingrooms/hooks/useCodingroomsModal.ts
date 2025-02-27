'use client';

import CodingroomsModalApi from '@/entities/codingrooms/apis/codingroomsModalApi';
import { codeSnippets } from '@/entities/codingrooms/types/CodingroomsDTO';
import { CodingroomsCreateData } from '@/entities/codingrooms/types/CodingroomsDTO';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useCodingroomsModal = () => {
  const router = useRouter();

  // axios api
  const { postCodingrooms, postUserCodeRoom, patchUserCodeRoom, postCode } =
    CodingroomsModalApi();

  // 모달에서 코드방 생성 시, 입력 데이터
  const defaultCodingroomsModalData: CodingroomsCreateData = {
    title: '',
    content: '',
    language: '',
  };

  const [codingroomsModalData, setCodingroomsModalData] = useState(
    defaultCodingroomsModalData,
  );

  // 코드방 생성
  const createCodingrooms = async () => {
    if (
      codingroomsModalData.title === '' ||
      codingroomsModalData.content === '' ||
      codingroomsModalData.language === ''
    ) {
      alert('빈 칸을 입력해주세요.');
      return;
    }

    const result = await postCodingrooms(codingroomsModalData);

    // 코드방 참여 POST
    postUserCodeRoom(1, result.id);

    const postData = {
      id: null,
      roomId: result.id,
      writerId: 1, // TODO: 로그인한 사용자 고유 ID 입력
      fileName: 'main',
      value: codeSnippets[codingroomsModalData.language],
    };

    // 코드 POST
    postCode(postData);

    router.push(`/codingrooms/${result.uuid}`);
  };

  return {
    defaultCodingroomsModalData,
    codingroomsModalData,
    setCodingroomsModalData,
    createCodingrooms,
  };
};

export default useCodingroomsModal;
