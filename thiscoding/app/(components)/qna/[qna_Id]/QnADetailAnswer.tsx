import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PiSirenFill } from "react-icons/pi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const QnADetailAnswer = () => {
  return (
    <>
      <div className="flex-col border-black justfy-center items-center mx-[50] border-y border-collapse">
        <div className="text-xl font-bold"><CheckCircleIcon className="text-[#0095E8]" />채택된 답변</div>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <div className='w-10 h-10 rounded-full border border-black'>사진</div>
            <div>
              <div>코딩왕김코딩</div>
              <div>2024-11-13 20:07:73</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <div className="underline text-[#656565] mr-5">삭제</div>
            <button>
              <PiSirenFill className="text-[#FC7373] !text-xl" />
            </button>
            <button>
              <ThumbUpIcon className='text-[#2F88FF] !text-xl mb-1' /> 13
            </button>
          </div>
        </div>
        <div>오류 메세지도 같이 올려주시면 문제 해결에 더 수월할것 같아요.</div>
        <button className='flex my-3'>
          <IoChatbubbleEllipsesSharp className='!text-2xl mr-1' />13
        </button>
      </div>
    </>
  )
}
export default QnADetailAnswer;