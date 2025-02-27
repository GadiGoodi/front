'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DraftsIcon from '@mui/icons-material/Drafts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import GroupIcon from '@mui/icons-material/Group';
import { PiSirenFill } from 'react-icons/pi';
import { FaBan } from 'react-icons/fa';
import { RiMegaphoneFill } from 'react-icons/ri';

const SideTap = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const isAdmin = pathname && pathname.includes('admin');

  return (
    <>
      <div className="h-screen flex items-start">
        <div className="bg-white w-[15%] min-w-[170px] h-[70%] border-solid rounded-[10px] shadow">
          <div className="my-[10%]">
            <div className="mx-[10%] text-[20px] my-[10%] font-bold">
              {isAdmin ? '관리자 페이지' : '마이페이지'}
            </div>
            <div className="taps text-[14px] flex-col">
              {/* 사용자 정보 */}
              <div
                className={`h-[40px] flex items-center ${selectedIndex === 0 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                onClick={() => handleClick(0)}
              >
                <div className="mx-[10%] flex">
                  {isAdmin ? (
                    <PiSirenFill fontSize="20px" className="mr-[10px]" />
                  ) : (
                    <PersonIcon fontSize="small" className="mr-[10px]" />
                  )}
                  {isAdmin ? '신고 관리' : '사용자 정보'}
                </div>
              </div>

              {/* 참여 중인 코드방 */}
              <div
                className={`h-[40px] flex items-center ${selectedIndex === 1 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                onClick={() => handleClick(1)}
              >
                <div className="mx-[10%] flex">
                  {isAdmin ? (
                    <FaBan fontSize="20px" className="mr-[10px]" />
                  ) : (
                    <LocalFireDepartmentIcon
                      fontSize="small"
                      className="mr-[10px]"
                    />
                  )}
                  {isAdmin ? '정지 목록' : '참여 중인 코드방'}
                </div>
              </div>

              {/* 초대된 코드방 */}
              <div
                className={`h-[40px] flex items-center ${selectedIndex === 2 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                onClick={() => handleClick(2)}
              >
                <div className="mx-[10%] flex">
                  {isAdmin ? (
                    <RiMegaphoneFill fontSize="20px" className="mr-[10px]" />
                  ) : (
                    <DraftsIcon fontSize="small" className="mr-[10px]" />
                  )}
                  {isAdmin ? '공지사항 관리' : '초대된 코드방'}
                </div>
              </div>

              {/* 관리자는 '작성한 질문 & 답변', '북마크한 질문', '친구' 항목 숨기기 */}
              {!isAdmin && (
                <>
                  <div
                    className={`h-[40px] flex items-center ${selectedIndex === 3 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                    onClick={() => handleClick(3)}
                  >
                    <div className="mx-[10%]">
                      <AssignmentIcon fontSize="small" className="mr-[10px]" />
                      작성한 질문 & 답변
                    </div>
                  </div>

                  <div
                    className={`h-[40px] flex items-center ${selectedIndex === 4 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                    onClick={() => handleClick(4)}
                  >
                    <div className="mx-[10%]">
                      <BookmarkIcon fontSize="small" className="mr-[10px]" />
                      북마크한 질문
                    </div>
                  </div>

                  <div
                    className={`h-[40px] flex items-center ${selectedIndex === 5 ? 'bg-sky-200' : 'hover:bg-sky-100'}`}
                    onClick={() => handleClick(5)}
                  >
                    <div className="mx-[10%]">
                      <GroupIcon fontSize="small" className="mr-[10px]" />
                      친구
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideTap;
