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
import SignUp from '@/app/(components)/common/modals/SignUp';
import Login from '@/app/(components)/common/modals/LogIn';
import FindPassword from './(components)/common/modals/FindPassword';
import useModalStore from '@/app/store/store';
import Modal from '@/app/(components)/common/ModalManager';

export default function Home() {
  const top10Items = Array(10).fill(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    arrows: false,
    speed: 10000,
    cssEase: 'linear',
  };

  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const { openModal } = useModalStore();
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
          <button onClick={() => openModal('login')}>로그인 모달 테스트</button>
          <Modal />

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
