import { Dispatch, SetStateAction } from "react";

interface UserReportModalProps {
  setIsReport: Dispatch<SetStateAction<boolean>>;
}

const UserReportModal = ({ setIsReport }: UserReportModalProps) => {

  return (
    <>
      {/* {isReport === false ? */}
      <div className="w-[400] h-[550] bg-[#FFFFFF] rounded-lg flex-col justify-center items-center">
        <div className="text-[#EA4B48] text-2xl font-bold pt-5 ml-5 border-b pb-5">(피신고자 닉네임)님 신고</div>
        <div className="flex-col justify-center items-center ml-12">
          <div className="flex-col justify-start my-4">
            <div className="mb-2">신고 사유</div>
            <select className="border text-[#999999] border-[#E6E6E6] w-[300] h-[40] px-5 py-2 rounded-md shadow-xl">
              <option value="1">스팸(광고)</option>
              <option value="2">도배</option>
              <option value="3">선정성</option>
              <option value="4">기타</option>
            </select>
          </div>
          <div>
            <div className="mb-2">내용</div>
            <textarea className="border border-[#E6E6E6] resize-none rounded-md w-[300] shadow-lg" cols={30} rows={10}></textarea>
          </div>
          <div className="flex justify-center items-center gap-3 mt-5">
            <button className="bg-[#2388FF] w-[130] h-[45] rounded-full text-white">보내기</button>
            <button onClick={() => setIsReport(false)} className="bg-[#FC7373] w-[130] h-[45] rounded-full text-white">취소</button>
          </div>
        </div>
      </div >
      {/* : <></>} */}
    </>
  )
}
export default UserReportModal;