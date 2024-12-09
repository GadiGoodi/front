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

  const getQnaDetail = (id: number) => {
    const result = axios.get(`http://localhost:8080/api/qna/${id}`)
      .then(res => {
        return res.data;
      }).catch(err => (
        console.log(err)
      ))
    return result;
  }

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

  const getComment = (id: number) => {
    const number = id;
    // const result = axios.get(`http://localhost:8080//api/qna/${id}/reply`)
    //   .then(res => {
    //     return res.data;
    //   }).catch(err => (
    //     console.log(err)
    //   ))
    return [
      {
        id: 1,
        nickname: "피타고라스",
        content: "이 글 정말 유익하네요!",
        parentId: 0,
        createDate: "2024-12-09T12:30:00Z",
        boardId: 1
      },
      {
        id: 2,
        nickname: "안성재",
        content: "질문이 있어요. 어떻게 하면 좋을까요?",
        parentId: 1,
        createDate: "2024-12-09T13:15:00Z",
        boardId: 1
      },
      {
        id: 3,
        nickname: "카넬로",
        content: "좋은 답변 감사합니다!",
        parentId: 1,
        createDate: "2024-12-09T14:45:00Z",
        boardId: 1
      },
      {
        id: 4,
        nickname: "티니핑",
        content: "추가로 참고할 자료가 필요합니다.",
        parentId: 2,
        createDate: "2024-12-09T15:20:00Z",
        boardId: 1
      },
      {
        id: 5,
        nickname: "캔모아",
        content: "제가 알고 있는 정보가 맞다면, 이런 방식도 가능할 것 같습니다.",
        parentId: 0,
        createDate: "2024-12-09T16:10:00Z",
        boardId: 2
      },
    ]
  }

  const postComment = (id: number, comment: string) => {
    const result = axios.post(`http://localhost:8080/api/qna/${id}/reply`, comment)
      .then(res => {
        return res.data;
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