'use client';

import React from 'react';
import { QnaList } from '@/entities/board/ui/list/List';
import { useQnaList } from '@/entities/board/ui/list/query';

export default function test() {
  const { data } = useQnaList();
  return <QnaList data={data} />;
}
