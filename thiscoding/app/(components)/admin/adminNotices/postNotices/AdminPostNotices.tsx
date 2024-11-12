import Link from "next/link";

const AdminNoticesPost = () => {
  const postAdminNotices = () => {
    // 관리자 공지사항 작성 api
  }

  return (
    <>
      <div className="flex-col justify-center items-center relative">
        <div className="mt-5 w-full bg-[#0095E8]/20 h-[100] flex justify-start items-center  pl-12 font-bold text-3xl">
          <div>공지사항 작성</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-[950] h-[600] flex justify-center items-center relative">
            <div className="flex gap-5 absolute top-5">
              <div className="flex-col">
                <div>카테고리</div>
                <select className="border w-[200] h-[40] px-5 py-2 rounded-md shadow-xl" defaultValue="선택">
                  <option value="1">FAQ</option>
                  <option value="2">개인정보</option>
                  <option value="3">이용약관</option>
                  <option value="4">회원정책</option>
                  <option value="5">신고/정지</option>
                  <option value="6">공지</option>
                </select>
              </div>
              <div className="flex-col">
                <div>제목</div>
                <input
                  className="border w-[500] h-[40] px-5 py-2 rounded-md shadow-xl"
                  type="text"
                  placeholder="제목을 입력해주세요"
                />
              </div>
            </div>
            <textarea cols={40} rows={80} className="w-[720] h-[400] rounded-xl shadow-xl resize-none" />
          </div>
        </div>
        <div className='absolute bottom-8 right-12 flex'>
          <div onClick={() => postAdminNotices()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border border-[#D0D0D0]'>작성</div>
          <Link href="/admin/notices">
            <div className='w-[75px] h-[45px] bg-[#FF7262] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>취소</div>
          </Link>
        </div>
      </div>
    </>
  )
}
export default AdminNoticesPost;