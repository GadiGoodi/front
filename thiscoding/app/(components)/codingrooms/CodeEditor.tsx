import "@/app/globals.css"
import Editor, { OnChange } from "@monaco-editor/react";
import { useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import FolderIcon from '@mui/icons-material/Folder'
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LinkIcon from '@mui/icons-material/Link';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import GestureIcon from '@mui/icons-material/Gesture';

import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const CodeEditor: React.FC = () => {
    // 에디터 내 코드
    const [code, setCode] = useState<string>('// 여기에 코드를 작성하세요.');

    // 실행 출력 값
    const [output, setOutput] = useState<string>('');
  
    // 에디터 내 코드 타이핑 변경 감지 함수
    const handleEditorChange: OnChange = (value) => {
        setCode(value || '');
    };
  
    // 실행 출력 값 함수
    const handleRunCode = () => {
        // try {
        //     // 코드는 브라우저에서 직접 실행할 수 없으며, eval은 사용할 수 없음
        //     // 이 부분은 Java 코드를 서버나 다른 환경에서 실행할 수 있도록 구현 필요
        //     setOutput('코드는 브라우저에서 직접 실행할 수 없습니다. 서버 측 실행을 고려하세요.');
        // } catch (error) {
        //     setOutput(`Error: ${(error as Error).message}`);
        // }
        setOutput("코드는 브라우저에서 직접 실행할 수 없습니다.\n서버 측에서 컴파일 및 실행해주세요.")
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
                <div className="min-w-[60px] h-full flex flex-col items-center border-r-2 border-black" style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 
                        min-w-[60px]: 최소 너비 60px
                        h-full: 높이를 전체 높이로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 주 축을 세로로
                        items-center: 플렉스 컨테이너 내 자식 요소들을 교차 축 기준 중앙 정렬 (flex-col에 의해 교차 축이 세로 축)
                        border-r-2: 오른쪽에 2px 두께의 테두리를 추가
                        border-black: 테두리 색상 변경
                    */}

                    {/* 1. 메뉴 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-menu">
                        <MenuIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 2. 파일트리 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-folder">
                        <FolderIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 3. 저장 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-save">
                        <SaveIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 4. 파일 내보내기 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-export">
                        <FileDownloadIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 5. 파일 가져오기 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-import">
                        <FileUploadIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 6. 초대 링크 복사 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-link">
                        <LinkIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 7. 다크/라이트 모드 전환 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-theme">
                        <BedtimeIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 8. 그리기 레이어 활성화 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-draw">
                        <GestureIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>
                </div>

                {/* 코드 에디터 및 출력 영역 */}
                <div className="min-w-[240px] h-full flex-grow">
                    {/* 
                        min-w-[240px]: 최소 너비 240px
                        h-full: 높이를 전체 높이로
                        flex-grow: 남는 공간에 대해, 해당 요소를 전부 채워줌
                    */}

                    {/* 코드 에디터 영역 */}
                    <div className="h-3/4 border-b-2 border-black">
                        {/* style={{ width: "1000px", height: '500px', border: '1px solid #ddd', marginBottom: '10px' }}> */}
                        <Editor
                            width="100%" // 부모 div의 크기에 맞게 100% 설정
                            height="100%"
                            defaultLanguage="c"
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                wordWrap: 'off', // 자동 줄 바꿈 비활성화
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
                    <div className="h-1/4">
                        <button onClick={handleRunCode}>Run Code</button>
                        <div className="">
                            {/* style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}> */}
                            <strong>Output:</strong>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 탭 */}
                <div className="min-w-[60px] h-full flex flex-col items-center border-l-2 border-black" style={{ backgroundColor: "#1E1E1E" }}>
                    {/* 
                        min-w-[60px]: 최소 너비 60px
                        h-full: 높이를 전체 높이로
                        flex: 내부 요소들을 플렉스 아이템으로
                        flex-col: 플렉스 컨테이너 내 주 축을 세로로
                        items-center: 플렉스 컨테이너 내 자식 요소들을 교차 축 기준 중앙 정렬 (flex-col에 의해 교차 축이 세로 축)
                        border-l-2: 왼쪽에 2px 두께의 테두리를 추가
                        border-black: 테두리 색상 변경
                    */}

                    {/* 1. 참여자 목록 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-menu">
                        <PersonIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 2. 채팅창 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-folder">
                        <ChatIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 3. AI 채팅창 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-save">
                        <SmartToyIcon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>

                    {/* 4. 친구 초대 버튼 */}
                    <button
                    className="my-2"
                    type="button"
                    id="left-export">
                        <PersonAddAlt1Icon className="text-gray-300" sx={{ fontSize: '2rem' }}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;