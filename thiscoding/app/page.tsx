'use client';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Top10 from '@/app/(components)/Top10';
import Headers from '@/app/(components)/common/Headers';
import Footers from '@/app/(components)/common/Footer';
import bannerImage from '@/public/asset/banner.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ScrollUp from './(components)/common/ScrollUp';
import Chatting from './(components)/common/Chatting';
import Slider from 'react-slick';
import SignUp from './(components)/common/SignUp';
import Login from './(components)/common/LogIn';

export default function Home() {
  const top10Items = Array(10).fill(null);

  const sliderSettings = {
    dots: false, // 하단 점 표시
    infinite: true, // 무한 반복
    slidesToShow: 5, // 한 번에 표시할 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어갈 슬라이드 개수
    autoplay: true, // 자동 재생
    autoplaySpeed: 2000, // 자동 재생 속도 (ms)
    pauseOnHover: true, // 마우스 오버 시 일시 정지
    arrows: false, // 화살표 표시
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<'login' | 'signup'>('login');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleModal = () => {
    setCurrentModal(currentModal === 'login' ? 'signup' : 'login');
  };

  return (
    <div>
      <Headers />
      <ScrollUp />
      <Chatting />
      <Image
        src={bannerImage}
        alt="Banner"
        layout="responsive"
        width={1200}
        height={500}
      />

      <div className="m-10 flex justify-between items-center">
        <div>
          <span className="text-[#0095E8]">실시간 </span>
          <span>질문 & 답변 TOP 10</span>
        </div>
        <Link href="/qna" className="flex items-center gap-2">
          <span>더보기</span>
          <ArrowForwardIosIcon className="text-[#0095E8] text-lg" />
        </Link>
      </div>

      <div className="m-10">
        <Slider {...sliderSettings}>
          {top10Items.map((_, index) => (
            <div key={index} className="px-2">
              <Top10 />
            </div>
          ))}
        </Slider>
      </div>

      <div className="m-10 flex items-center">
        <div className="w-[60%] mr-10">
          <span className="text-[#0095E8] font-bold text-2xl">1만명</span>
          <span className="text-2xl">이 THISCODING;과 함께합니다.</span>

          <div className="">
            <button onClick={openModal} className="bg-blue-500">
              모달 테스트....
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              {currentModal === 'login' ? (
                <Login onClose={closeModal} toggleModal={toggleModal} />
              ) : (
                <SignUp onClose={closeModal} toggleModal={toggleModal} />
              )}
            </div>
          )}

          <div className="my-10">
            THISCODING;은 ‘실시간으로 코드를 수정하며 의논할 수는 없을까?’ 라는
            생각에서 시작되었습니다.
          </div>
          <div className="my-10">
            실제로 많은 개발자들이 같은 고민에 공감하며 THISCODING;을 이용하고
            있습니다.
          </div>
          <div className="my-10">
            코드에 대한 질문과 답변을 통해 지식을 공유해보세요.
          </div>
        </div>

        <div className="w-[70%] flex gap-5">
          <Image
            src="/asset/mainImg.png"
            alt="Main Image"
            layout="responsive"
            width={600}
            height={400}
            className="object-cover w-1/2"
          />
          <Image
            src="/asset/mainImg.png"
            alt="Main Image"
            layout="responsive"
            width={600}
            height={400}
            className="object-cover w-1/2"
          />
        </div>
      </div>

      <Footers />
    </div>
  );
}
