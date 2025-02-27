'use client';

import Link from 'next/link';
import ReportContent from './ReportContent';

import { useState } from 'react';

const Report = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB]">
        <div className="w-[200] flex justify-between font-extrabold mt-7 ml-[50]">
          <Link href="#">
            <div
              className={`h-[40px] flex items-center ${selectedIndex === 0 ? 'border-b-2 border-[#0095E8]' : 'border-none'}`}
              onClick={() => handleClick(0)}
            >
              전체
            </div>
          </Link>
          <Link href="#">
            <div
              className={`h-[40px] flex items-center ${selectedIndex === 1 ? 'border-b-2 border-[#0095E8]' : 'border-none'}`}
              onClick={() => handleClick(1)}
            >
              처리
            </div>
          </Link>
          <Link href="#">
            <div
              className={`h-[40px] flex items-center ${selectedIndex === 2 ? 'border-b-2 border-[#0095E8]' : 'border-none'}`}
              onClick={() => handleClick(2)}
            >
              미처리
            </div>
          </Link>
        </div>
        <table className="w-[850] mx-[50] mt-5">
          <thead>
            <tr className="border-t border-b border-black h-[50px]">
              <th className="px-4 py-2 align-middle">신고 사유</th>
              <th className="px-4 py-2 align-middle">신고 내용</th>
              <th className="px-4 py-2 align-middle">신고자</th>
              <th className="px-4 py-2 align-middle">신고 날짜</th>
              <th className="px-4 py-2 align-middle">신고 처리</th>
            </tr>
          </thead>
          <tbody>
            <ReportContent />
            <ReportContent />
            <ReportContent />
            <ReportContent />
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Report;
