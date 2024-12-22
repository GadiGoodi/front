import CodingroomsApi from "@/app/(apis)/codingrooms/codingroomsApi";
import WebSocketService from "../../(apis)/codingrooms/codingroomsWebSocket"
import { codeSnippets } from "@/app/(models)/codingrooms/CodingroomsDTO";
import { CodeGetData, CodingroomsGetData } from "@/app/(models)/codingrooms/CodingroomsDTO";
import { useRef, useState } from "react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import { OnChange } from "@monaco-editor/react";
import { UUID } from "crypto";
import axios from "axios";

const useCodingrooms = () => {
    // axios api
    const { getCodingrooms, getCode, postEditedCode } = CodingroomsApi();

    // 코드방 입장 시, 불러올 데이터
    const defaultCodingrooms: CodingroomsGetData = {
        roomId: 0,
        language: "",
        codeId: "",
        value: ""
    };

    const [codingrooms, setCodingrooms] = useState(defaultCodingrooms);

    // 가져올 코드 데이터
    // const [codeData, setCodeData] = useState<CodeGetData>();

    // 언어 버전
    const languageVersions: Readonly<Record<string, string>> = {
        javascript: "18.15.0",
        typescript: "5.0.3",
        python: "3.10.0",
        c: "10.2.0",
        cpp: "10.2.0",
        csharp: "6.12.0",
        java: "15.0.2",
        ruby: "3.0.1",
        go: "1.16.2",
        swift: "5.3.3"
    };

    // 언어 확장자
    const languageExtensions: Readonly<Record<string, string>> = {
        javascript: "js",
        typescript: "ts",
        python: "py",
        c: "c",
        cpp: "cpp",
        csharp: "cs",
        java: "java",
        ruby: "rb",
        go: "go",
        swift: "swift",
    };

    // 상단 파일 탭 목록
    const [fileTabs, setFileTabs] = useState([
        { fileName: "main", value: codingrooms?.value as string, codeId: codingrooms?.codeId as string }
    ]);

    // 파일 탭 이름 뒤에 붙을 숫자
    const [fileTabNum, setFileTabNum] = useState<number>(0);

    // 활성화된 파일 탭
    const [activeFileTab, setActiveFileTab] = useState(fileTabs[0]);

    // 탭 변경 확인 탭
    const [isTabChanged, setIsTabChanged] = useState<boolean>(false);

    // 이름을 변경할 파일 탭 요소 번호
    const [editingFileTabIndex, setEditingFileTabIndex] = useState<number | null>(null);

    // 파일 탭 이름 임시 변경 값
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

    // pistonAPI
    const pistonAPI = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
    });

    // 컴파일 상태 값
    // 실행 버튼 및 에디터 활성화 여부
    const [isCompiling, setIsCompiling] = useState<boolean>(false);

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

    // 에디터 참조 훅
    // IStandaloneCodeEditor: Monaco Editor의 인스턴스를 나타내는 타입
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    // 코드 변경 감지 핸들러
    const handleEditorChange: OnChange = (value) => {
        setActiveFileTab({ ...activeFileTab, value: value || "" });
        setFileTabs(fileTabs.map(f => f.fileName === activeFileTab.fileName ? { ...f, value: value || "" } : f));

        // 데이터 전송
        // 엔드포인트, {파일명, 에디터 값}
        if (WebSocketService.subscriptions[`tab-${activeFileTab.codeId}`]) {
            WebSocketService.send("/pub/broadcast-code", JSON.stringify({ roomId: codingrooms?.roomId, value: value as string }));
        }
    };

    // 파일 탭 클릭 핸들러
    // activeFileTab은 직전 파일탭, fileTab은 클릭한 파일탭
    const handleTabClick = (fileTab: { fileName: string; value: string, codeId: string }) => {
        // 현재 탭 클릭 시
        if (activeFileTab.fileName === fileTab.fileName) {
            return;
        }

        WebSocketService.unsubscribe(activeFileTab.codeId);
        setActiveFileTab(fileTab);
        setIsTabChanged(!isTabChanged);
    };

    // 파일 탭 추가 핸들러
    const handleAddFileTab = () => {
        // 구독 해제
        WebSocketService.unsubscribe(activeFileTab.codeId);

        const newFileTabName = `noname${fileTabNum + 1}`; // 파일 이름 자동 생성
        const newFileTab = { fileName: newFileTabName, value: codeSnippets[codingrooms?.language as string], codeId: "" };
        setFileTabs([...fileTabs, newFileTab]); // 새 파일 요소 추가
        setActiveFileTab(newFileTab); // 새 파일 활성화
        // setCodeData({...codeData, fileName: newFileTabName});
        setFileTabNum(fileTabNum + 1); // 파일 번호 증가
    };

    // 파일 탭 닫기 핸들러
    // fileTab는 직전(닫은) 파일탭, activeFileTab은 활성화된 파일탭
    const handleRemoveFile = (fileTab: { fileName: string; value: string, codeId: string }, index: number) => {
        // 기본 파일(main.확장자) 탭은 닫을 수 없도록
        if (fileTabs[index].fileName === "main") {
            return;
        }

        // 파일 탭 배열 초기화
        const updatedFileTabs = fileTabs.filter((f) => f.fileName !== fileTab.fileName);
        setFileTabs(updatedFileTabs);

        // 활성화된 탭을 닫는 경우
        if (activeFileTab.fileName === fileTab.fileName) {
            const newIndex = (index === fileTabs.length - 1 ? index - 1 : index);

            WebSocketService.unsubscribe(fileTab.codeId);
            // 해당 인덱스 탭으로 새로이 set
            setActiveFileTab(updatedFileTabs[newIndex] || { name: "", value: "", codeId: "" });
            setIsTabChanged(!isTabChanged);
        }
    };

    // 파일 탭 이름을 편집 모드로 전환
    const handleFileTabDoubleClick = (index: number) => {
        if (fileTabs[index].fileName === "main") {
            return;
        }
        setEditingFileTabIndex(index);  // 해당 탭을 편집 모드로 설정
        setTmpFileTabName(fileTabs[index].fileName.split(".")[0]); // 변경 중인 파일 명에 대한 초기의 값을 현재 파일 명으로 설정
    };

    // 파일 명에서 유효하지 않은 기호 검사 함수
    // \ / : * ? " < > | 포함하는지 확인
    const checkInvalidChars = (char: string): boolean => {
        const invalidCharsPattern = /[\\\/:*?"<>|]/;
        return invalidCharsPattern.test(char);
    };

    // 키보드 이벤트 처리 (onKeyDown에서 Enter키를 눌렀을 때)
    // 파일 탭 이름 변경
    const changeFileTabName = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // 엔터를 누를 경우
        if (e.key === "Enter") {
            // index번째(현재) 탭의 값과, tmpFileTabName 값이 같을 경우
            // 즉, 파일명을 변경하지 않은 경우
            if (fileTabs[index].fileName === `${tmpFileTabName}`) {
                closeFileTabInput();
                return;
            }

            // some은 조건을 만족할 경우 true 반환
            // 중복되는 파일명이 있을 경우
            if (fileTabs.some(f => f.fileName === `${tmpFileTabName}`)) {
                alert("파일명이 중복됩니다.");
                closeFileTabInput();
                return;
            }

            // 유효하지 않은 기호를 포함한 경우 true 반환
            // \ / : * ? " < > | 사용 불가
            if (checkInvalidChars(tmpFileTabName)) {
                alert("파일명을 확인해주세요.");
                closeFileTabInput();
                return;
            }

            // 업데이트할 파일 탭 배열에 원본 파일 탭 배열 복붙
            const updatedFileTabs = [...fileTabs];
            // index번째의 name 값을 초기화
            updatedFileTabs[index].fileName = `${tmpFileTabName}`;
            // fileTabs에 업데이트된 배열을 통째로 set
            setFileTabs(updatedFileTabs);
            // setCodeData({...codeData, fileName: tmpFileTabName});
            closeFileTabInput();
            setTmpFileTabName("");
        }
    };

    // 파일 탭 이름 편집 모드 종료
    // input 태그가 포커스를 잃을 때 호출하는 함수
    const closeFileTabInput = () => {
        setTmpFileTabName(""); // 임시 파일명 초기화
        setEditingFileTabIndex(null);  // 편집 종료
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

    // 코드 컴파일
    const executeCode = async (sourceCode: string) => {
        const response = await pistonAPI.post("/execute", {
            language: codingrooms?.language as string,
            version: languageVersions[codingrooms?.language as string],
            files: [
                {
                    content: sourceCode
                }
            ],
        })

        return response.data;
    };

    // 실행 버튼 함수
    const handleRunCode = async () => {
        // 실행 버튼 및 에디터 비활성화
        setIsCompiling(true);

        const value = activeFileTab.value;
        if (!value) {
            alert("공백은 실행할 수 없습니다.");
            setIsCompiling(false);
            return;
        }

        // 실행 전 자동 저장
        const isSaved = saveEditedCode(activeFileTab.codeId, codingrooms?.roomId as number, activeFileTab.fileName, value);
        // 저장을 실패한 경우
        if (!isSaved) {
            alert("저장 실패 조건문");
            setIsCompiling(false);
            return;
        }

        try {
            const { run: result } = await executeCode(value);

            // 정상적으로 컴파일된 경우
            // stdout의 값이 공백이 아닐 경우 (길이가 0이 아님)
            if (result.stdout.trim().length !== 0) {
                setOutput(result.stdout);
                alert("컴파일을 성공했습니다.");
            } else {
                setOutput(result.stderr);
                alert("오류가 발생했습니다.");
            }
        } catch (err) {
            alert("오류가 발생했습니다.\n" + err + "\n코드를 실행할 수 없습니다.");
        } finally {
            // 실행 버튼, 에디터 활성화
            setIsCompiling(false);
        }
    };

    // 코드 저장
    const saveEditedCode = async (id: string, roomId: number, fileName: string, value: string) => {
        if (!value) {
            alert("공백은 저장할 수 없습니다.");
            setIsCompiling(false);
            return;
        }

        const saveData = {
            id: id,
            roomId: roomId,
            writerId: 1,
            fileName: fileName,
            value: value
        }

        const result = await postEditedCode(saveData);
        if (result) {
            alert("저장했습니다.");
        } else if (!result) {
            return null;
        }

        setActiveFileTab({ ...activeFileTab, fileName: result.fileName, value: result.value, codeId: result.id });
        setFileTabs(fileTabs.map(f => f.fileName === activeFileTab.fileName ? { ...f, name: result.fileName, value: result.value, codeId: result.id } : f));

        return result;
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
    const handleCopyClick = (event: React.MouseEvent) => {
        const pElement = event.target as HTMLElement; // 클릭한 요소를 가져옴
        if (pElement && pElement.innerText) {
            copyLinkToClipboard(pElement.innerText); // <p> 태그의 텍스트를 전달
        }
    };

    // 테마 전환
    const handleTheme = () => {
        setThemeMode((prev) => !prev);
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

    // Monaco Editor onMount
    const onMount = (editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.focus();
    };

    // 코드방 입장 시, 데이터 불러와 렌더링
    const renderingCodingrooms = async (uuid: UUID) => {
        const result = await getCodingrooms(uuid);
        setCodingrooms(result);
        return result;
    };

    return {
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
    };
}

export default useCodingrooms;
