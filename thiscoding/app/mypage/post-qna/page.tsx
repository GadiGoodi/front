'use client'
import "@/app/globals.css"
import SideTap from "@/app/(components)/SideTap";
import Headers from "@/app/(components)/common/Headers";
import PostQnA from "@/app/(components)/mypage/qna/PostQnA";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <PostQnA />
      </div>
    </div>
  );
}
