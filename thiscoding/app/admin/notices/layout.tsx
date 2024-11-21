import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 공지사항 관리 페이지",
  description: "관리자 공지사항에 대한 관리가 가능한 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
