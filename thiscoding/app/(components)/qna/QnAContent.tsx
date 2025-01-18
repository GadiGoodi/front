import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import { QnaListType } from '@/app/(models)/qna/QnaListType';
import { useRouter } from 'next/navigation';
import { Viewer } from '@toast-ui/react-editor';
import "@/app/(components)/qna/viewer.css"
const QnAContent = ({ qna }: { qna: QnaListType }) => {
  const router = useRouter();
  const QnaDetailRouter = () => {
    router.push(`/qna/${qna.qnaId}`)
  }

  return (
    <>
      <div className="list-page flex-col border-b w-[900] border-black border-collapse h-[80]" onClick={QnaDetailRouter}>
        <div className='flex justify-between mx-4 mt-3'>
          <div className='flex gap-4'>
            <div className='text-white min-w-[70] p-2 w-auto h-[25] flex justify-center items-center rounded-full bg-[#444444]'>{qna.language}</div>
            <div>{qna.title}</div>
            <div className="text-center"><CheckCircleIcon className="text-[#0095E8]" /></div>
          </div>
        </div>
        <div className='text-xs mt-2 mx-4 h-[20] flex justify-start '>
          <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
            <Viewer
              width="100%"
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              initialValue={qna.content}
              theme="dark"
              className="text-xs p-0 m-0"
            />
            {/* {qna.content} */}
          </div>
        </div>
        <div className='flex justify-between text-xs mx-4'>
          <div className='flex gap-5 mt-2 text-gray-400'>
            <div>{qna.nickname}</div>
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