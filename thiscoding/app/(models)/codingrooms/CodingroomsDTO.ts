import { UUID } from "crypto";

// 기본 DTO
export interface CodingroomsDTO {
    id: number;
    uuid: UUID;
    title: string;
    value: string;
    headCount: number;
    language: string;
};

// 코드방 입장 시, 불러올 데이터
export interface CodingroomsGetData {
    roomId: number;
    language: string;
    codeId: string;
    value: string;
};

// 코드방 생성 시, 입력 데이터
export interface CodingroomsCreateData {
    title: string;
    content: string;
    language: string;
};

// 코드 생성 및 저장 시, 입력 데이터
// export interface CodeCreateData {
//     id: string | null;
//     roomId: number;
//     writerId: number;
//     fileName: string;
//     value: string;
// };

// 가져올 코드 값
export interface CodeGetData {
    id: string;
    writerId: number;
    fileName: string;
    value: string;
    saveDate: string;
};

// export interface FileTabs {
//     codeId: string;
//     fileName: string;
//     value: string;
// };

// 언어 별 초기 값
export const codeSnippets: Readonly<Record<string, string>> = {
    javascript: `/* JavaScript */\n\nconsole.log("Hello, World!")`,
    typescript: `/* TypeScript */\n\nconsole.log("Hello, World!")`,
    python: `# Python\n\nprint("Hello, World!")`,
    c: `/* C */\n#include <stdio.h>\n\nint main(int argc, char *argv[])\n{\n\tprintf("Hello, World!");\n\n\treturn 0;\n}`,
    cpp: `/* C++ */\n#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n\tcout << "Hello, World!" << endl;\n\n\treturn 0;\n}`,
    csharp: `/* C# */\nusing System;\n\nclass HelloWorld {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}`,
    java: `/* Java */\n\nclass Main {\n\tstatic public void main(String []args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
    ruby: `# Ruby\n\nputs "Hello, World!"`,
    go: `/* Go */\n\npackage main\n\nimport (\n\t"fmt"\n)\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}`,
    swift: `// Swift\n\nprint("Hello, World!")`
};