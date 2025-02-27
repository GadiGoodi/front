'use client';

import { authApiClient } from '@/apis/client';
import { GetInvitationsData } from '../types/types';

/**
 * 초대된 코드방 목록 조회
 */
export const getInvitations = async (page: number) => {
  const { data } = await authApiClient.get<GetInvitationsData>(
    `/my-page/invitations`,
    {
      params: { page },
    },
  );
  return data;
};

/**
 * 초대된 코드방 수락
 */
export const acceptInvitations = async ({
  alarmId,
  codeRoomId,
}: {
  alarmId: number;
  codeRoomId: number;
}) => {
  const data = await authApiClient.put(
    `/my-page/invitations/alarms/${alarmId}/codeRooms/${codeRoomId}`,
    {},
  );
  return data;
};

/**
 * 초대된 코드방 거절
 */
export const declineInvitations = async ({
  alarmId,
  codeRoomId,
}: {
  alarmId: number;
  codeRoomId: number;
}) => {
  const data = await authApiClient.delete(
    `/my-page/invitations/alarms/${alarmId}/codeRooms/${codeRoomId}`,
  );
  return data;
};
