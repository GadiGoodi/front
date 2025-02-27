import { authApiClient } from '@/apis/client';

/**
 * 초대된 코드방 목록 조회
 */
export const getInvitations = async (page: number) => {
  const { data } = await authApiClient.get(`/my-page/invitations`, {
    params: { page },
  });
  return data;
};
