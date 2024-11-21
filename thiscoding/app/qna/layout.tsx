import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThisCoding QnA",
  description: "QnA 질문 답변 목록을 확인 가능한 페이지",
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
