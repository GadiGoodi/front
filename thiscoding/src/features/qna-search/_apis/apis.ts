import { authApiClient } from '@/apis/client';
export const fetchQnaSearch = async (keyword: string | null) => {
  const { data } = await authApiClient.get(`/qna/search?keyword=${keyword}`);
  return data;
};
