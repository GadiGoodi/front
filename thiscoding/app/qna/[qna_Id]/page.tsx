'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import QnADetail from "@/app/(components)/qna/[qna_Id]/QnADetail";
export default function Home() {
  return (
    <div className="bg-[#EBEBEB]  flex-col">
      <Headers />
      <QnADetail />
    </div>
  );
}
