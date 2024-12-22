import "@/app/globals.css"
import Editor from "@monaco-editor/react";
import { useEffect } from "react";
import WebSocketService from "../../../(apis)/codingrooms/codingroomsWebSocket";

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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

import Link from "next/link";
import { useParams } from 'next/navigation';
import useCodingrooms from "@/app/(hooks)/codingrooms/useCodingrooms";
import { UUID } from "crypto";

const CodeEditor: React.FC = () => {
    const {
        codingrooms, //, setCodingrooms,
        languageVersions, languageExtensions,
        fileTabs, setFileTabs,
        activeFileTab, setActiveFileTab,
        isTabChanged, setIsTabChanged,
        editingFileTabIndex, setEditingFileTabIndex,
        tmpFileTabName, setTmpFileTabName,
        fileTabEditRef,
        output, setOutput,
        selectedLeftIndex, setSelectedLeftIndex,
        selectedRightIndex, setSelectedRightIndex,
        pistonAPI,
        isCompiling, setIsCompiling,
        themeMode, setThemeMode,
        fileInputRef,
        isMicOn, setIsMicOn,
        isHeadsetOn, setIsHeadsetOn,
        isVoiceOn, setIsVoiceOn,
        editorRef,
        handleEditorChange,
        handleTabClick,
        handleAddFileTab,
        handleRemoveFile,
        handleFileTabDoubleClick,
        checkInvalidChars,
        changeFileTabName,
        closeFileTabInput,
        handleLeftTab,
        handleRightTab,
        executeCode,
        handleRunCode,
        saveEditedCode,
        handleFileUpload,
        handleFileChange,
        copyLinkToClipboard,
        handleCopyClick,
        handleTheme,
        toggleMic,
        toggleHeadset,
        toggleVoice,
        onMount,
        renderingCodingrooms
    } = useCodingrooms();

    const params = useParams();

    // 최초 렌더링 직후 호출
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await renderingCodingrooms(params.codingrooms_uuid as UUID);

                // codingrooms 데이터가 로드된 후 fileTabs 초기화
                const initialTab = { fileName: "main", value: result?.value, codeId: result?.codeId || "" };
                setFileTabs([initialTab]);
                setActiveFileTab(initialTab);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        loadData();
    }, []);
    // }, [params.codingrooms_uuid]);

    // codingrooms 값 변경 시 동작 (코드방 입장 시)
    useEffect(() => {
        // codingrooms가 undefined일 경우 (상태 미반영)
        if (!codingrooms) {
            return;
        }

        // 소켓 연결
        WebSocketService.connect("http://localhost:8080/ws", codingrooms?.roomId as number, codingrooms?.codeId as string, (value: string) => {
            // 활성화 탭의 코드 변경
            setActiveFileTab({ ...activeFileTab, value: value || "" });

            setFileTabs(fileTabs.map(f => f.codeId === activeFileTab.codeId ? { ...f, value: value || "" } : f));
        });

        // 컴포넌트 언마운트 시 
        return () => {
            // 소켓 연결 종료
            WebSocketService.disconnect();
        };
    }, [codingrooms]);

    // avtiveFileTab.codeId 변경에 따른 렌더링
    useEffect(() => {
        if(!activeFileTab.codeId) {
            return;
        }

        // WebSocket 연결 및 메시지 처리
        WebSocketService.resubscribe(codingrooms?.roomId as number, activeFileTab.codeId, (value: string) => {
            // 활성화된 파일의 코드 변경
            setActiveFileTab({ ...activeFileTab, value: value || "" });
            // 파일 탭 목록 변경 (활성화된 파일만)
            setFileTabs(fileTabs.map(f => f.codeId === activeFileTab.codeId ? { ...f, value: value || "" } : f));
        });

    }, [isTabChanged]);

    // editingFileTabIndex 상태값 변경에 따른 렌더링
    useEffect(() => {
        // 클릭 영역이 input 내부가 아닐 경우
        const handleClickOutside = (event: MouseEvent) => {
            if (fileTabEditRef.current && !fileTabEditRef.current.contains(event.target as Node)) {
                setEditingFileTabIndex(null);
                setTmpFileTabName("");
            }
        };

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

                {/* 왼쪽 탭 */}
                <div className="min-w-[60px] h-full flex flex-col items-center border-r border-black overflow-y-auto"
                    style={{ backgroundColor: "#1E1E1E", scrollbarColor: "#1E1E1E #333" }}>

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
                        onClick={handleRunCode}
                        disabled={isCompiling}>
                        <PlayArrowIcon
                            className="text-gray-300"
                            sx={{ fontSize: "2rem" }} />
                    </button>

                    {/* 3. 저장 버튼 */}
                    <button
                        className="my-2"
                        type="button"
                        id="left-save"
                        title="실행"
                        onClick={() => saveEditedCode(activeFileTab.codeId, codingrooms?.roomId as number, activeFileTab.fileName, activeFileTab.value)}>
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

                    {/* 상단 탭 영역 */}
                    <div className="tabs bg-neutral-900 text-gray-300 flex flex-nowrap items-center">
                        {fileTabs.map((file, index) => (
                            <div key={index} className={`flex items-center px-4 py-1 ${activeFileTab.fileName === file.fileName ? "bg-[#1E1E1E]" : "bg-neutral-900"}`}>
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
                                        file.fileName + "." + languageExtensions[codingrooms?.language]
                                    )}

                                </button>
                                <button
                                    onClick={() => handleRemoveFile(file, index)}
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
                            width="100%"
                            height="100%"
                            language={codingrooms?.language as string}
                            defaultValue={codingrooms?.value as string}
                            value={activeFileTab.value}
                            onChange={handleEditorChange}
                            onMount={onMount}
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
                                readOnly: isCompiling
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
                            <div className="w-[290px] h-3/4 flex flex-col justify-between border-b border-black text-gray-300">
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
                                                    저도 잘 모르겠어요.<br />알아서 잘 어케 해보세요.<br />아시겠죠?
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
                                                    AI 채팅봇한테 물어볼까요?<br />머리가 상당히 아프네요
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
                                            sx={{ fontSize: "1.5rem" }} />
                                    </button>
                                </div>
                            </div>
                        }

                        {/* 2. AI 채팅 탭 */}
                        {selectedRightIndex === 2 &&
                            <div className="w-[290px] h-3/4 flex flex-col justify-between border-b border-black text-gray-300 ">
                                {/* 채팅 메시지 영역 */}
                                <div className="p-4 space-y-3 overflow-y-auto"
                                    style={{ scrollbarColor: "#1E1E1E #333" }}>
                                    {/* AI 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                            <p className="p-2 break-words whitespace-normal">
                                                안녕하세요! 무엇을 도와드릴까요?
                                            </p>
                                        </div>
                                    </div>

                                    {/* 본인 채팅 메시지 */}
                                    <div className="w-full py-5 space-x-2 flex text-left justify-end">
                                        {/* 메시지 */}
                                        <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                            <p className="p-2 break-words whitespace-normal">
                                                재밌는 얘기 해줘
                                            </p>
                                        </div>
                                    </div>

                                    {/* AI 채팅 메시지 */}
                                    <div className="w-full p-1/2 space-x-2 flex text-left">
                                        <div className="max-w-[206px] bg-neutral-700 rounded-md ">
                                            <p className="p-2 break-words whitespace-normal">
                                                어느 날, 개구리가 마법사에게 소원을 빌었어.
                                                "날 똑똑하게 만들어 주세요!"
                                                그러자 마법사가 개구리를 사람으로 만들어버렸대. 😂
                                            </p>
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
                                            sx={{ fontSize: "1.5rem" }} />
                                    </button>
                                </div>
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