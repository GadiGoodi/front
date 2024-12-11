import { PostQnaType } from '@/app/(models)/users/PostQnaType';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PostQnAContent = ({ qna }: { qna: PostQnaType }) => {
  return (
    <>
      <div className="flex-col border-b border-black border-collapse mx-[50] h-[80]">
        <div className='flex justify-between mx-4 mt-3'>
          <div className='flex gap-4'>
            <div className='text-white w-[70] h-[25] flex justify-center items-center rounded-full bg-[#444444]'>{qna.language}</div>
            <div>{qna.title}</div>
            <div className="text-center">
              {qna.isSelected === true ? <CheckCircleIcon className="text-[#0095E8]" />
                : <CheckCircleOutlineIcon className="text-[#EBEBEB]" />}
            </div>
          </div>
          <div>{qna.createDate}</div>
        </div>
        <div className='text-xs mt-2 mx-4 flex justify-between'>
          <div>{qna.content}</div>
          <div className='flex gap-3'>
            <div><RemoveRedEyeIcon /> {qna.viewCount}</div>
            <div><ThumbUpIcon className='text-[#2F88FF]' /> {qna.likeCount}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostQnAContent;