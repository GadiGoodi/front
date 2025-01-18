import { axiosWithAuth } from "@/app/(models)/axiosWithAuth";
const postQnaApi = () => {

  const getQnaList = () => {
    const result = axiosWithAuth.get("/api/boards/qna")
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