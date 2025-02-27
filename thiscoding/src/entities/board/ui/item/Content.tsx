import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

interface ContentProps {
  content: string;
}
const Content = ({ content }: ContentProps) => {
  return (
    <div className="text-xs mt-2 mx-4 h-[20] flex justify-start ">
      <Viewer
        width="100%"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        initialValue={content}
        theme="dark"
        className="text-xs p-0 m-0 whitespace-nowrap overflow-hidden text-ellipsis"
      />
    </div>
  );
};

export default Content;
