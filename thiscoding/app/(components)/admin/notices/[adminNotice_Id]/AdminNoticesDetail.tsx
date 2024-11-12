import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';

const AdminNoticesDetail = () => {
  const deleteAdminNotices = () => {
    //관리자 공지사항 삭제 api
  }

  return (
    <>
      <div className="w-[1250] h-[700] mt-10 bg-[#FFFFFF] rounded-2xl flex justify-center items-center relative">
        <div className="flex-col ml-16 absolute top-[50]">
          <div className="h-[90]">
            <div className="flex gap-4">
              <div className='text-white w-[70] h-[25] flex justify-center items-center rounded-full bg-[#444444]'>FAQ</div>
              <div>자주 묻는 질문</div>
            </div>
            <div className="flex gap-4 mt-2">
              <div>관리자 | 2024.09.30</div>
              <div className='mb-1 flex justify-center items-center'><RemoveRedEyeIcon />140</div>
            </div>
          </div>
          <div className="w-[80%]">
            <div>이메일로 개별 문의가 많이 온 질문들을 선별해서 Q&A를 작성해보았습니다! <br />
              1.이메일 계정을 변경하고 싶어요.
              👉 저희 서비스는 이메일 계정 변경이 불가능합니다. 따라서 현재 사용하고 있는 이메일과 다른 이메일을 사용하여 새로 가입을 해주시거나,
              현재 계정의 이메일을 그대로 사용하고 싶으시다면 회원 탈퇴 후 1주일 후 동일한 이메일로 재가입해주시면 됩니다.</div>
          </div>
        </div>
        <Link href="/admin/notices">
          <div className='bg-[#444444] text-white w-[75] h-[50] flex justify-center items-center rounded-2xl absolute bottom-8 right-8'>목록</div>
        </Link>
        <div className='absolute top-8 right-12 flex'>
          <Link href="#">
            <div className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border border-[#D0D0D0]'>수정</div>
          </Link>
          <div onClick={() => deleteAdminNotices()} className='w-[75px] h-[45px] bg-[#FF7262] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>삭제</div>
        </div>
      </div>
    </>
  )
}
export default AdminNoticesDetail;