import useAdmin from '@/app/(hooks)/admin/useAdmin';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const postNoticesDetail = () => {
  const { postNoticesDetail, AdminNoticesDetail, removeAdminNotices } = useAdmin();
  const params = useParams();

  useEffect(() => {
    AdminNoticesDetail(Number(params.adminNotice_Id));
  }, [])


  return (
    <>
      <div className="w-[1250] h-[700] mt-10 bg-[#FFFFFF] rounded-2xl flex justify-center items-center relative">
        <div className="flex-col ml-16 absolute top-[50] left-[40]">
          <div className="h-[90]">
            <div className="flex gap-4">
              <div className='text-white w-[70] h-[25] flex justify-center items-center rounded-full bg-[#444444]'>{postNoticesDetail?.category}</div>
              <div>{postNoticesDetail?.title}</div>
            </div>
            <div className="flex gap-4 mt-2">
              <div>관리자</div>
              <div className='mb-1 flex justify-center items-center'><RemoveRedEyeIcon />{postNoticesDetail?.viewCount}</div>
            </div>
          </div>
          <div className="w-[80%] absolute top-[100]">
            <div>{postNoticesDetail?.content}</div>
          </div>
        </div>
        <Link href="/admin/notices">
          <div className='bg-[#444444] text-white w-[75] h-[50] flex justify-center items-center rounded-2xl absolute bottom-8 right-8'>목록</div>
        </Link>
        <div className='absolute top-8 right-12 flex'>
          <Link href={`/admin/notices/post-notices?notices-Id=${Number(params.adminNotice_Id)}`}>
            <div className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border border-[#D0D0D0]'>수정</div>
          </Link>
          <Link href="/admin/notices">
            <div onClick={() => removeAdminNotices(Number(params.adminNotice_Id))} className='w-[75px] h-[45px] bg-[#FF7262] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>삭제</div>
          </Link>
        </div>
      </div>
    </>
  )
}
export default postNoticesDetail;