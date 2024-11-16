import "@/app/globals.css"
import Editor, { OnChange } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import MenuIcon from "@mui/icons-material/Menu";
import FolderIcon from "@mui/icons-material/Folder"
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import LinkIcon from "@mui/icons-material/Link";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import GestureIcon from "@mui/icons-material/Gesture";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Link from "next/link";

const CodeEditor: React.FC = () => {
    const [language, setLanguage] = useState<string>("javascript");

    // 에디터 내 코드
    const [code, setCode] = useState<string>("// 여기에 코드를 작성하세요.");

    // 컴파일 및 출력 값
    const [output, setOutput] = useState<string>("");

    // 왼쪽 탭 인덱스
    // number 타입 or null 값
    const [selectedLeftIndex, setSelectedLeftIndex] = useState<number | null>(null);

    // 오른쪽 탭 인덱스
    // number 타입 or null 값
    const [selectedRightIndex, setSelectedRightIndex] = useState<number | null>(null);

    // 테마 변수
    // 기본 다크모드 false
    const [themeMode, setThemeMode] = useState<boolean>(false);

    // 에디터 내 코드 타이핑 변경 감지 함수
    const handleEditorChange: OnChange = (value) => {
        setCode(value || "");
    };
  
    // 실행 출력 값 함수
    const handleRunCode = () => {
        // try {
        //     // 코드는 브라우저에서 직접 실행할 수 없으며, eval은 사용할 수 없음
        //     // 이 부분은 Java 코드를 서버나 다른 환경에서 실행할 수 있도록 구현 필요
        //     setOutput("코드는 브라우저에서 직접 실행할 수 없습니다. 서버 측 실행을 고려하세요.");
        // } catch (error) {
        //     setOutput(`Error: ${(error as Error).message}`);
        // }
        setOutput("코드는 브라우저에서 직접 실행할 수 없습니다.\n서버 측에서 컴파일 및 실행해주세요.");
    };

    // 왼쪽 탭 메뉴 핸들
    const handleLeftTab = (index: number) => {
        if(index === selectedLeftIndex) {
            setSelectedLeftIndex(null);
        } else {
            setSelectedLeftIndex(index);
        }
    };

    // 오른쪽 탭 메뉴 핸들
    const handleRightTab = (index: number) => {
        if(index === selectedRightIndex) {
            setSelectedRightIndex(null);
        } else {
            setSelectedRightIndex(index);
        }
    };

    // 테마 전환
    const handleTheme = () => {
        setThemeMode((prev) => !prev);
    };

    // 링크 복사 함수
    const copyLinkToClipboard = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url); // 클립보드에 텍스트 복사
            alert("링크가 복사되었습니다!");
        } catch (error) {
            console.error("링크 복사 실패:", error);
            alert("링크 복사에 실패했습니다.");
        }
    };

    // 링크 복사 핸들
    // 클릭한 요소(event.target)에서 텍스트를 읽어와 클립보드에 복사
    const handleCopyClick = (event: React.MouseEvent) => {
        const pElement = event.target as HTMLElement; // 클릭한 요소를 가져옴
        if (pElement && pElement.innerText) {
            copyLinkToClipboard(pElement.innerText); // <p> 태그의 텍스트를 전달
        }
    };
  
    return (
        <>
            {/* 전체 영역 */}
            <div className="w-full h-screen flex" style={{ backgroundColor: "#1E1E1E" }}>
                {/* 
                    w-full: 너비를 전체 너비로
                    h-screen: 높이를 전체 높이로
                    flex: 내부 요소들을 플렉스 아이템으로
                */}

                {/* 왼쪽 탭 */}
                <div className="min-w-[60px] h-full flex flex-col items-center border-r border-black overflow-y-auto"
                style={{ backgroundColor: "#1E1E1E", scrollbarColor: "#1E1E1E #333" }}>
                    {/* 
                        min-w-[60px]: 최소 너비 60px
                        h-full: 높이를 전체 높이로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 주 축을 세로로
                        items-center: 플렉스 컨테이너 내 자식 요소들을 교차 축 기준 중앙 정렬 (flex-col에 의해 교차 축이 세로 축)
                        border-r: 오른쪽에 1px 두께의 테두리를 추가
                        border-black: 테두리 색상 변경
                    */}

                    {/* 0. 메뉴 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-menu"
                    onClick={() => handleLeftTab(0)}>
                        <MenuIcon 
                        className={selectedLeftIndex === 0 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>
                    
                    {/* 1. 파일트리 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-folder"
                    onClick={() => handleLeftTab(1)}>
                        <FolderIcon
                        className={selectedLeftIndex === 1 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 2. 저장 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-save"
                    onClick={() => handleLeftTab(2)}>
                        <SaveIcon
                        className={selectedLeftIndex === 2 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 3. 파일 내보내기 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-export"
                    onClick={() => handleLeftTab(3)}>
                        <FileDownloadIcon
                        className={selectedLeftIndex === 3 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 4. 파일 가져오기 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-import"
                    onClick={() => handleLeftTab(4)}>
                        <FileUploadIcon
                        className={selectedLeftIndex === 4 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 5. 초대 링크 복사 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-link"
                    onClick={() => handleLeftTab(5)}>
                        <LinkIcon
                        className={selectedLeftIndex === 5 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 6. 다크/라이트 모드 전환 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-theme"
                    onClick={() => handleTheme()}>
                        {themeMode ? <BedtimeIcon className="text-gray-300" sx={{ fontSize: "2rem" }}/> : <WbSunnyIcon className="text-gray-300" sx={{ fontSize: "2rem" }}/>}
                        
                    </button>

                    {/* 7. 그리기 레이어 활성화 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-draw"
                    onClick={() => handleLeftTab(7)}>
                        <GestureIcon
                        className={selectedLeftIndex === 7 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>
                </div>

                {/* 활성화된 왼쪽 탭 */}
                <div style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 0. 메뉴 */}
                    {selectedLeftIndex === 0 &&
                        <div className="w-[290px] h-full p-4 flex flex-col border-r border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <Link className="text-gray-300" href="/">
                                <button
                                className="w-full min-h-16 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                                type="button"
                                id="go-to-main">
                                    메인
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/qna">
                                <button
                                className="w-full min-h-16 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                                type="button"
                                id="go-to-q&a">
                                    질문 & 답변
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/notices">
                                <button
                                className="w-full min-h-16 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                                type="button"
                                id="go-to-notices">
                                    고객센터
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/mypage">
                                <button
                                className="w-full min-h-16 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                                type="button"
                                id="go-to-mypage">
                                    마이페이지
                                </button>
                            </Link>
                        </div>
                    }
                    
                    {/* 1. 파일트리 */}
                    {selectedLeftIndex === 1 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            <div className="w-full h-full bg-neutral-700 overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                                <p>├─ src/</p>
                                <p>│   ├─ main.py</p>
                                <p>│   ├─ main.py</p>
                                <p>│   ├─ utils.py</p>
                                <p>│   └─ modules/</p>
                                <p>│       ├─ module1.py</p>
                                <p>│       └─ module2.py</p>
                                <p>│</p>
                                <p>│   ├─ tests/</p>
                                <p>│   ├─ test_main.py</p>
                                <p>│   └─ test_utils.py</p>
                                <p>│</p>
                                <p>│   ├─ data/</p>
                                <p>│   ├─ input/</p>
                                <p>│   │   ├─ data1.csv</p>
                                <p>│   │   └─ data2.csv</p>
                                <p>│   └─ output/</p>
                                <p>│       └─ results.csv</p>
                                <p>│</p>
                                <p>└── README.md</p>
                            </div>
                        </div>
                    }

                    {/* 2. 저장 */}
                    {selectedLeftIndex === 2 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <button
                            className="w-full min-h-20 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                            type="button"
                            id="save-temp">
                                <p>임시저장</p>
                                <p>2024-10-07 14:49:37</p>
                            </button>
                            
                            <button
                            className="w-full min-h-20  pl-4 my-2 rounded-md bg-neutral-700 text-left"
                            type="button"
                            id="save-01">
                                <p>2024-10-07 14:49:37</p>
                                <div className="flex space-x-2 items-center">
                                    <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                    <p>Neil</p>
                                </div>
                            </button>
                            
                            <button
                            className="w-full min-h-20 pl-4 my-2 rounded-md bg-neutral-700 text-left"
                            type="button"
                            id="save-02">
                                <p>코드 저장칸 2</p>
                            </button>

                            <button
                            className="w-full min-h-20  pl-4 my-2 rounded-md bg-neutral-700 text-left"
                            type="button"
                            id="save-03">
                                <p>코드 저장칸 3</p>
                            </button>

                            <button
                            className="w-full min-h-20  pl-4 my-2 rounded-md bg-neutral-700 text-left"
                            type="button"
                            id="save-04">
                                <p>코드 저장칸 4</p>
                            </button>
                        </div>
                    }

                    {/* 3. 파일 내보내기 */}
                    {selectedLeftIndex === 3 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            내보내기 탭
                        </div>
                    }

                    {/* 4. 파일 가져오기 */}
                    {selectedLeftIndex === 4 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            가져오기 탭
                        </div>
                    }

                    {/* 5. 초대 링크 복사 */}
                    {selectedLeftIndex === 5 &&
                        <div className="w-[290px] h-full p-4 flex flex-col border-r border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <button
                            className="w-full min-h-20 p-4 my-2 flex items-center rounded-md bg-neutral-700 text-gray-300 text-left text-xs"
                            type="button"
                            id="copy-link"
                            onClick={handleCopyClick}>
                                <p className="w-full break-words">
                                    https://github.com/orgs/GadiGoodi/repositories
                                </p> 
                            </button>
                        </div>
                    }

                    {/* 6. 다크/라이트 모드 전환 */}
                    {selectedLeftIndex === 6 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            다크/라이트 모드 탭
                        </div>
                    }

                    {/* 7. 그리기 레이어 활성화 */}
                    {selectedLeftIndex === 7 &&
                    <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                        그리기 레이어 탭
                    </div>
                    }
                </div>

                {/* 코드 에디터 및 출력 영역 */}
                <div className="min-w-[240px] h-full flex-grow" style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 
                        min-w-[240px]: 최소 너비 240px
                        h-full: 높이를 전체 높이로
                        flex-grow: 남는 공간에 대해, 해당 요소를 전부 채워줌
                    */}

                    {/* 코드 에디터 영역 */}
                    <div className="h-3/4 border-b border-black">
                        <Editor
                            width="100%" // 부모 div의 크기에 맞게 100% 설정
                            height="100%"
                            defaultLanguage={language}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                wordWrap: "off", // 자동 줄 바꿈 비활성화
                                scrollBeyondLastLine: true, // 마지막 줄 이후로 스크롤 가능
                                scrollBeyondLastColumn: 10,
                                automaticLayout: true,
                                // horizontalScrollbarSize: 12, // 수평 스크롤바 크기
                                minimap: {
                                    enabled: true, // 미니맵 활성화
                                },
                            }}
                        />
                    </div>

                    {/* 출력 영역 */}
                    <div className="h-1/4 flex flex-col overflow-y-auto"
                        style={{ scrollbarColor: "#1E1E1E #333"}}>
                        <div className="text-right pr-2 p-1 border-b border-black">
                            <button
                            onClick={handleRunCode}
                            type="button"
                            id="output-code">
                                <PlayArrowIcon className="text-gray-300" sx={{ fontSize: "2rem" }}/>
                            </button>
                        </div>
                        
                        <div className="p-2 text-gray-300 flex-grow overflow-y-auto"
                        style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>

                {/* 활성화된 오른쪽 탭 */}
                <div style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 0. 참여자 목록 탭 */}
                    {selectedRightIndex === 0 &&
                        <div className="h-full border-l border-black">
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 border-b border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>
                                    
                                    <button className="flex space-x-2 items-center">
                                        <PersonAddAlt1Icon
                                        className="text-gray-300"
                                        sx={{ fontSize: "2rem" }}/>
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>
                                    
                                    <button className="flex space-x-2 items-center">
                                        <PersonAddAlt1Icon
                                        className="text-gray-300"
                                        sx={{ fontSize: "2rem" }}/>
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>
                                    
                                    <button className="flex space-x-2 items-center">
                                        <PersonAddAlt1Icon
                                        className="text-gray-300"
                                        sx={{ fontSize: "2rem" }}/>
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>
                                    
                                    <button className="flex space-x-2 items-center">
                                        <PersonAddAlt1Icon
                                        className="text-gray-300"
                                        sx={{ fontSize: "2rem" }}/>
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>
                                    
                                    <button className="flex space-x-2 items-center">
                                        <PersonAddAlt1Icon
                                        className="text-gray-300"
                                        sx={{ fontSize: "2rem" }}/>
                                    </button>
                                </div>
                            </div>

                            <div className="h-1/4">
                                음성채팅
                            </div>
                        </div>
                    }

                    {/* 1. 채팅 탭 */}
                    {selectedRightIndex === 1 &&
                        <div className="h-full border-l border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 flex flex-col border-b border-black">
                                채팅 탭
                            </div>

                            <div className="h-1/4">
                                음성채팅
                            </div>
                        </div>
                    }

                    {/* 2. AI 채팅 탭 */}
                    {selectedRightIndex === 2 &&
                        <div className="h-full border-l border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 flex flex-col border-b border-black">
                                AI 채팅 탭
                            </div>

                            <div className="h-1/4">
                                음성채팅
                            </div>
                        </div>
                    }

                    {/* 3. 친구 초대 탭 */}
                    {selectedRightIndex === 3 &&
                        <div className="h-full border-l border-black">
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 flex flex-col border-b border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333"}}>
                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button id="invite-friend">
                                            <GroupAddIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                        <button id="invite-friend">
                                            <ChatIcon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }}/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="h-1/4 overscroll-auto">
                                음성채팅
                            </div>
                        </div>
                    }
                </div>

                {/* 오른쪽 탭 */}
                <div className="min-w-[60px] h-full flex flex-col items-center border-l border-black overflow-y-auto"
                style={{ backgroundColor: "#1E1E1E", scrollbarColor: "#1E1E1E #333" }}>
                    {/* 
                        min-w-[60px]: 최소 너비 60px
                        h-full: 높이를 전체 높이로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 주 축을 세로로
                        items-center: 플렉스 컨테이너 내 자식 요소들을 교차 축 기준 중앙 정렬 (flex-col에 의해 교차 축이 세로 축)
                        border-l-2: 왼쪽에 2px 두께의 테두리를 추가
                        border-black: 테두리 색상 변경
                    */}

                    {/* 0. 참여자 목록 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-menu"
                    onClick={() => handleRightTab(0)}>
                        <PersonIcon
                        className={selectedRightIndex === 0 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 1. 채팅 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-folder"
                    onClick={() => handleRightTab(1)}>
                        <ChatIcon
                        className={selectedRightIndex === 1 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 2. AI 채팅 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-save"
                    onClick={() => handleRightTab(2)}>
                        <SmartToyIcon
                        className={selectedRightIndex === 2 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>

                    {/* 3. 친구 초대 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-export"
                    onClick={() => handleRightTab(3)}>
                        <PersonAddAlt1Icon
                        className={selectedRightIndex === 3 ? "text-blue-500" : "text-gray-300"} 
                        sx={{ fontSize: "2rem" }}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;