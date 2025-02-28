'use client';

import { useState } from 'react';
import CodingroomsModal from '@/entities/codingrooms/ui/CodingroomsModal';
import Link from 'next/link';
import UserStore from '@/shared/store/store';

const NavMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const coderoomOpenModal = () => setIsModalOpen(!isModalOpen);
  const { isLoggedIn, isAdmin } = UserStore();

  return (
    <>
      <button onClick={coderoomOpenModal} className="hover:text-[#0095E8]">
        코드방 생성
      </button>
      {isModalOpen && <CodingroomsModal />}

      <Link href="/qna" className="hover:text-[#0095E8]">
        질문 & 답변
      </Link>
      <Link href="/notices" className="hover:text-[#0095E8]">
        고객센터
      </Link>
      {isLoggedIn() ? (
        isAdmin() ? (
          <Link href="/admin" className="hover:text-[#0095E8]">
            관리자페이지
          </Link>
        ) : (
          <Link href="/mypage" className="hover:text-[#0095E8]">
            마이페이지
          </Link>
        )
      ) : null}
    </>
  );
};

export default NavMenu;
