import Link from "next/link";
import NoticesContent from "./NoticesContent";

const Notices = () => {
  return (
    <div className="flex-col flex justify-center items-center ">
      <div className="mt-5 w-full bg-[#0095E8]/20 h-[100] flex-col justify-center items-center pl-12 font-bold text-3xl">
        <div>고객센터</div>
        <br />
        <div className="text-sm">아무나 도와줘요...모르겠어요..</div>
      </div>
      <div className="w-[950] h-[650] bg-[#FFFFFF] rounded-2xl mt-5 border-[#EBEBEB] relative">
        <div className="flex justify-end w-full h-[30] pr-7 pt-5 font-thin">개별 문의 : abc123@naver.com</div>
        <table className="w-[850] ml-[50] mt-5">
          <thead >
            <tr className="border-t border-b border-black h-[50px]">
              <th className="px-4 py-2 align-middle">카테고리</th>
              <th className="px-4 py-2 align-middle w-[380]">제목</th>
              <th className="px-4 py-2 align-middle w-[200]">날짜</th>
              <th className="px-4 py-2 align-middle">조회수</th>
            </tr>
          </thead>
          <tbody>
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
            <NoticesContent />
          </tbody>
        </table>
        <Link href="#" className="w-[90] h-[40] border rounded-2xl flex justify-center items-center border-black absolute right-[50] bottom-[30] text-[#0095E8]">
          글쓰기
        </Link>
      </div>
    </div>
  )
}
export default Notices;