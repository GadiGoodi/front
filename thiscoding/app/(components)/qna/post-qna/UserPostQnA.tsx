import Link from "next/link";

const UserPostQnA = () => {
  const postQnAHandler = () => {
    // QnA 작성 api
  }

  return (
    <>
      <div className="flex-col w-full justify-center items-center relative">
        <div className="mt-5 w-full bg-[#0095E8]/20 h-[100] flex justify-start items-center  pl-12 font-bold text-3xl">
          <div>질문 작성</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-[950] h-[600] flex justify-center items-center relative">
            <div className="flex gap-5 absolute top-5">
              <div className="flex-col">
                <div>카테고리</div>
                <select className="border w-[300] h-[40] px-5 py-2 rounded-md shadow-lg" defaultValue="선택">
                  <option value="1">JavaScript / TypeScript</option>
                  <option value="2">HTML / CSS</option>
                  <option value="3">Phython</option>
                  <option value="4">C</option>
                  <option value="5">C++</option>
                  <option value="6">C#</option>
                  <option value="7">Java</option>
                  <option value="8">PHP</option>
                  <option value="9">SQL</option>
                  <option value="10">R</option>
                  <option value="11">Ruby</option>
                  <option value="12">Go</option>
                  <option value="13">Swift</option>
                </select>
              </div>
              <div className="flex-col">
                <div>제목</div>
                <input
                  className="border w-[600] h-[40] px-5 py-2 rounded-md shadow-lg"
                  type="text"
                  placeholder="제목을 입력해주세요"
                />
              </div>
            </div>
            <textarea cols={40} rows={80} className="w-[920] h-[400] rounded-xl  shadow-2xl resize-none" />
          </div>
        </div>
        <div className='absolute bottom-8 right-12 flex'>
          <div onClick={() => postQnAHandler()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border border-[#D0D0D0]'>작성</div>
          <Link href="/qna">
            <div className='w-[75px] h-[45px] bg-[#FF7262] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>취소</div>
          </Link>
        </div>
      </div>
    </>
  )
}
export default UserPostQnA;