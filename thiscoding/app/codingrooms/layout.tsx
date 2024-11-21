import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "코드방 페이지",
  description: "코드방 에디터 페이지",
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
