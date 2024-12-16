import { Editor } from "@toast-ui/react-editor"
import { MutableRefObject, RefObject, useCallback, useRef } from "react";
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import useQnA from "@/app/(hooks)/qna/useQnA";

const ToastUi = ({ editorRef, onChangeEditor }: any) => {
  type HookCallback = (url: string, text?: string) => void
  const { getUrlImage, setImage, image, content } = useQnA();
  // const editorRef = useRef<any>(null)
  const toolbarItems = [['heading', 'bold', 'italic', 'strike'],
  ['hr'], ['ul', 'ol', 'task'], ['table', 'link'],
  ['image'], ['code'], ['codeblock'], ['scrollSync']]

  const onUploadImage = async (blob: Blob | File, callback: HookCallback) => {
    const path = "post";
    // blob은 base64 인코딩된 이미지 파일
    const formData = new FormData()
    console.log(blob);
    formData.append('image', blob)
    formData.append('path', path)

    try {
      const imageRes = await getUrlImage(formData);
      const image_URL = imageRes.data.imageURL
      setImage(image_URL)

      // 글 화면에 이미지 띄우기
      callback(image_URL, 'image')
    } catch {
      console.error();
    }
  }

  return (
    <>
      <Editor ref={editorRef}
        initialValue={content} // 글 수정 시 사용
        initialEditType='wysiwyg' // wysiwyg & markdown 
        hideModeSwitch={false}
        previewStyle="vertical"
        height='400px'
        theme={''} // '' & 'dark' 
        usageStatistics={false}
        toolbarItems={toolbarItems}
        hooks={{
          addImageBlobHook: onUploadImage
        }}
        plugins={[
          colorSyntax,
          [codeSyntaxHighlight, { highlighter: Prism }], // 하이라이터 등록
        ]}
        onChange={onChangeEditor}
      />

      {/* <button onClick={showContent}>Write</button> */}
    </>
  )
}
export default ToastUi;