import { axiosInstance } from "@/app/(hooks)/axiosConfig";
import { axiosWithAuth } from "@/app/(models)/axiosWithAuth";

const qnaApi = () => {

  const getQnA = () => {
    const result = axiosInstance.get("/api/qna")
      .then(res => {
        return res.data.content;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  };

  const getQnaDetail = (id: string) => {
    const result = axiosInstance.get(`/api/qna/${id}`)
      .then(res => {
        return res.data;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }

  const postQnA = (data: any) => {
    const result = axiosWithAuth.post(`/api/qna`, data)
      .then(res => {
        if (res.status === 201) {
          console.log("성공")
        }
        return res.data;
      }).catch(err => {
        if (err.status !== 201) {
          alert("작성 실패.")
        }
      })
    return result;
  }

  const urlImage = (data: FormData) => {
    const result = axiosWithAuth.post("/files/images", data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return res.data;
      }).catch(err => (
        console.log(err)
      ))
    return result;
    ;
  }

  const getComment = (id: string) => {
    const result = axiosWithAuth.get(`/api/qna/${id}/reply`)
      .then(res => {
        return res.data.content;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }

  const postComment = (id: string, comment: String) => {
    const result = axiosWithAuth.post(`/api/qna/${id}/reply`, { content: comment })
      .then(res => {
        return res;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }


  return {
    postQnA, urlImage, getQnA, getQnaDetail, getComment, postComment
  }
}
export default qnaApi;