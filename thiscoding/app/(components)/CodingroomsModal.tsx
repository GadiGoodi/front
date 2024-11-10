import '@/app/globals.css'

const CodingroomsModal = () => {
    return (
        <>
            <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center'>
                {/*
                    코드방 생성 모달 클릭 시 보여지는 불투명하고 어두운 뒷 배경

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
                <div className='bg-white rounded w-10/12 md:w-1/3 flex flex-col justify-center items-center'>
                    {/* 
                        모달 창

                        bg-white: 배경색 하얀색
                        rounded: 모서리 둥글게 (기본 0.25rem)
                        w-10/12: 너비를 부모 요소의 10/12 비율로
                        md:w-1/3: md는 미디어 쿼리로 화면 너비가 768px 이상인 경우 적용되며, 너비를 부모 요소의 1/3 비율로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 요소들을 수직 정렬 (기본 수평 정렬)
                        justify-center: 플렉스 컨테이너 내 요소들을 가로 중앙 정렬
                        items-center: 플렉스 컨테이너 내 요소들을 세로 중앙 정렬

                        md(미디어쿼리): 접속 장치에 따라 특정한 css 스타일을 적용
                    */}
                    <div className='border-b px-7 py-5 w-10/12 flex justify-start items-center'>
                        {/*
                            제목 영역

                            border-b: 하단에만 테두리 추가
                            px-4: 왼쪽, 오른쪽 패딩 (4 * 0.25rem = 1rem)
                            py-2: 위쪽, 아래쪽 패딩 (2 * 0.25rem = 0.5rem)
                            flex: 내부 요소들을 플렉스 아이템으로
                            justify-start: 플렉스 컨테이너 내 요소들을 가로 방향 왼쪽부터 배치
                            items-center: 플렉스 컨테이너 내 요소들을 세로 중앙 정렬
                        */}
                        <h3 className='font-bold text-sky-500'>
                            {/*
                                text-sky-500: 글자 색상 변경 (color: rgb(14 165 233);)
                                font-bold: 글자 볼드체 (font-weight: 700;)
                            */}
                            코드방 생성
                        </h3>
                    </div>
                    
                    {/* <div className=''>
                        <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1'>
                            <div className="py-1" role="none">
                            
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0">Account settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-1">Support</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-2">License</a>
                            <form method="POST" action="#" role="none">
                                <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" id="menu-item-3">Sign out</button>
                            </form>
                            </div>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </>
    )
}

export default CodingroomsModal;