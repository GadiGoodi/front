import axios from "axios";

const postQnaApi = () => {

  const getQnaList = (id: number) => {
    const result = axios.get(`http://localhost:8080/api/users/${id}/qna`)
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