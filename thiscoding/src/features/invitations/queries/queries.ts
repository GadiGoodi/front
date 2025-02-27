import { getInvitations } from '@/entities/coderoom/apis';
import { useQuery } from '@tanstack/react-query';
import type { GetInvitationsData } from '../types/types';

export const useInvitations = (page: number) =>
  useQuery<GetInvitationsData>({
    queryKey: ['invitations', page],
    queryFn: () => getInvitations(page),
    initialData: {
      content: [],
      totalElements: 0,
      currentPage: 0,
      totalPage: 1,
      pageSize: 12,
    },
  });
