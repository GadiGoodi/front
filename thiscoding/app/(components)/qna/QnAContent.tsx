import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import { QnaListType } from '@/app/(models)/qna/QnaListType';
import { useRouter } from 'next/navigation';
const QnAContent = ({ qna }: { qna: QnaListType }) => {
  const router = useRouter();
  const QnaDetailRouter = () => {
    router.push(`/qna/${qna.id}`)
  }
  return (
    <>
      <div className="flex-col border-b w-[900] border-black border-collapse h-[80]" onClick={QnaDetailRouter}>
        <div className='flex justify-between mx-4 mt-3'>
          <div className='flex gap-4'>
            <div className='text-white w-[70] h-[25] flex justify-center items-center rounded-full bg-[#444444]'>{qna.language}</div>
            <div>{qna.title}</div>
            <div className="text-center"><CheckCircleIcon className="text-[#0095E8]" /></div>
          </div>
          <div>{qna.createDate}</div>
        </div>
        <div className='text-xs mt-2 mx-4 flex justify-start'>
          <div>{qna.content}
          </div>
        </div>
        <div className='flex justify-between text-xs mx-4'>
          <div className='flex gap-5 mt-2 text-gray-400'>
            <div>{qna.userId}</div>
            <div>{qna.createDate}</div>
          </div>
          <div className='flex gap-3'>
            <div><RemoveRedEyeIcon /> {qna.viewCount}</div>
            <div><ChatIcon /> {qna.answerCount}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default QnAContent;