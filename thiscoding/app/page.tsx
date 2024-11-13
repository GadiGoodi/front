import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Top10 from '@/app/(components)/Top10';
import Headers from '@/app/(components)/common/Headers';
import Footers from '@/app/(components)/common/Footer';
import bannerImage from '@/public/asset/banner.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Home() {
  const top10Items = [1, 2, 3, 4, 5];

  return (
    <div>
      <Headers />

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

      <div className="flex justify-center space-x-10 m-10">
        {top10Items.map((_, index) => (
          <Top10 key={index} />
        ))}
      </div>

      <div className="m-10 flex items-center">
        <div className="w-[60%] mr-10">
          <span className="text-[#0095E8] font-bold text-2xl">1만명</span>
          <span className="text-2xl">이 THISCODING;과 함께합니다.</span>
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
