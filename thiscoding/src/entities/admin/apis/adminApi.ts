import { authApiClient } from '@/apis/client';
const AdminApi = () => {
  //관리자 공지사항 작성
  const postAdminNotices = (data: any) => {
    const result = authApiClient
      .post('/api/admin/notices', data)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => console.log(err));
    return result;
  };

  //관리자 공지사항 상세 조회
  const getAdminNoticesDetail = (id: number) => {
    const result = authApiClient
      .get(`/api/admin/notices/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
    return result;
  };

  //관리자 공지사항 수정
  const updateAdminNotices = (id: number, data: any) => {
    const reulst = authApiClient
      .patch(`/api/admin/notices/${id}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));
  };

  //관리자 공지사항 삭제
  const deleteAdminNotices = (id: number) => {
    const result = authApiClient
      .delete(`/api/admin/notices/${id}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => console.error(err));
    return result;
  };

  return {
    postAdminNotices,
    getAdminNoticesDetail,
    deleteAdminNotices,
    updateAdminNotices,
  };
};
export default AdminApi;
