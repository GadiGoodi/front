'use clietn';

import { useState } from 'react';
import { UUID } from 'crypto';
import { CodingroomsDTO } from '@/entities/codingrooms/types/CodingroomsDTO';
import CodingroomsApi from '@/entities/codingrooms/apis/codingroomsApi';

const useParticipations = () => {
  const { getCodingroomsParticipations } = CodingroomsApi();

  // 코드방 정보
  const defaultCodingrooms: CodingroomsDTO[] = [
    {
      id: 0,
      uuid: '' as UUID,
      title: '',
      value: '',
      headCount: 0,
      language: '',
    },
  ];

  const [codingrooms, setCodingrooms] = useState(defaultCodingrooms);

  // 참여자 정보
  const [participants, setParticipants] = useState([
    {
      id: 0,
      imageUrl: '',
    },
  ]);

  return {
    codingrooms,
    setCodingrooms,
    participants,
    setParticipants,
  };
};

export default useParticipations;
