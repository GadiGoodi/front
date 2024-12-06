import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Editor } from "@toast-ui/react-editor"
import useQnA from "@/app/(hooks)/qna/useQnA";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const ToastUi = dynamic(() => import("@/app/(components)/qna/post-qna/ToastUi"), { ssr: false });


const UserPostQnA = () => {
  const router = useRouter();
  const { setLanguage, setTitle, createQnA, data, markDown, content, setMarkDown, setContent } = useQnA();

  const editorRef = useRef<Editor>()

  const onChangeEditor = useCallback(() => {
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();
    const html = editorRef.current.getInstance().getHTML();
    console.log('markdown', markdown);
    console.log('html', html);
    setMarkDown(markdown);
    setContent(html);
  }, []);

  const postQnaSwal = () => {
    onChangeEditor()

    Swal.fire({
      title: 'QnA를 작성하시겠습니까?',
      text: '확인버튼을 누르면 작성이 완료됩니다.',
      icon: 'warning',
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '작성', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    }).then(result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
        content ? data.content = content : data.content = markDown
        console.log(data);
        // createQnA();
        Swal.fire('QnA 작성이 완료되었습니다.');
        router.push('/qna')
      }
    });
  }


  return (
    <>
      <div className="flex-col w-full justify-center items-center relative bg-blue">
        <div className="mt-5 w-full bg-[#0095E8]/20 h-[100] flex justify-start items-center  pl-12 font-bold text-3xl">
          <div>질문 작성</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-[950] h-[600] flex justify-center items-center relative">
            <div className="flex gap-5 absolute top-5">
              <div className="flex-col">
                <div>카테고리</div>
                <select
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border w-[300] h-[40] px-5 py-2 rounded-md shadow-lg" defaultValue="선택">
                  <option value="JavaScript / TypeScript">JavaScript / TypeScript</option>
                  <option value="HTML / CSS">HTML / CSS</option>
                  <option value="Phython">Phython</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="C#">C#</option>
                  <option value="Java">Java</option>
                  <option value="PHP">PHP</option>
                  <option value="SQL">SQL</option>
                  <option value="R">R</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Go">Go</option>
                  <option value="Swift">Swift</option>
                </select>
              </div>
              <div className="flex-col">
                <div>제목</div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="border w-[600] h-[40] px-5 py-2 rounded-md shadow-lg"
                  type="text"
                  placeholder="제목을 입력해주세요"
                />
              </div>
            </div>
            <div className="h-[400px] w-[920px]">
              <ToastUi editorRef={editorRef} onChangeEditor={onChangeEditor} />
            </div>
          </div>
        </div>
        <div className='absolute bottom-8 right-12 flex'>
          <div onClick={() => postQnaSwal()} className='w-[75px] h-[45px] shadow-xl bg-[#0095E8] mr-5 text-white flex justify-center items-center rounded-2xl border border-[#D0D0D0]'>작성</div>
          <Link href="/qna">
            <div className='w-[75px] h-[45px] bg-[#FF7262] border text-white flex justify-center items-center rounded-2xl border-1 border-[#D0D0D0] shadow-xl'>취소</div>
          </Link>
        </div>

      </div>
    </>
  )
}
export default UserPostQnA;
