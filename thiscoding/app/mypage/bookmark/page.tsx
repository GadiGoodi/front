'use client'
import "@/app/globals.css"
import SideTap from "@/app/(components)/SideTap";
import Headers from "@/app/(components)/common/Headers";
import BookMarkQnA from "@/app/(components)/mypage/bookmark/BookMarkQnA";
export default function Home() {
  return (
    <div>
      <Headers />
      <div className="flex">
        <SideTap />
        <BookMarkQnA />
      </div>
    </div>
  );
}
