import "@/app/globals.css"
import AdminNoticesContent from "./AdminNoticesContent";
import Link from "next/link";
const AdminNotices = () => {
  return (
    <>
      <>
        <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB] relative">
          <div className="absolute flex justify-end mt-3 right-[50] w-full font-thin">개별 문의 : abc123@naver.com</div>
          <table className="w-[850] ml-[50] mt-12 mr-[50]">
            <thead>
              <tr className="border-t border-b border-black h-[50px]">
                <th className="px-4 py-2 align-middle">카테고리</th>
                <th className="px-4 py-2 align-middle w-[380]">제목</th>
                <th className="px-4 py-2 align-middle w-[200]">날짜</th>
                <th className="px-4 py-2 align-middle">조회수</th>
                <th className="px-4 py-2 align-middle">삭제</th>
              </tr>
            </thead>
            <tbody>
              <AdminNoticesContent />
              <AdminNoticesContent />
              <AdminNoticesContent />
              <AdminNoticesContent />
            </tbody>
          </table>
          <Link href="#" className="w-[90] h-[40] border rounded-2xl flex justify-center items-center border-black absolute right-[50] bottom-[30] text-[#0095E8]">
            글쓰기
          </Link>
        </div>
      </>
    </>
  )
}
export default AdminNotices;