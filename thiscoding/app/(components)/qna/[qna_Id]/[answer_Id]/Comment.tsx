import { PiSirenFill } from "react-icons/pi";
import ReplyIcon from '@mui/icons-material/Reply';
import { Dispatch, SetStateAction } from "react";

interface ReplyType {
  setIsReply: Dispatch<SetStateAction<boolean>>;
}
const Comment = ({ setIsReply }: ReplyType) => {



  return (
    <>
      <div className="flex-col border-black justfy-center items-center mx-[50] border-y border-collapse">
        <div className='flex justify-between items-center mt-2'>
          <div className='flex'>
            <div className='w-10 h-10 rounded-full border border-black'>사진</div>
            <div className='flex gap-5 justify-center items-center'>
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
              <ReplyIcon className='!text-xl mb-1' />
            </button>
          </div>
        </div>
        <div>오류 메세지도 같이 올려주시면 문제 해결에 더 수월할것 같아요.</div>
        <button onClick={() => setIsReply(true)} className='flex my-3'>
          - 답글 n개 더보기
        </button>
      </div>
    </>
  )
}
export default Comment;