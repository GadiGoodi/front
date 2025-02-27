import { getInvitations } from '@/entities/coderoom/apis';
import { useQuery } from '@tanstack/react-query';
import { Invitations } from '../types';

interface getInvitations {
  content: Invitations[];
  totalElements: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export const useInvitations = (page: number) =>
  useQuery<getInvitations>({
    queryKey: ['invitedCodeRooms', page],
    queryFn: () => getInvitations(page),
    initialData: {
      content: [],
      totalElements: 0,
      currentPage: 0,
      totalPage: 1,
      pageSize: 12,
    },
  });
