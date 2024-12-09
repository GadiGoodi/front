'use client'
import { PiSirenFill } from "react-icons/pi";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Link from "next/link";
import QnADetailAnswer from "./QnADetailAnswer";
import { useEffect, useState } from "react";
import UserReportModal from "../../common/UserReportModal";
import AdminDeleteModal from "../../common/AdminDeleteModal";
import useQnA from "@/app/(hooks)/qna/useQnA";
import { useParams } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import Comment from "@/app/(components)/qna/[qna_Id]/[answer_Id]/Comment";
import Reply from "@/app/(components)/qna/[qna_Id]/[answer_Id]/Reply"



const QnADetail = () => {
  const params = useParams();

  const { fetchQnaDetail, commentList, fetchComment, qnaDetail, createComment, toggleIsComment, isComment, PostCommentHandler, isReply, postTagReply } = useQnA();

  const [isBookMark, setIsBookMark] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isAdminDelete, setIsAdminDelete] = useState(false);

  useEffect(() => {
    fetchQnaDetail(Number(params.qna_Id));
  }, [])

  const toggleBookMark = () => {
    setIsBookMark(!isBookMark);
  }

  const toggleReport = () => {
    setIsReport(!isReport);
  }
  const toggleAdminDelete = () => {
    setIsAdminDelete(!isAdminDelete);
  }

  const postAnswer = () => {
    //답변 작성 api 작성
  }

  return (
    <div className=" flex justify-center items-center ">
      <div className="flex-col justify-center items-center relative">
        <div className="w-[1200] h-[550] mt-8 bg-white flex-col justify-center items-center rounded-xl relative">
          <div className="flex-col pt-10 justify-center items-center mx-[50]">
            <div className="w-full flex justify-between">
              <div className="flex gap-5 justify-center items-center">
                <div className="w-[120] h-[30] bg-[#0095E8] flex justify-center items-center text-white rounded-full">{qnaDetail?.language}</div>
                <div>{qnaDetail?.title}</div>
              </div>
              <div className="flex items-center !text-xl">
                <button onClick={toggleAdminDelete} className="underline text-[#656565] mr-5">삭제</button>
                <PiSirenFill onClick={() => toggleReport()} className="text-[#FC7373]" />
                {isBookMark === false ?
                  <button onClick={() => toggleBookMark()}>
                    <BookmarkBorderIcon />
                  </button>
                  :
                  <button onClick={() => toggleBookMark()}>
                    <BookmarkIcon />
                  </button>
                }
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div>{qnaDetail?.userId} | {qnaDetail?.createDate}</div>
              <div className='mb-1 flex justify-center items-center'><RemoveRedEyeIcon />{qnaDetail?.viewCount}</div>
              <div className='mb-1 flex justify-center items-center'><ChatIcon />{qnaDetail?.answerCount}</div>
            </div>
          </div>
          <div className="flex justify-start items-center mx-[50] mt-8 w-[900]">{qnaDetail?.content}</div>
          <div className="flex w-[1100] justify-between mx-[50] absolute bottom-5">
            <button onClick={() => { toggleIsComment(); fetchComment(Number(params.qna_Id)) }} className="flex justify-center items-center gap-2"><IoChatbubbleEllipsesSharp className="!text-2xl" />{qnaDetail?.commentCount}</button>
            <div className='flex'>
              <div onClick={() => postAnswer()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border text-sm border-[#D0D0D0]'>답변 작성</div>
              <Link href="/qna">
                <div className='w-[75px] h-[45px] bg-[#444444] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>목록</div>
              </Link>
            </div>
          </div>
        </div>
        {isComment === true && isReply === false &&
          <div className="w-[1200] h-auto mb-10 flex-col bg-white rounded-md mt-12">
            <div className="flex-col justify-between mb-7 mx-[50] pt-9">
              <div>댓글<span className="text-[#0095E8] ml-1">{commentList?.length}</span></div>
              <textarea onChange={(e) => PostCommentHandler(e)} className="resize-none w-full border border-[#D0D0D0] bg-[#EBEBEB] rounded-lg h-24 flex justify-start items-start" placeholder="작성할 댓글의 내용을 입력해주세요." />
              <button className="flex justify-end w-full" onClick={() => createComment(Number(params.qna_Id))}>
                <SendIcon />
              </button>
            </div>
            <>
              {commentList?.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment} />
              ))}
            </>
          </div>
        }
        <div className="w-[1200] h-auto mb-10 flex-col bg-white rounded-md mt-12">
          <div className="flex justify-between mb-7 mx-[50] pt-9">
            <div>답변<span className="text-[#0095E8] ml-1">{qnaDetail?.answerCount}</span></div>
            <select className="border text-[#999999] border-[#E6E6E6] w-[200] h-[40] px-5 py-2 rounded-md shadow-xl">
              <option value="1">추천순</option>
              <option value="2">최신순</option>
              <option value="3">오래된순</option>
            </select>
          </div>
          <>
            <QnADetailAnswer />
            <QnADetailAnswer />
            <QnADetailAnswer />
            <QnADetailAnswer />
            <QnADetailAnswer />
            <QnADetailAnswer />
          </>
        </div>
        {isReport === true ?
          <div className="w-full h-full overflow-y-hidden flex justify-center items-center fixed  z-10 inset-0 bg-gray-500/50">
            <UserReportModal
              setIsReport={setIsReport}
            />
          </div>
          :
          <></>
        }
        {isAdminDelete === true ?
          <div className="w-full h-full overflow-y-hidden flex justify-center items-center fixed  z-10 inset-0 bg-gray-500/50">
            <AdminDeleteModal
              setIsAdminDelete={setIsAdminDelete}
            />
          </div>
          :
          <></>
        }
      </div>
    </div >
  )
}
export default QnADetail;