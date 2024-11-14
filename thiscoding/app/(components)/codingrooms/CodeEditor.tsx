import "@/app/globals.css"
import Editor, { OnChange } from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor: React.FC = () => {
    // const [code, setCode] = useState<string>("// 여기에 Java 코드를 작성하세요.");
    // const [output, setOutput] = useState<string>("");

    // const handleEditorChange: OnChange = (value) => {
    //     setCode(value || '');
    // };
    
    // const handleRunCode = () => {
    //     try {
    //         // TypeScript 코드를 실행할 때는 transpiling이 필요함
    //         // eval은 보안에 취약하므로 프로덕션에서는 다른 방법 권장
    //         // 브라우저에서는 TypeScript를 Java로 컴파일해야 함
    //         const result = eval(code);
    //         setOutput(String(result));
    //     } catch (error) {
    //         setOutput(`Error: ${(error as Error).message}`);
    //     }
    // };

    // return (
    //     <>
    //         {/* 전체 영역 */}
    //         <div className="h-screen w-full">
    //             {/* 에디터 */}
    //             <Editor
    //                 height="100%"
    //                 defaultLanguage="java" // 사용할 언어 (예: JavaScript, Python, etc.)
    //                 value={code}
    //                 onChange={handleEditorChange}
    //                 theme="vs-dark" // 테마 (light, vs-dark 등)
    //             />
    //         </div>
    //         <button onClick={handleRunCode}>Run Code</button>
    //         <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
    //             <strong>Output:</strong>
    //             <pre>{output}</pre>
    //         </div>
    //     </>
    // )
    const [code, setCode] = useState<string>('// 여기에 코드를 작성하세요.');
    const [output, setOutput] = useState<string>('');
  
    const handleEditorChange: OnChange = (value) => {
        setCode(value || '');
    };
  
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
            <div className="h-screen w-full">
                <div className="h-1/2">
                    {/* style={{ width: "1000px", height: '500px', border: '1px solid #ddd', marginBottom: '10px' }}> */}
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
                        value={code}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                        options={{
                            wordWrap: 'off', // 자동 줄 바꿈 비활성화
                            scrollBeyondLastLine: true, // 마지막 줄 이후로 스크롤 가능
                            scrollBeyondLastColumn: 10,
                            // horizontalScrollbarSize: 12, // 수평 스크롤바 크기
                            minimap: {
                                enabled: true, // 미니맵 활성화
                            },
                        }}
                    />
                </div>

                <div>
                    <button onClick={handleRunCode}>Run Code</button>
                    <div className="">
                        {/* style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}> */}
                        <strong>Output:</strong>
                        <pre>{output}</pre>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodeEditor;