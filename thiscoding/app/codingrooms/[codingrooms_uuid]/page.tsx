'use client';
import '@/app/globals.css';
import CodeEditor from '../../(components)/codingrooms/[codingrooms_uuid]/CodeEditor';

export default function Home() {
  return (
    <div>
      <div className="flex">
        <CodeEditor />
      </div>
    </div>
  );
}
