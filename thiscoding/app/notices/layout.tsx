import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThisCoding Notices",
  description: "고객센터 공지사항이 확인 가능한 페이지",
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
