import axios from "axios"

const qnaApi = () => {

  const getQnA = () => {
    // const result = axios.get("http://localhost:8080/api/qna")
    //   .then(res => {
    //     return res.data;
    //   }).catch(err => (
    //     console.log(err)
    //   ))
    return [{
      id: 1,
      userId: '김코딩',
      language: 'Java',
      title: '저는 코딩을 못하겠어요',
      content: '아무나 저를 도와주세요',
      likeCount: 10,
      viewCount: 100,
      answerCount: 20,
      isSelected: false,
      createDate: "2024-12-06",
    },
    {
      id: 2,
      userId: '김코딩',
      language: 'Java',
      title: '저는 코딩을 못하겠어요',
      content: '아무나 저를 도와주세요',
      likeCount: 10,
      viewCount: 100,
      answerCount: 20,
      isSelected: false,
      createDate: "2024-12-06",
    }, {
      id: 3,
      userId: '김코딩',
      language: 'Java',
      title: '저는 코딩을 못하겠어요',
      content: '아무나 저를 도와주세요',
      likeCount: 10,
      viewCount: 100,
      answerCount: 20,
      isSelected: false,
      createDate: "2024-12-06",
    }]
  };

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
    postQnA, urlImage, getQnA
  }
}
export default qnaApi;