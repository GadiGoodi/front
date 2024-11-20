import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ThisCoding MyPage',
  description: '마이페이지 사용자 정보 페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
