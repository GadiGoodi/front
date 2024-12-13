import Link from "next/link";
import "@/app/globals.css"
import { useEffect, useState } from "react";
import PostQnAContent from "./PostQnAContent";
import usePostQna from "@/app/(hooks)/mypage/post-qna/usePostQna";
import { useParams } from "next/navigation";
const PostQnA = () => {

  const params = useParams();

  const { fetchQnaList, postQnaList } = usePostQna();

  useEffect(() => {
    // fetchQnaList(Number(params.qna_Id)) << 나중에 memberId로 대체
    fetchQnaList(1)
  }, [])

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB]">
        <div className="w-[100] flex justify-between font-extrabold mt-7 ml-[50] mb-5">
          <Link href="#">
            <div
              className={`h-[40px] flex items-center ${selectedIndex === 0 ? 'border-b-2 border-[#0095E8]' : 'border-none'}`}
              onClick={() => handleClick(0)}
            >
              질문
            </div>
          </Link>
          <Link href="#">
            <div
              className={`h-[40px] flex items-center ${selectedIndex === 1 ? 'border-b-2 border-[#0095E8]' : 'border-none'}`}
              onClick={() => handleClick(1)}
            >
              답변
            </div>
          </Link>
        </div>
        <div className="border-b border-black mx-[50]" />
        {postQnaList.map(qna => (
          <PostQnAContent
            key={qna.id}
            qna={qna}
          />
        ))}
      </div>
    </>
  )
}
export default PostQnA;