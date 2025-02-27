import type { Metadata } from 'next';
import SideTap from '@/shared/layouts/SideTap';

export const metadata: Metadata = {
  title: '관리자 페이지',
  description: '관리자 메인 페이지',
};

export default function Notices({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-100 p-[37px]">
      <SideTap />
      <div>{children}</div>
    </div>
  );
}
