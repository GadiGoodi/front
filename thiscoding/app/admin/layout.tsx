import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 페이지",
  description: "관리자 메인 페이지",
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
