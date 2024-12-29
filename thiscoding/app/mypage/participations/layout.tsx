import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPage 참여 중인 코드방",
  description: "마이페이지 참여 중인 코드방",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      {children}
    </div>
  );
}
