'use client';
import SideTap from '@/app/(components)/SideTap';
import Invitations from '@/app/(components)/mypage/invitations/Invitations';
import Headers from '@/app/(components)/common/Headers';
import '@/app/globals.css';

const Page = () => {
  return (
    <div>
      <Headers />
      <div className="bg-neutral-200 h-screen">
        <div className="p-[37px] mx-[50px] flex">
          <SideTap />
          <Invitations />
        </div>
      </div>
    </div>
  );
};

export default Page;
