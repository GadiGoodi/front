import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyPage QnA",
  description: "마이페이지 작성한 QnA",
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
