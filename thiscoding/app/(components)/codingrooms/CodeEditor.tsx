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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

import Link from "next/link";

const CodeEditor: React.FC = () => {
    // 에디터 언어
    // DB의 코드방 테이블에서 언어 컬럼 값 받아와야 함
    const [language, setLanguage] = useState<string>("javascript");

    // 에디터 내 코드
    // const [code, setCode] = useState<string>("// 여기에 코드를 작성하세요.");

    // 상단 파일 탭 목록 (임시)
    // 저장하는 경우는 DB에서 관리
    // 초기 상태에서 최소 1개의 파일 탭은 유지하도록 설정
    // 1개의 파일 탭은 main.확장자 명으로 고정
    const [fileTabs, setFileTabs] = useState([
        { name: "main.js", content: "// 여기에 코드를 작성하세요." }
    ]);

    // 파일 탭 이름 뒤에 붙을 숫자
    const [fileTabNum, setFileTabNum] = useState<number>(0);

    // 활성화된 파일 탭
    // 초기값은 files 배열의 0번째 값
    const [activeFileTab, setActiveFileTab] = useState(fileTabs[0]);

    // 이름을 변경할 파일 탭 요소 번호
    const [editingFileTabIndex, setEditingFileTabIndex] = useState<number | null>(null);

    // 파일 탭 이름임시 변경 값
    const [tmpFileTabName, setTmpFileTabName] = useState<string>("");

    // input 훅 관리
    const fileTabEditRef = useRef<HTMLInputElement>(null);

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

    // 파일 입력 요소의 참조를 생성
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 마이크 토글
    const [isMicOn, setIsMicOn] = useState<boolean>(false);

    // 헤드셋 토글
    const [isHeadsetOn, setIsHeadsetOn] = useState<boolean>(false);

    // 음성 채팅 토글
    const [isVoiceOn, setIsVoiceOn] = useState<boolean>(false);

    // 에디터 내 코드 타이핑 변경 감지 함수
    // const handleEditorChange: OnChange = (value) => {
    //     // setCode(value || "");
    // };

    // 코드 변경 감지 핸들러
    const handleEditorChange: OnChange = (value) => {
        // 활성화된 파일의 코드 변경
        setActiveFileTab({ ...activeFileTab, content: value || "" });

        // map은 배열을 순회하면서 각 항목을 변환한 새 배열을 반환
        // f는 files 배열의 각 요소
        // 즉, 활성화된 탭에 변경된 값인 value를 실제 fileTabs의 값에 복붙저장
        setFileTabs(fileTabs.map(f => f.name === activeFileTab.name ? { ...f, content: value || "" } : f));
    };

    // 파일 탭 클릭 핸들러
    const handleTabClick = (file: { name: string; content: string }) => {
        setActiveFileTab(file);
    };

    // 파일 탭 추가 핸들러
    const handleAddFileTab = () => {
        const netFileTabName = `noname${fileTabNum + 1}.js`; // 파일 이름 자동 생성
        const newFileTab = { name: netFileTabName, content: "// 여기에 코드를 작성하세요." };
        setFileTabs([...fileTabs, newFileTab]); // 새 파일 요소 추가
        setActiveFileTab(newFileTab); // 새 파일을 활성화
        setFileTabNum(fileTabNum + 1); // 파일 번호 증가
    };

    // 파일 탭 닫기 핸들러
    const handleRemoveFile = (fileTabName: string, index: number) => {
        // 파일 탭이 하나일 경우 닫을 수 없도록 처리
        if (fileTabs.length <= 1) {
            return; // 최소 1개의 파일 탭은 남도록
        }

        // 파일 탭 배열 초기화
        // filter()는 주어진 조건에 해당되는 요소만 반환
        // 즉, fileTabName과 일치하는 요소는 제거
        setFileTabs(fileTabs.filter(f => f.name !== fileTabName));

        // 활성화된 파일 탭 초기화
        // 만약 활성화된 탭을 닫으려고 한다면

        // if (activeFileTab.name === fileTabName) {
        //     // 활성화된 탭이 0번째라면, 다시 0번째 탭으로 포커싱
        //     // 0번째가 아니라면, index-1번째 탭으로 포커싱
        //     setActiveFileTab(index === 0 ? fileTabs[0] : fileTabs[index]);
        //     console.log("삭제후 탭" + fileTabs[index].content);
        //     // setActiveFileTab(fileTabs[index - 1]);
        //     // setActiveFileTab(fileTabs.length > 1 ? fileTabs[0] : { name: "", content: "" });
        // }

        setFileTabs((prevFileTabs) => {
            // 업데이트된 파일 탭 배열
            const updatedFileTabs = prevFileTabs.filter((f) => f.name !== fileTabName);

            // 활성화된 탭을 닫으려 한다면
            if (activeFileTab.name === fileTabName) {
                // 마지막 탭이면 index-1번째, 아니라면 index번째
                const newIndex = (index === fileTabs.length - 1 ? index - 1 : index);
                // 해당 인덱스 탭으로 새로이 set
                setActiveFileTab(updatedFileTabs[newIndex] || { name: "", content: "" });
            }

            return updatedFileTabs; // 새 배열 반환
        });
    };

    // 파일 탭 이름을 편집 모드로 전환
    const handleFileTabDoubleClick = (index: number) => {
        setEditingFileTabIndex(index);  // 해당 탭을 편집 모드로 설정
        setTmpFileTabName(fileTabs[index].name.split(".")[0]); // 변경 중인 파일 명에 대한 초기의 값을 현재 파일 명으로 설정
    };

    // 키보드 이벤트 처리 (onKeyDown에서 Enter키를 눌렀을 때)
    // 파일 탭 이름 변경
    const changeFileTabName = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // 엔터를 누를 경우
        if (e.key === "Enter") {
            // index번째(현재) 탭의 값과, tmpFileTabName 값이 같을 경우
            // 즉, 파일명을 변경하지 않은 경우
            if (fileTabs[index].name === `${tmpFileTabName}.js`) {
                closeFileTabInput();
                return;
            }

            // some은 조건을 만족할 경우 true 반환
            // 중복되는 파일명이 있을 경우
            if (fileTabs.some(f => f.name === `${tmpFileTabName}.js`)) {
                alert("파일명이 중복됩니다.");
                closeFileTabInput();
                return;
            }

            // 업데이트할 파일 탭 배열에 원본 파일 탭 배열 복붙
            const updatedFileTabs = [...fileTabs];
            // index번째의 name 값을 초기화
            updatedFileTabs[index].name = `${tmpFileTabName}.js`;
            // fileTabs에 업데이트된 배열을 통째로 set
            setFileTabs(updatedFileTabs);
            closeFileTabInput();
            setTmpFileTabName("");
        }
    };

    // 파일 탭 이름 편집 모드 종료
    // input 태그가 포커스를 잃을 때 호출하는 함수 or 종료하고 싶을 때 호출
    const closeFileTabInput = () => {
        setTmpFileTabName(""); // 임시 파일명 초기화
        setEditingFileTabIndex(null);  // 편집 종료
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
        if (index === selectedLeftIndex) {
            setSelectedLeftIndex(null);
        } else {
            setSelectedLeftIndex(index);
        }
    };

    // 오른쪽 탭 메뉴 핸들
    const handleRightTab = (index: number) => {
        if (index === selectedRightIndex) {
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

    // 파일 가져오기 시, 파일 입력 요소 클릭을 트리거하는 함수
    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    // 파일 가져오기에서 파일 선택 시, 처리할 함수를 작성
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log("Selected file:", file);
        }
    };

    // 마이크 토글
    const toggleMic = () => {
        setIsMicOn((prev) => !prev);
    };

    // 헤드셋 토글
    const toggleHeadset = () => {
        setIsHeadsetOn((prev) => !prev);
    };

    // 음성 채팅 토글
    const toggleVoice = () => {
        setIsVoiceOn((prev) => !prev);
    };

    // editingFileTabIndex 상태값 변경에 따른 렌더링
    useEffect(() => {
        // 클릭 이벤트
        // 클릭 영역이 input 내부가 아닐 경우
        const handleClickOutside = (event: MouseEvent) => {
            // fileTabEditRef.current
            // => 해당 ref로 지정된 DOM 요소
            // !fileTabEditRef.current.contains(event.target as Node)
            // => 해당 ref로 지정된 DOM 요소 내부에(contains)
            // => 클릭된 요소(event.target as Node)가 포함되지 않는다면(!)
            // 즉, 해당 ref 요소가 존재하고, 다른 영역을 클릭했을 경우
            if (fileTabEditRef.current && !fileTabEditRef.current.contains(event.target as Node)) {
                // (해당 영역이 존재하고 && !해당 영역이 포함한다면(클릭된 요소))

                // 편집 중인 파일 탭이 없는 것으로 변경
                setEditingFileTabIndex(null);
                setTmpFileTabName("");
            }
        };

        // 파일 탭 명 편집 모드 중일 경우의 클릭 이벤트 리스너
        // handleClickOutside 함수는 클릭 위치가 input 내부가 아닐 경우
        if (editingFileTabIndex !== null) {
            document.addEventListener("click", handleClickOutside);
        }

        // 클린업 함수
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [editingFileTabIndex]);

    return (
        <>
            {/* 전체 영역 */}
            <div className="w-screen h-screen flex" style={{ backgroundColor: "#1E1E1E" }}>
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
                        title="메뉴"
                        onClick={() => handleLeftTab(0)}>
                        <MenuIcon
                            className={selectedLeftIndex === 0 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 1. 파일 목록 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-file-list"
                        title="파일 목록"
                        onClick={() => handleLeftTab(1)}>
                        <FolderIcon
                            className={selectedLeftIndex === 1 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 2. 실행 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-run"
                        title="실행"
                        onClick={handleRunCode}>
                        <PlayArrowIcon
                            className="text-gray-300"
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 3. 저장 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-save"
                        title="실행">
                        <SaveIcon
                            className="text-gray-300"
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 4. 파일 내보내기 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-export"
                        title="파일 내보내기"
                        onClick={() => handleLeftTab(4)}>
                        <FileDownloadIcon
                            className={selectedLeftIndex === 4 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 5. 파일 가져오기 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-import"
                        title="파일 가져오기"
                        onClick={() => handleLeftTab(5)}>
                        <FileUploadIcon
                            className={selectedLeftIndex === 5 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 6. 초대 링크 복사 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-link"
                        title="초대 링크"
                        onClick={() => handleLeftTab(6)}>
                        <LinkIcon
                            className={selectedLeftIndex === 6 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 7. 다크/라이트 모드 전환 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-theme"
                        title="테마 전환"
                        onClick={() => handleTheme()}>
                        {themeMode ? <BedtimeIcon className="text-gray-300" sx={{ fontSize: "2rem" }} />
                            : <WbSunnyIcon className="text-gray-300" sx={{ fontSize: "2rem" }} />}

                    </button>

                    {/* 8. 그리기 레이어 활성화 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-draw"
                        title="화면 위 그리기"
                        onClick={() => handleLeftTab(8)}>
                        <GestureIcon
                            className={selectedLeftIndex === 8 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>
                </div>

                {/* 활성화된 왼쪽 탭 */}
                <div style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 0. 메뉴 */}
                    {selectedLeftIndex === 0 &&
                        <div className="w-[290px] h-full p-4 flex flex-col border-r border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333" }}>
                            <Link className="text-gray-300" href="/">
                                <button
                                    className="w-full min-h-16 pl-4 my-2 rounded-md text-left bg-neutral-700 hover:bg-neutral-600"
                                    type="button"
                                    id="go-to-main">
                                    메인
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/qna">
                                <button
                                    className="w-full min-h-16 pl-4 my-2 rounded-md text-left bg-neutral-700 hover:bg-neutral-600"
                                    type="button"
                                    id="go-to-q&a">
                                    질문 & 답변
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/notices">
                                <button
                                    className="w-full min-h-16 pl-4 my-2 rounded-md text-left bg-neutral-700 hover:bg-neutral-600"
                                    type="button"
                                    id="go-to-notices">
                                    고객센터
                                </button>
                            </Link>

                            <Link className="text-gray-300" href="/mypage">
                                <button
                                    className="w-full min-h-16 pl-4 my-2 rounded-md text-left bg-neutral-700 hover:bg-neutral-600"
                                    type="button"
                                    id="go-to-mypage">
                                    마이페이지
                                </button>
                            </Link>
                        </div>
                    }

                    {/* 1. 파일 목록 */}
                    {selectedLeftIndex === 1 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            <div className="w-full h-full p-2 bg-neutral-700 overflow-y-auto"
                                style={{ scrollbarColor: "#1E1E1E #333" }}>
                                <p>main.js</p>
                                <p>noname1.js</p>
                                <p>noname2.js</p>
                                <p>noname3.js</p>
                            </div>
                        </div>
                    }

                    {/* 4. 파일 내보내기 */}
                    {selectedLeftIndex === 4 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            <button
                                className="w-full min-h-20 pl-4 my-2 rounded-md bg-neutral-700 hover:bg-neutral-600"
                                type="button"
                                id="export-file">
                                파일 내보내기
                            </button>
                        </div>
                    }

                    {/* 5. 파일 가져오기 */}
                    {selectedLeftIndex === 5 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            <button
                                className="w-full min-h-20 pl-4 my-2 rounded-md bg-neutral-700 hover:bg-neutral-600"
                                type="button"
                                id="import-file"
                                onClick={handleFileUpload}>
                                파일 가져오기
                            </button>

                            <input
                                className="hidden"
                                type="file"
                                ref={fileInputRef}
                                accept=".js, .ts, .html, .css, .py, .c, .cpp, .cs, .java, .php, .sql, .r, .rb, .go, .swift"
                                onChange={handleFileChange} />
                        </div>
                    }

                    {/* 6. 초대 링크 복사 */}
                    {selectedLeftIndex === 6 &&
                        <div className="w-[290px] h-full p-4 flex flex-col border-r border-black overflow-y-auto"
                            style={{ scrollbarColor: "#1E1E1E #333" }}>
                            <button
                                className="w-full min-h-20 p-4 my-2 flex items-center rounded-md  text-gray-300 text-xs text-left bg-neutral-700 hover:bg-neutral-600"
                                type="button"
                                id="copy-link"
                                title="링크 복사"
                                onClick={handleCopyClick}>
                                <p className="w-full break-words">
                                    https://github.com/orgs/GadiGoodi/repositories
                                </p>
                            </button>
                        </div>
                    }

                    {/* 8. 그리기 레이어 활성화 */}
                    {selectedLeftIndex === 8 &&
                        <div className="w-[290px] h-full p-4 text-gray-300 flex flex-col border-r border-black">
                            그리기 레이어 임시 탭
                        </div>
                    }
                </div>

                {/* 에디터 및 출력 영역 */}
                <div className="min-w-[240px] h-screen flex flex-grow flex-col" style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 
                        min-w-[240px]: 최소 너비 240px
                        h-full: 높이를 전체 높이로
                        flex-grow: 남는 공간에 대해, 해당 요소를 전부 채워줌
                    */}

                    {/* 상단 탭 영역 */}
                    <div className="tabs bg-neutral-900 text-gray-300 flex flex-nowrap items-center">
                        {fileTabs.map((file, index) => (
                            <div key={index} className={`flex items-center px-4 py-1 ${activeFileTab.name === file.name ? "bg-[#1E1E1E]" : "bg-neutral-900"}`}>
                                <button
                                    onClick={() => handleTabClick(file)}
                                    onDoubleClick={() => handleFileTabDoubleClick(index)}
                                >
                                    {editingFileTabIndex === index ? (
                                        <input
                                            type="text"
                                            ref={fileTabEditRef}
                                            value={tmpFileTabName}
                                            onChange={(e) => setTmpFileTabName(e.target.value)}
                                            onBlur={closeFileTabInput} // input 요소가 포커스를 잃을 때 이벤트
                                            onKeyDown={(e) => changeFileTabName(e, index)}
                                            className="bg-transparent text-gray-300 border-none focus:outline-none"
                                        />
                                    ) : (
                                        file.name
                                    )}

                                </button>
                                <button
                                    onClick={() => handleRemoveFile(file.name, index)}
                                    className="ml-2"
                                    disabled={fileTabs.length <= 1} // 최소 1개의 파일이 남도록 비활성화
                                    id="remove-tab"
                                >
                                    <CloseIcon
                                        className="text-gray-300 hover:text-red-800"
                                        sx={{ fontSize: "1rem" }} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddFileTab}
                            className="py-1 px-1 text-white"
                            title="새 탭"
                            id="add-tab"
                        >
                            <AddIcon
                                className="text-gray-300"
                                sx={{ fontSize: "1rem" }} />
                        </button>
                    </div>

                    {/* 코드 에디터 영역 */}
                    <div className="h-3/4 border-b border-black">
                        <Editor
                            width="100%" // 부모 div의 크기에 맞게 100% 설정
                            height="100%"
                            defaultLanguage={language}
                            value={activeFileTab.content}
                            onChange={handleEditorChange}
                            theme={themeMode ? "vs-light" : "vs-dark"}
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
                    <div className="h-1/4 p-2 text-gray-300 flex-grow overflow-auto"
                        style={{ scrollbarColor: "#1E1E1E #333" }}>
                        <pre>{output}</pre>
                    </div>
                </div>

                {/* 활성화된 오른쪽 탭 */}
                <div className={`h-full text-gray-300 ${selectedRightIndex === null ? "" : "border-l border-black"}`} style={{ backgroundColor: "#1E1E1E" }}>
                    <div className="w-full h-full">
                        {/* 0. 참여자 목록 탭 */}
                        {selectedRightIndex === 0 &&
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 border-b border-black overflow-y-auto"
                                style={{ scrollbarColor: "#1E1E1E #333" }}>
                                <div className="h-4"></div>
                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <button
                                        className="flex space-x-2 items-center"
                                        type="button"
                                        id="add-friend"
                                        title="친구 추가">
                                        <PersonAddAlt1Icon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }} />
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <button
                                        className="flex space-x-2 items-center"
                                        type="button"
                                        id="add-friend"
                                        title="친구 추가">
                                        <PersonAddAlt1Icon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }} />
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <button
                                        className="flex space-x-2 items-center"
                                        type="button"
                                        id="add-friend"
                                        title="친구 추가">
                                        <PersonAddAlt1Icon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }} />
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <button
                                        className="flex space-x-2 items-center"
                                        type="button"
                                        id="add-friend"
                                        title="친구 추가">
                                        <PersonAddAlt1Icon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }} />
                                    </button>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <button
                                        className="flex space-x-2 items-center"
                                        type="button"
                                        id="add-friend"
                                        title="친구 추가">
                                        <PersonAddAlt1Icon
                                            className="text-gray-300"
                                            sx={{ fontSize: "2rem" }} />
                                    </button>
                                </div>

                            </div>
                        }

                        {/* 1. 채팅 탭 */}
                        {selectedRightIndex === 1 &&
                            <div className="w-[290px] h-3/4 flex flex-col justify-between border-b border-black text-gray-300 ">
                                {/* 채팅 메시지 영역 */}
                                <div className="p-4 space-y-3 overflow-y-auto"
                                    style={{ scrollbarColor: "#1E1E1E #333" }}>
                                    {/* 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        {/* 프로필 사진 */}
                                        <div className="w-8 flex pt-2">
                                            <div className="w-8 h-8 rounded-full border border-black bg-red-500">
                                                사진
                                            </div>
                                        </div>
                                        {/* 닉네임 */}
                                        <div className="flex-col grow space-y-2">
                                            <p>닉네임</p>
                                            <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                                <p className="p-2 break-words whitespace-normal">
                                                    이 코드 어떻게 하죠??
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        {/* 프로필 사진 */}
                                        <div className="w-8 flex pt-2">
                                            <div className="w-8 h-8 rounded-full border border-black bg-green-500">
                                                사진
                                            </div>
                                        </div>
                                        {/* 닉네임 */}
                                        <div className="flex-col grow space-y-2">
                                            <p>닉네임</p>
                                            <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                                <p className="p-2 break-words whitespace-normal">
                                                    저도 잘 모르겠어요.<br/>알아서 잘 어케 해보세요.<br/>아시겠죠?
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        {/* 프로필 사진 */}
                                        <div className="w-8 flex pt-2">
                                            <div className="w-8 h-8 rounded-full border border-black bg-blue-500">
                                                사진
                                            </div>
                                        </div>
                                        {/* 닉네임 */}
                                        <div className="flex-col grow space-y-2">
                                            <p>닉네임</p>
                                            <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                                <p className="p-2 break-words whitespace-normal">
                                                    AI 채팅봇한테 물어볼까요?<br/>머리가 상당히 아프네요
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        {/* 프로필 사진 */}
                                        <div className="w-8 flex pt-2">
                                            <div className="w-8 h-8 rounded-full border border-black bg-gray-500">
                                                사진
                                            </div>
                                        </div>
                                        {/* 닉네임 */}
                                        <div className="flex-col grow space-y-2">
                                            <p>닉네임</p>
                                            <div className="max-w-[206px] bg-neutral-700 rounded-md">
                                                <p className="p-2 break-words whitespace-normal">
                                                    AI 채팅은 ChatGPT 기반이고, 우측 탭에서 3번째 항목인 로봇 아이콘을 클릭하면 돼요. AI 채팅봇한테 물어보죠.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 채팅 입력창 영역 */}
                                <div className="flex items-center rounded-3xl bg-neutral-700"
                                    style={{ scrollbarColor: "#1E1E1E #333" }}>
                                    <textarea className="flex-grow h-6 resize-none rounded-3xl bg-neutral-700 text-gray-300 outline-none px-2">
                                    </textarea>
                                    <button
                                    className="p-2 rounded-full text-white focus:outline-none"
                                    type="button"
                                    id="send-chat">
                                        <SendIcon className="text-gray-300"
                                            sx={{ fontSize: "1.5rem" }}/>
                                    </button>
                                </div>
                            </div>
                        }

                        {/* 2. AI 채팅 탭 */}
                        {selectedRightIndex === 2 &&
                            <div className=" w-[290px] h-3/4 p-4 text-gray-300 flex flex-col border-b border-black"
                                style={{ scrollbarColor: "#1E1E1E #333" }}>
                                AI 채팅 탭
                            </div>
                        }

                        {/* 3. 친구 초대 탭 */}
                        {selectedRightIndex === 3 &&
                            <div className="w-[290px] h-3/4 p-4 text-gray-300 flex flex-col border-b border-black overflow-y-auto"
                                style={{ scrollbarColor: "#1E1E1E #333" }}>
                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>

                                <div className="w-full h-16 p-4 my-2 flex items-center justify-between rounded-md bg-neutral-700 text-left">
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                        <p>Neil</p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            id="invite-friend"
                                            title="초대하기">
                                            <GroupAddIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                        <button
                                            type="button"
                                            id="chat-friend"
                                            title="채팅하기">
                                            <ChatIcon
                                                className="text-gray-300"
                                                sx={{ fontSize: "2rem" }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* 음성 채팅 영역 */}
                        {selectedRightIndex !== null &&
                            <div className="h-1/4 space-y-4 bg-neutral-700 overflow-y-auto"
                                style={{ scrollbarColor: "#1E1E1E #333" }}>
                                <div className="relative w-full h-1/4 p-2">
                                    <p className="absolute left-1/2 -translate-x-1/2">음성 채팅</p>
                                    {isVoiceOn ?
                                        <button
                                            className="absolute right-2"
                                            type="button"
                                            id="voice-on"
                                            onClick={() => toggleVoice()}>
                                            <ToggleOnIcon className="text-green-500" />
                                        </button> :
                                        <button
                                            className="absolute right-2"
                                            type="button"
                                            id="voice-off"
                                            onClick={() => toggleVoice()}>
                                            <ToggleOffIcon />
                                        </button>
                                    }
                                </div>

                                <div className="flex justify-center items-center h-1/4 space-x-2">
                                    <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                    <div className="w-8 h-8 rounded-full border border-black">사진</div>
                                </div>

                                <div className="flex justify-center h-1/4 space-x-2">
                                    {isMicOn ?
                                        <button
                                            type="button"
                                            id="mic-on"
                                            onClick={() => toggleMic()}>
                                            <MicNoneIcon />
                                        </button> :
                                        <button
                                            type="button"
                                            id="mic-off"
                                            onClick={() => toggleMic()}>
                                            <MicOffIcon />
                                        </button>
                                    }

                                    {isHeadsetOn ?
                                        <button
                                            type="button"
                                            id="headset-on"
                                            onClick={() => toggleHeadset()}>
                                            <HeadsetMicIcon />
                                        </button> :
                                        <button
                                            type="button"
                                            id="headset-off"
                                            onClick={() => toggleHeadset()}>
                                            <HeadsetOffIcon />
                                        </button>
                                    }
                                </div>
                            </div>

                        }
                    </div>
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
                        id="right-participant"
                        title="참여자 목록"
                        onClick={() => handleRightTab(0)}>
                        <PersonIcon
                            className={selectedRightIndex === 0 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 1. 채팅 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="right-chat"
                        title="채팅"
                        onClick={() => handleRightTab(1)}>
                        <ChatIcon
                            className={selectedRightIndex === 1 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 2. AI 채팅 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="right-ai"
                        title="AI 채팅"
                        onClick={() => handleRightTab(2)}>
                        <SmartToyIcon
                            className={selectedRightIndex === 2 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 3. 친구 초대 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="right-invite"
                        title="친구 초대"
                        onClick={() => handleRightTab(3)}>
                        <PersonAddAlt1Icon
                            className={selectedRightIndex === 3 ? "text-blue-500" : "text-gray-300"}
                            sx={{ fontSize: "2rem" }} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;