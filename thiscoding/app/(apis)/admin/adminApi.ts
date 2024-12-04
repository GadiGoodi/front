import axios from "axios"

const AdminApi = () => {

  //관리자 공지사항 작성
  const postAdminNotices = (data: any) => {
    const result = axios.post("http://localhost:8080/api/admin/notices", data)
      .then(res => {
        console.log(res)
        return res.data
      }).catch(err => (
        console.log(err)
      ))
    return result
  }

  //관리자 공지사항 상세 조회
  const getAdminNoticesDetail = (id: number) => {
    const result = axios.get(`http://localhost:8080/api/admin/notices/${id}`)
      .then(res => {
        return res.data;
      }).catch(err => (
        console.error(err)
      ))
    return result;
  }

  const updateAdminNotices = (id: number, data: any) => {
    const reulst = axios.put(`http://localhost:8080/api/admin/notices/${id}`, data)
      .then(res => {
        return res.data;
      }).catch(err => (
        console.error(err)
      ))
  }


  //관리자 공지사항 삭제 api
  const deleteAdminNotices = (id: number) => {
    const result = axios.delete(`http://localhost:8080/api/admin/notices/${id}`)
      .then(res => {
        console.log(res)
        return res.data
      }).catch(err => (
        console.error(err)
      ))
    return result;
  }

  return { postAdminNotices, getAdminNoticesDetail, deleteAdminNotices, updateAdminNotices }
}
export default AdminApi;