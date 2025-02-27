import { authApiClient, apiClient } from '@/apis/client';

const qnaApi = () => {
  const getQnA = () => {
    const result = apiClient
      .get('/qna')
      .then((res) => {
        return res.data.content;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const getQnaDetail = (id: string) => {
    const result = apiClient
      .get(`/qna/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const postQnA = (data: any) => {
    const result = authApiClient
      .post(`/qna`, data)
      .then((res) => {
        if (res.status === 201) {
          console.log('성공');
        }
        return res.data;
      })
      .catch((err) => {
        if (err.status !== 201) {
          alert('작성 실패.');
        }
      });
    return result;
  };

  const urlImage = (data: FormData) => {
    const result = authApiClient
      .post('/files/images', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const getComment = (id: string) => {
    const result = authApiClient
      .get(`/qna/${id}/reply`)
      .then((res) => {
        return res.data.content;
      })
      .catch((err) => console.log(err));
    return result;
  };

  const postComment = (id: string, comment: String) => {
    const result = authApiClient
      .post(`/qna/${id}/reply`, { content: comment })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    return result;
  };

  return {
    postQnA,
    urlImage,
    getQnA,
    getQnaDetail,
    getComment,
    postComment,
  };
};
export default qnaApi;
