'use client'
import { PiSirenFill } from "react-icons/pi";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Link from "next/link";
import QnADetailAnswer from "./QnADetailAnswer";
import { useState } from "react";
import UserReportModal from "../../common/UserReportModal";
import AdminDeleteModal from "../../common/AdminDeleteModal";



const QnADetail = () => {


  const [isAnswer, setIsAnswer] = useState(false);
  const [isBookMark, setIsBookMark] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isAdminDelete, setIsAdminDelete] = useState(false);

  const toggleIsAnswer = () => {
    setIsAnswer(!isAnswer);
  }

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
                <div className="w-[120] h-[30] bg-[#0095E8] flex justify-center items-center text-white rounded-full">JavaScript</div>
                <div>VSCODE 자동입력</div>
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
            <button onClick={() => toggleIsAnswer()} className="flex justify-center items-center gap-2"><IoChatbubbleEllipsesSharp className="!text-2xl" />12</button>
            <div className='flex'>
              <div onClick={() => postAnswer()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border text-sm border-[#D0D0D0]'>답변 작성</div>
              <Link href="/qna">
                <div className='w-[75px] h-[45px] bg-[#444444] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>목록</div>
              </Link>
            </div>
          </div>
        </div>
        {isAnswer === true ?
          <div className="w-[1200] h-[1000] mb-10 flex-col bg-white rounded-md mt-12">
            <div className="flex justify-between mb-7 mx-[50] pt-9">
              <div>답변<span className="text-[#0095E8] ml-1">10</span></div>
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
export default QnADetail;