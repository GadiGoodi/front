"use client";
// Next.js 13 이상에서는 React 서버 컴포넌트와 클라이언트 컴포넌트를 구분
// 기본적으로 모든 파일은 서버 컴포넌트로 취급
// useEffect와 같은 클라이언트 전용 훅은 클라이언트 컴포넌트에서만 작동함
// 따라서 이러한 훅을 사용하려면 해당 파일이 클라이언트에서 렌더링되어야 함을 명시해야 함
// 파일 상단에 "use client"; 지시어를 추가하여 해당 파일이 클라이언트 컴포넌트임을 명시

import "@/app/globals.css"
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CodingroomsModal = () => {
    // dropdown 여닫힘 상태 관리
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // div 훅 관리
    const dropdownRef = useRef<HTMLDivElement>(null);
    // useRef는 React에서 제공하는 hook
    // 컴포넌트 내에서 DOM 요소나 변경 가능한 값을 저장할 수 있는 레퍼런스를 생성하는 데 사용
    // React 컴포넌트가 다시 렌더링되더라도 useRef로 생성된 값은 유지되기 때문에,
    // 컴포넌트가 마운트되고 업데이트될 때마다 같은 레퍼런스 객체를 유지
    // HTMLDivElement는 div 요소를 나타내는 인터페이스

    // isOpen 상태 값 변경
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // isOpen 상태값 변경에 따른 렌더링
    useEffect(() => {
        // 클릭 이벤트
        // dropdownRef.current는 드롭다운 요소에 대한 참조
        // !dropdownRef.current.contains(event.target as Node)는 클릭한 위치가 드롭다운 요소 내부가 아니라는 것을 확인하는 조건
        // 즉, 드롭다운 내부가 아니면 드롭다운을 닫음 (false)
        // event.target은 클릭할 실제 DOM 요소
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        // 드롭다운이 열려있을 경우의 클릭 이벤트 리스터
        // 드롭다운이 열려있을 경우, 전체 영역의 클릭을 감지하여 handleClickOutside 함수 실행
        // handleClickOutside 함수는 클릭 위치가 드롭다운 내부가 아닐 경우, 드롭다운을 닫는 함수
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        // 클린업 함수
        // 컴포넌트가 언마운트(화면에서 제거) 되거나, isOpen이 false로 변경될 때
        // 드롭다운이 닫히게 되면, 외부 클릭을 감지하는 이벤트 리스너도 필요가 없어짐
        // 즉, 컴포넌트가 사라지거나 할 때 자동으로 정리(클린업) 해주는 함수
        // 컴포넌트가 화면에서 사라져도 여전히 클릭 이벤트를 감지하면, 불필요한 리소스를 소모하는 메모리 누수를 일으킬 수 있음
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);
    
    return (
        <>
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
                        <div ref={dropdownRef}>
                            {/* dropdown 버튼 */}
                            <button
                            type="button"
                            className="inline-flex w-full justify-between rounded-md px-4 py-3.5 text-gray-400 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={toggleDropdown}>
                                {/* 
                                    inline-flex: 요소가 한 줄에 다른 요소와 나란히 배치되며, 내부 콘텐츠가 플렉스 컨테이너로 작동
                                    w-full: 부모 요소의 전체 너비로
                                    justify-between: 플렉스 컨테이너에서 자식 요소들을 양쪽 끝으로 배치
                                    gap-x-1.5: 자식 요소들 사이의 수평 간격을 1.5(0.375rem)로 설정
                                    rounded-md: 모서리를 중간 정도로 둥글게 (md 크기)
                                    bg-white: 배경색을 흰색으로
                                    px-4: 수평 패딩 1rem
                                    py-3.5: 수직 패딩 0.875rem
                                    text-gray-400: 텍스트 색상 변경
                                    shadow-xm: 작은 그림자 적용
                                    ring-1: 1px 두께의 테두리 추가
                                    ring-inset: 테두리를 요소 내부에서 그리도록 설정
                                    ring-gray-300: 테두리 색상 변경
                                    hover:bg-gray-50: 마우스 호버 시 배경색을 gray-50으로
                                */}
                                선택
                                <KeyboardArrowDownIcon className=" text-gray-400"/>
                            </button>
                        </div>

                        {/* 언어 dropdown 요소 */}
                        {isOpen && (
                            <div
                            className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            style={{ width: "calc(100% - 2rem)" }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            id="dropdown-menu">
                                {/* 
                                    absolute: 위치를 부모 요소에 대해 절대적으로 설정
                                    z-10: z-index를 10으로 설정. 값이 높을 수록 z축 기준으로 상단에 표시
                                    mt-2: 상단 여백을 0.5rem만큼 설정
                                    w-full: 너비를 부모 요소의 너비만큼
                                    rounded-md: 모서리를 중간 정도 둥글게
                                    bg-white: 배경색을 흰색으로
                                    shadow-lg: 큰 그림자 효과 추가
                                    ring-1: 1픽셀 두께의 ring(테두리) 추가
                                    ring-black: ring 색상을 검은색으로
                                    ring-opacity-5: ring의 불투명도를 설정. 5%만큼 투명하게
                                    focus:outline-none: 포커스를 받을 때, 브라우저의 기본 외곽선을 제거
    
                                    style={{ width: "calc(100% - 2rem)" }}: 너비 세밀하게 적용
                                    // 해당 요소와 동일한 다른 자식 요소들은 부모 요소의 padding을 적용받는다.
                                    // 하지만 해당 요소는 absolute 속성을 받기에, 다른 자식 요소처럼 padding을 적용받지 못하여
                                    // 다른 자식 요소들과 너비가 다르기에, 직접 너비를 계산하여 적용시킴
                                */}
                                <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-0">Java</a>
                                    <a href="#" className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-1">C</a>
                                    <a href="#" className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-2">C++</a>
                                    <a href="#" className="block px-4 py-3.5 text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-3">JavaScript</a>
                                </div>
                            </div>
                        )}

                        {/* 제목 입력란*/}
                        <h3 className="my-2 mt-6">제목</h3>
                        <div>
                            <input
                            type="text"
                            className="inline-flex w-full justify-between rounded-md px-4 py-3.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none"
                            placeholder="10자 이내로 입력해주세요."
                            maxLength={10}/>
                        </div>

                        {/* 설명 입력란*/}
                        <h3 className="my-2 mt-6">설명</h3>
                        <div>
                            <textarea
                            className="inline-flex w-full justify-between rounded-md px-4 py-2 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none resize-none overflow-auto"
                            placeholder="100자 이내로 입력해주세요."
                            maxLength={100}
                            rows={1}/>
                        </div>

                        <div className="flex">
                            <button
                            type="button"
                            className="w-full rounded-3xl m-2 px-4 py-3.5 text-white bg-sky-500 shadow-sm">
                            생성
                            </button>
                            <button
                            type="button"
                            className="w-full rounded-3xl m-2 px-4 py-3.5 text-white bg-red-400 shadow-sm">
                            취소
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default CodingroomsModal;