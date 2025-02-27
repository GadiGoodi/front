import { authApiClient } from '@/apis/client';
const postQnaApi = () => {
  const getQnaList = () => {
    const result = authApiClient
      .get('/api/boards/qna')
      .then((res) => {
        return res.data.content;
      })
      .catch((err) => console.log(err));
    return result;
  };

  return {
    getQnaList,
  };
};
export default postQnaApi;
