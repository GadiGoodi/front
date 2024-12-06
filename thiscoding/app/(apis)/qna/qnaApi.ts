import axios from "axios"

const qnaApi = () => {

  const postQnA = (data: any) => {
    const result = axios.post(`http://localhost:8080/api/qna`, data)
      .then(res => {
        return res.data;
      }).catch(err => {
        console.error(err)
      })
    return result;
  }

  const urlImage = (data: FormData) => {
    const result = axios.post("http://localhost:8080/api/image", data,
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

  return {
    postQnA, urlImage
  }
}
export default qnaApi;