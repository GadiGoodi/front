import { fetchQnaSearch } from './apis/apis';
import { useQuery } from '@tanstack/react-query';
import { QnaSearchItem } from './types/item';

export interface QnaSearch {
  content: QnaSearchItem[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export const useQnaSearchQuery = (keyword: string) =>
  useQuery<QnaSearch>({
    queryKey: ['qnaSearch', keyword],
    queryFn: () => fetchQnaSearch(keyword),
    initialData: {
      content: [],
      totalElements: 0,
      currentPage: 0,
      totalPage: 1,
      pageSize: 10,
    },
  });
