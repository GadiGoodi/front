import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { acceptInvitations, declineInvitations } from '../apis/apis';

export const useAcceptInvitations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptInvitations,
    onSuccess: () => {
      alert('수락 되었습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.serverMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
};

export const useDeclineInvitations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: declineInvitations,
    onSuccess: () => {
      alert('거절 되었습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.serverMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
};
