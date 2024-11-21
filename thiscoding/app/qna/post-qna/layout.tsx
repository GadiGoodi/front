import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThisCoding QnA Posting",
  description: "QnA 질문 작성 페이지",
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
