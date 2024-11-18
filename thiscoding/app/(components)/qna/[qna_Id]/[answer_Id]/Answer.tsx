'use client'
import { PiSirenFill } from "react-icons/pi";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import UserReportModal from "@/app/(components)/common/UserReportModal"
import AdminDeleteModal from "@/app/(components)/common/AdminDeleteModal";
import Comment from "./Comment";
import Reply from "@/app/(components)/qna/[qna_Id]/[answer_Id]/Reply"
import SendIcon from '@mui/icons-material/Send';


const Answer = () => {


  const [isComment, setIsComment] = useState(false);
  const [isBookMark, setIsBookMark] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isAdminDelete, setIsAdminDelete] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [postTagReply, setPostTagReply] = useState(false);
  const [postTagComment, setPostTagComment] = useState(false);

  const ReplyHandler = () => {
    setIsReply(!isReply);
  }

  const toggleIsComment = () => {
    setIsComment(!isComment);
  }

  const toggleBookMark = () => {
    setIsBookMark(!isBookMark);
  }
  const toggleTagReply = () => {
    setPostTagReply(!postTagReply);
  }

  const toggleReport = () => {
    setIsReport(!isReport);
  }
  const postAnswer = () => {
    //답변 작성 api 작성
  }

  const PostReplyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
    //댓글 작성 api
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="flex-col justify-center items-center relative">
        <div className="w-[1200] h-[550] mt-8 bg-white flex-col justify-center items-center rounded-xl relative">
          <div className="flex-col pt-10 justify-center items-center mx-[50]">
            <div className="w-full flex justify-between">
              <div className="flex gap-5 justify-center items-center">
                <div className="w-[120] h-[30] bg-[#0095E8] flex justify-center items-center text-white rounded-full">JavaScript</div>
                <div>VSCODE 자동입력</div>
              </div>
              <div className="flex items-center !text-xl">
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
              <div>개발바닥제자 | 2024.09.30</div>
              <div className='mb-1 flex justify-center items-center'><RemoveRedEyeIcon />140</div>
              <div className='mb-1 flex justify-center items-center'><ChatIcon />12</div>
            </div>
          </div>
          <div className="flex justify-start items-center mx-[50] mt-8 w-[900]">이게 왜 이런건지 잘 모르겠습니다.학원 파이널 프로젝트에서 짜고있는 코드인데...
            VSCode 에러는 아닌거같고 React 오류같은데
            해결해주세요
            저는 프론트엔드 개발자가 되고싶어요.</div>
          <div className="flex w-[1100] justify-between mx-[50] absolute bottom-5">
            <button onClick={() => toggleIsComment()} className="flex justify-center items-center gap-2"><IoChatbubbleEllipsesSharp className="!text-2xl" />12</button>
            <div className='flex'>
              <div onClick={() => postAnswer()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border text-sm border-[#D0D0D0]'>답변 작성</div>
              <Link href="/qna">
                <div className='w-[75px] h-[45px] bg-[#444444] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>목록</div>
              </Link>
            </div>
          </div>
        </div>
        {isComment === true ?
          <div className="w-[1200] h-auto mb-10 flex-col bg-white rounded-md mt-12">
            <div className="flex-col justify-between mb-7 mx-[50] pt-9">
              <div>댓글<span className="text-[#0095E8] ml-1">28</span></div>
              <textarea onChange={(e) => PostReplyHandler(e)} className="resize-none w-full border border-[#D0D0D0] bg-[#EBEBEB] rounded-lg h-24 flex justify-start items-start" placeholder="작성할 댓글의 내용을 입력해주세요." />
              <button className="flex justify-end w-full">
                <SendIcon />
              </button>
            </div>
            <>
              {isReply === true ?
                <>
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Reply setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    setPostTagReply={setPostTagReply}
                    postTagReply={postTagReply}
                    PostReplyHandler={PostReplyHandler}
                  />
                  {postTagReply === true ?
                    <>
                      {/* <textarea onChange={(e) => PostReply(e)} className="w-full border border-[#D0D0D0] bg-[#EBEBEB] rounded-lg h-24 flex justify-start items-start" placeholder="작성할 댓글의 내용을 입력해주세요." /> */}
                    </>
                    : <></>}
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Reply setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    setPostTagReply={setPostTagReply}
                    postTagReply={postTagReply}
                    PostReplyHandler={PostReplyHandler}
                  />
                </>
                :
                <>
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />
                  <Comment
                    setPostTagComment={setPostTagComment}
                    setIsReply={setIsReply}
                    toggleTagReply={toggleTagReply}
                    postTagComment={postTagComment}
                    PostReplyHandler={PostReplyHandler}
                  />

                </>
              }
            </>
          </div>
          :
          <div></div>
        }
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
    </div>
  )
}
export default Answer;