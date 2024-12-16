import qnaApi from "@/app/(apis)/qna/qnaApi";
import { QnaCommentType } from "@/app/(models)/qna/QnaCommentType";
import { QnaDetailType } from "@/app/(models)/qna/QnaDetailType";
import { QnaListType } from "@/app/(models)/qna/QnaListType";
import { useState } from "react";
const useQnA = () => {

  //QnA Api
  const { postQnA, urlImage, getQnA, getQnaDetail, getComment, postComment } = qnaApi();

  //QnA 작성 데이터 state
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [markDown, setMarkDown] = useState('')

  const [qnaList, setQnaList] = useState<Array<QnaListType>>([])
  const [qnaDetail, setQnaDetail] = useState<QnaDetailType>()

  const [isComment, setIsComment] = useState(false);
  const [Comment, setComment] = useState([]);
  const [commentList, setCommentList] = useState<Array<QnaCommentType>>([]);
  const [isReply, setIsReply] = useState(false);
  const [postTagReply, setPostTagReply] = useState(false);
  const [postTagComment, setPostTagComment] = useState(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const [replyContent, setReplyContent] = useState<string>('');

  //QnA 작성 데이터
  const defaultQna = {
    language: "JavaScript / TypeScript",
    title: "",
    content: content,
    image: ""
  }
  const [qnaData, setQnaData] = useState(defaultQna);


  const toggleIsComment = () => {
    setIsComment(!isComment);
  }

  const toggleTagReply = () => {
    setPostTagReply(!postTagReply);
  }

  const ReplyHandler = () => {
    setIsReply(!isReply);
  }

  const PostCommentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
    //댓글 작성 api
  };
  const PostReplyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    //댓글 작성 api
  };


  /* 
  API 호출 부분
  */

  //QnA 전체 조회
  const getQnaList = async () => {
    const result = await getQnA();
    console.log(result);
    setQnaList(result);
  }

  const fetchQnaDetail = async (id: number) => {
    const result = await getQnaDetail(id);
    console.log(result);
    setQnaDetail(result);
  }

  //QnA 작성
  const createQnA = async () => {
    const result = await postQnA(qnaData);
    return result;

  }

  //ToastUi Editor 이미지 Base64 > Url 반환
  const getUrlImage = async (data: FormData) => {
    const result = await urlImage(data)
    console.log(data);
    return result;
  }

  const fetchComment = async (id: number) => {
    const result = await getComment(id);
    setCommentList(result);
  }

  const createComment = async (id: number) => {
    const result = await postComment(id, commentContent);
    setComment(result);
  }


  return {
    createComment, PostCommentHandler, PostReplyHandler, content, image, setPostTagReply, toggleIsComment, isComment, qnaList,
    qnaDetail, postTagComment, toggleTagReply, setMarkDown, markDown,
    setPostTagComment, ReplyHandler, isReply, postTagReply, getQnaList, setIsReply, fetchComment, setContent,
    setImage, createQnA, getUrlImage, fetchQnaDetail, commentList, setQnaData, qnaData
  }

}
export default useQnA;