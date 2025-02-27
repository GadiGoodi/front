import { apiClient } from '@/apis/client';

export const fetchQnA = async () => {
  const { data } = await apiClient.get('/qna');
  return data;
};

export const fetchQnaDetail = async (id: string) => {
  const { data } = await apiClient.get(`/qna/${id}`);
  return data;
};
