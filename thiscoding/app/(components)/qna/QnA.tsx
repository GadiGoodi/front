import { useState } from "react";
import QnAContent from "./QnAContent";
import Link from "next/link";

const QnA = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [selectedIndexQnA, setSelectedIndexQnA] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClickQnA = (index: number) => {
    setSelectedIndexQnA(index);
  };
  return (
    <div className="flex-col">
      <div className="mt-5 w-full bg-[#0095E8]/20 h-[100] flex-col justify-evenly items-center pl-12 font-bold text-3xl">
        <div>질문 & 답변</div>
        <br />
        <div className="text-sm">아무나 도와줘요...모르겠어요..</div>
      </div>
      <div className="flex ml-[150] my-5 w-[20%] justify-between">
        <div
          className={`flex items-center ${selectedIndex === 0 ? 'text-[#0095E8]' : 'text-black'}`}
          onClick={() => handleClick(0)}
        >전체</div>
        <div
          className={`flex items-center ${selectedIndex === 1 ? 'text-[#0095E8]' : 'text-black'}`}
          onClick={() => handleClick(1)}
        >채택</div>
        <div
          className={`flex items-center ${selectedIndex === 2 ? 'text-[#0095E8]' : 'text-black'}`}
          onClick={() => handleClick(2)}
        >미채택</div>
      </div>

      <div className="border-t border-0.5 border-black my-7" />

      <div className="w-full flex justify-center items-center">
        <div className="flex-col">
          <div className="w-[1200] flex justify-between">
            <select className="border w-[200] h-[40] px-5 py-2 rounded-md shadow-xl border-black">
              <option value="1">Java</option>
              <option value="2">Python</option>
              <option value="3">C</option>
              <option value="4">C++</option>
              <option value="5">JavaScript</option>
            </select>
            <select className="border w-[170] h-[40] px-5 py-2 rounded-md shadow-xl border-black">
              <option value="1">제목</option>
              <option value="2">내용</option>
              <option value="3">작성자</option>
              <option value="4">작성 날짜</option>
              <option value="5">채택된 QnA</option>
              <option value="6">공지</option>
            </select>
            <input type="text" className="rounded-lg shadow-xl w-[700] border-black border" />
            <button className="w-[90] h-[40] rounded-xl bg-[#0095E8] flex justify-center items-center text-white">검색</button>
          </div>
          <div className="w-[1200] flex justify-between items-center my-5">
            <div className="flex gap-8">
              <div
                className={`flex items-center ${selectedIndexQnA === 0 ? 'text-[#0095E8]' : 'text-black'}`}
                onClick={() => handleClickQnA(0)}
              >최신순</div>
              <div
                className={`flex items-center ${selectedIndexQnA === 1 ? 'text-[#0095E8]' : 'text-black'}`}
                onClick={() => handleClickQnA(1)}
              >조회순</div>
              <div
                className={`flex items-center ${selectedIndexQnA === 2 ? 'text-[#0095E8]' : 'text-black'}`}
                onClick={() => handleClickQnA(2)}
              >답변순</div>
            </div>
            <Link href="#">
              <div className="w-[90] h-[40] rounded-xl border border-black flex justify-center items-center text-[#0095E8]">글쓰기</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[1200] h-full flex justify-between">
          <div className="flex-col justify-between h-full">
            <div className="w-[250] h-[230] border border-[#EBEBEB] shadow-xl rounded-lg pt-3 pl-3 mb-5">실시간 인기 검색어</div>
            <div className="w-[250] h-[340] border border-[#EBEBEB] shadow-xl rounded-lg pt-3 pl-3">인기 답변 TOP 10</div>
          </div>
          <div>
            <div className="border-t border-0.5 border-black w-full" />
            <QnAContent />
            <QnAContent />
            <QnAContent />
            <QnAContent />
            <QnAContent />
            <QnAContent />
            <QnAContent />
            <QnAContent />
          </div>
        </div>
      </div>
    </div>
  )
}
export default QnA;
