import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PostQnAContent = () => {
  return (
    <>
      <div className="flex-col border-b border-black border-collapse mx-[50] h-[80]">
        <div className='flex justify-between mx-4 mt-3'>
          <div className='flex gap-4'>
            <div className='text-white w-[70] h-[25] flex justify-center items-center rounded-full bg-[#444444]'>Java</div>
            <div>정처기23년 2회, C언어 정렬</div>
            <div className="text-center"><CheckCircleIcon className="text-[#0095E8]" /><CheckCircleOutlineIcon className="text-[#EBEBEB]" /></div>
          </div>
          <div>2024-11-11 20:36:48</div>
        </div>
        <div className='text-xs mt-2 mx-4 flex justify-between'>
          <div>안녕하세요. 정수형 변수에 소수값을 저장해서 출력 시 오류가 발생하는 것은 이해가 되지만 float b = 3.4의 값을 저장해 System.out ...</div>
          <div className='flex gap-3'>
            <div><RemoveRedEyeIcon /> 140</div>
            <div><ThumbUpIcon className='text-[#2F88FF]' /> 13</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostQnAContent;