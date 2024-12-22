"use client";

import "@/app/globals.css";
import { useState } from "react";
import useCodingroomsModal from "@/app/(hooks)/codingrooms/useCodingroomsModal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CodingroomsModal = () => {
  // 모달 토글 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const { codingroomsModalData, setCodingroomsModalData, createCodingrooms } = useCodingroomsModal();

  return (
    <>
      {isModalOpen && (
        <div className="z-10 h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
          {/* 코드방 생성 모달 클릭 시. 기본 배경에 씌워지는 불투명한 레이아웃 */}
          <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center">
            {/* 모달 창 */}
            <div className="bg-white rounded min-w-96 w-1/4 flex flex-col justify-center items-center">
              {/* 제목 */}
              <div className="border-b px-7 py-5 w-10/12 flex justify-start items-center">
                <h3 className="font-bold text-sky-500 text-xl">
                  코드방 생성
                </h3>
              </div>

              {/* 내용 영역 (언어, 제목, 설명 입력창, 버튼 등...) */}
              <div className="relative w-10/12 text-gray-500 px-4 py-6 text-left">
                {/* 언어 dropdown */}
                <h3 className="my-2">언어</h3>
                <div className="relative w-full">
                  <select
                    className="w-full rounded-md px-4 py-3.5 focus:outline-none appearance-none text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                    name="language"
                    required
                    defaultValue="select"
                    onChange={(e) => {
                      const {value, name} = e.target;
                      setCodingroomsModalData({
                        ...codingroomsModalData,
                        [name]: value
                      });
                    }}>
                    <option value="select" disabled>선택</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
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
                    name="title"
                    placeholder="10자 이내로 입력해주세요."
                    maxLength={10}
                    onChange={(e) => {
                      const {value, name} = e.target;
                      setCodingroomsModalData({
                        ...codingroomsModalData,
                        [name]: value
                      });
                    }}
                  />
                </div>

                {/* 설명 입력란*/}
                <h3 className="my-2 mt-6">설명</h3>
                <div>
                  <textarea
                    className="inline-flex w-full justify-between rounded-md px-4 py-2 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none resize-none overflow-auto"
                    name="content"
                    placeholder="100자 이내로 입력해주세요."
                    maxLength={100}
                    rows={1}
                    onChange={(e) => {
                      const {value, name} = e.target;
                      setCodingroomsModalData({
                        ...codingroomsModalData,
                        [name]: value
                      });
                    }}
                  />
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="w-full rounded-3xl m-2 px-4 py-3.5 text-white bg-sky-500 shadow-sm"
                    onClick={() => createCodingrooms()}
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
