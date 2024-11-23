'use client';
// Next.js 13 이상에서는 React 서버 컴포넌트와 클라이언트 컴포넌트를 구분
// 기본적으로 모든 파일은 서버 컴포넌트로 취급
// useEffect와 같은 클라이언트 전용 훅은 클라이언트 컴포넌트에서만 작동함
// 따라서 이러한 훅을 사용하려면 해당 파일이 클라이언트에서 렌더링되어야 함을 명시해야 함
// 파일 상단에 "use client"; 지시어를 추가하여 해당 파일이 클라이언트 컴포넌트임을 명시

import '@/app/globals.css';
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CodingroomsModal = () => {
  // 모달 토글 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <>
      {isModalOpen && (
        <div className="z-10 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
          {/* 코드방 생성 모달 클릭 시. 기본 배경에 씌워지는 불투명한 레이아웃 */}
          <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
            {/*
                    h-screen: 높이를 전체 높이로
                    w-full: 너비를 전체 너비로
                    fixed: 위치를 고정
                    left-0: 왼쪽 위치를 왼쪽 가장자리(0)로
                    top-0: 상단 위치를 위쪽 가장자리(0)로
                    flex: 내부 요소들을 플렉스 아이템으로
                    justify-center: 플렉스 컨테이너 내 요소들을 가로 중앙 정렬
                    items-center: 플렉스 컨테이너 내 요소들을 세로 중앙 정렬
                    bg-black: 배경색 검은색
                    bg-opacity: 배경 불투명도 70%
                    text-center: 텍스트를 가로 방향 중앙 정렬
                */}

            {/* 모달 창 */}
            <div className="bg-white rounded min-w-96 w-1/4 flex flex-col justify-center items-center">
              {/* 
                        bg-white: 배경색 하얀색
                        rounded: 모서리 둥글게 (기본 0.25rem)
                        w-96: 24rem (386px)
                        md:w-1/3: md는 미디어 쿼리로 화면 너비가 768px 이상인 경우 적용되며, 너비를 부모 요소의 1/3 비율로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 요소들을 수직 정렬 (기본 수평 정렬)
                        justify-center: 플렉스 컨테이너 내 요소들을 가로 중앙 정렬
                        items-center: 플렉스 컨테이너 내 요소들을 세로 중앙 정렬

                        md(미디어쿼리): 접속 장치에 따라 특정한 css 스타일을 적용
                    */}

              {/* 제목 */}
              <div className="border-b px-7 py-5 w-10/12 flex justify-start items-center">
                {/*
                            border-b: 하단에만 테두리 추가
                            px-4: 왼쪽, 오른쪽 패딩 (4 * 0.25rem = 1rem)
                            py-2: 위쪽, 아래쪽 패딩 (2 * 0.25rem = 0.5rem)
                            flex: 내부 요소들을 플렉스 아이템으로
                            justify-start: 플렉스 컨테이너 내 요소들을 가로 방향 왼쪽부터 배치
                            items-center: 플렉스 컨테이너 내 요소들을 세로 중앙 정렬
                        */}
                <h3 className="font-bold text-sky-500 text-xl">
                  {/*
                                text-sky-500: 글자 색상 변경 (color: rgb(14 165 233);)
                                font-bold: 글자 볼드체 (font-weight: 700;)
                            */}
                  코드방 생성
                </h3>
              </div>

              {/* 내용 영역 (언어, 제목, 설명 입력창, 버튼 등...) */}
              <div className="relative w-10/12 text-gray-500 px-4 py-6 text-left">
                {/* 
                            w-10/12: 너비를 부모 요소의 10/12로
                            text-gray-500: 텍스트 색상 변경
                            text-sm: 텍스트의 크기를 small로
                            px-4: 수평 패딩 1rem (0.25 * 4)
                            py-8: 수직 패딩 2rem
                            relative: 위치를 기준으로 top, right, bottom, left 속성 사용 가능토록
                            inline-block: 한 줄에 배치하지만, 블록 요소와 같이 높이와 너비를 설정 가능
                            text-left: 텍스트 왼쪽 정렬
                        */}

                {/* 언어 dropdown */}
                <h3 className="my-2">언어</h3>
                <div className="relative w-full">
                  <select className="w-full rounded-md px-4 py-3.5 focus:outline-none appearance-none text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                    name="language" required defaultValue="select">
                    <option value="select" disabled>선택</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typscript">TypeScript</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                    <option value="php">PHP</option>
                    <option value="sql">SQL</option>
                    <option value="r">R</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Go</option>
                    <option value="swift">Swift</option>
                  </select>

                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <KeyboardArrowDownIcon className=" text-gray-400" />
                  </div>
                </div>

                {/* 제목 입력란*/}
                <h3 className="my-2 mt-6">제목</h3>
                <div>
                  <input
                    type="text"
                    className="inline-flex w-full justify-between rounded-md px-4 py-3.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none"
                    placeholder="10자 이내로 입력해주세요."
                    maxLength={10}
                  />
                </div>

                {/* 설명 입력란*/}
                <h3 className="my-2 mt-6">설명</h3>
                <div>
                  <textarea
                    className="inline-flex w-full justify-between rounded-md px-4 py-2 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none resize-none overflow-auto"
                    placeholder="100자 이내로 입력해주세요."
                    maxLength={100}
                    rows={1}
                  />
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="w-full rounded-3xl m-2 px-4 py-3.5 text-white bg-sky-500 shadow-sm"
                  >
                    생성
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-3xl m-2 px-4 py-3.5 text-white bg-red-400 shadow-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodingroomsModal;
