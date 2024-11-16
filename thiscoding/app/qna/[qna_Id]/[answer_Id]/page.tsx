'use client'
import "@/app/globals.css"
import Headers from "@/app/(components)/common/Headers";
import Answer from "@/app/(components)/qna/[qna_Id]/[answer_Id]/Answer";
export default function Home() {
  return (
    <div className="bg-[#EBEBEB]  flex-col">
      <Headers />
      <Answer />
    </div>
  );
}
