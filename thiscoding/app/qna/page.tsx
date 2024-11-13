'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import QnA from "../(components)/qna/QnA";
export default function Home() {
  return (
    <div className="bg-white h-[1500]">
      <Headers />
      <QnA />
    </div>
  );
}
