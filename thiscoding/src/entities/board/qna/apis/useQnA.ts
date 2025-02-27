'use client';

import qnaApi from '@/entities/board/qna/apis/qnaApi';
import { QnaCommentType } from '@/entities/board/qna/types/QnaCommentType';
import { QnaDetailType } from '@/entities/board/qna/types/QnaDetailType';
import { QnaListType } from '@/entities/board/qna/types/QnaListType';
import {
  Query,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
const useQnA = () => {
  //QnA Api
  const { postQnA, urlImage, getQnA, getQnaDetail, getComment, postComment } =
    qnaApi();

  //QnA 작성 데이터 state
  const [image, setImage] = useState({ path: '' });
  const [content, setContent] = useState(' ');
  const [markDown, setMarkDown] = useState('');

  const [qnaList, setQnaList] = useState<Array<QnaListType>>([]);
  const [qnaDetail, setQnaDetail] = useState<QnaDetailType>();

  const [isComment, setIsComment] = useState(false);
  const [commentList, setCommentList] = useState<Array<QnaCommentType>>([]);
  const [isReply, setIsReply] = useState(false);
  const [postTagReply, setPostTagReply] = useState(false);
  const [postTagComment, setPostTagComment] = useState(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const [replyContent, setReplyContent] = useState<string>('');
  const [qnaId, setQnaId] = useState('');

  //QnA 작성 데이터
  const defaultQna = {
    language: 'JavaScript / TypeScript',
    title: '',
    content: content,
  };
  const [qnaData, setQnaData] = useState(defaultQna);

  const queryClient = useQueryClient();

  const toggleIsComment = () => {
    setIsComment(!isComment);
  };

  const toggleTagReply = () => {
    setPostTagReply(!postTagReply);
  };

  const ReplyHandler = () => {
    setIsReply(!isReply);
  };

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
  };

  const fetchQnaDetail = async (id: string) => {
    const result = await getQnaDetail(id);
    console.log(result);
    setQnaDetail(result);
  };

  //QnA 작성
  const createQnA = async () => {
    const result = await postQnA(qnaData);
    return result;
  };

  //ToastUi Editor 이미지 Base64 > Url 반환
  const getUrlImage = async (data: FormData) => {
    const result = await urlImage(data);
    console.log(result.data);
    //받아온 Url 본문에 덮어쓰기
    setQnaData((prevState) => ({
      ...prevState,
      [content]: result.path,
    }));
    return result;
  };

  const fetchComment = async (id: string) => {
    const result = await getComment(id);
    setCommentList(result);
  };

  const createComment = (id: string) => {
    if (commentContent.trim()) {
      setCommentContent(''); // 댓글 작성 후 텍스트 초기화
      setQnaId(id);
      commentUpdate.mutate({ id, content: commentContent });
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    } else {
      alert('댓글 내용을 입력해주세요.');
    }
  };

  const commentUpdate = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      await postComment(id, content); // postComment에서 id와 content를 제대로 처리해야 함
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
    onError: (err) => {
      alert('댓글 작성이 실패하였습니다.');
    },
  });

  const enterComment = async (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' && commentContent.trim()) {
      setCommentContent(''); // Enter 후 텍스트 초기화
      setQnaId(id);
      commentUpdate.mutate({ id, content: commentContent }); // 댓글 내용을 mutation에 전달
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    }
  };

  return {
    createComment,
    PostCommentHandler,
    PostReplyHandler,
    content,
    image,
    setPostTagReply,
    toggleIsComment,
    isComment,
    qnaList,
    qnaDetail,
    postTagComment,
    toggleTagReply,
    setMarkDown,
    markDown,
    setCommentContent,
    setPostTagComment,
    ReplyHandler,
    isReply,
    postTagReply,
    getQnaList,
    setIsReply,
    fetchComment,
    setContent,
    setImage,
    createQnA,
    getUrlImage,
    fetchQnaDetail,
    commentList,
    setQnaData,
    qnaData,
    enterComment,
    commentContent,
  };
};
export default useQnA;
