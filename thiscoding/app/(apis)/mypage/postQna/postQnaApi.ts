import { axiosInstance } from "@/app/(hooks)/axiosConfig";

const postQnaApi = () => {

  const getQnaList = (id: number) => {
    const result = axiosInstance.get(`/api/users/${id}/qna`)
      .then(res => {
        return res.data.content;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }


  return {
    getQnaList
  }
}
export default postQnaApi;