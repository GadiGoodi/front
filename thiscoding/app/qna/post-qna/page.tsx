'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import UserPostQnA from "@/app/(components)/qna/post-qna/UserPostQnA";
export default function Home() {
  return (
    <div className="bg-white h-auto">
      <Headers />
      <UserPostQnA />
    </div>
  );
}
