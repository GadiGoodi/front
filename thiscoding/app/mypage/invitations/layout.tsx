import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyPage 초대된 코드방',
  description: '마이페이지 초대된 코드방',
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
