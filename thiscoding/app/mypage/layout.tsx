import type { Metadata } from 'next';
import SideTap from '@/shared/layouts/SideTap';

export const metadata: Metadata = {
  title: 'ThisCoding MyPage',
  description: '마이페이지 사용자 정보 페이지',
};

export default function MyPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-100 p-9">
      <SideTap />
      <div>{children}</div>
    </div>
  );
}
