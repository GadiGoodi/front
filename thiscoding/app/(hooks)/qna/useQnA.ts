import qnaApi from "@/app/(apis)/qna/qnaApi";
import { QnaListType } from "@/app/(models)/qna/QnaListType";
import { url } from "inspector";
import { useRef, useState } from "react";
import Swal from "sweetalert2"
const useQnA = () => {

  //QnA Api
  const { postQnA, urlImage, getQnA } = qnaApi();

  //QnA 작성 데이터 state
  const [image, setImage] = useState('')
  const [language, setLanguage] = useState("JavaScript / TypeScript");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(" ");
  const [markDown, setMarkDown] = useState(" ");

  const [qnaList, setQnaList] = useState<Array<QnaListType>>([])


  //QnA 작성 데이터
  const data = {
    language: language,
    title: title,
    content: content,
    image: image
  }


  //QnA 전체 조회
  const getQnaList = async () => {
    const result = await getQnA();
    console.log(result);
    setQnaList(result);
  }

  //QnA 작성
  const createQnA = async () => {
    const result = await postQnA(data);
    console.log(data);
    return result;


  }

  //ToastUi Editor 이미지 Base64 > Url 반환
  const getUrlImage = async (data: FormData) => {
    const result = await urlImage(data)
    console.log(data);
    return result;
  }

  return {
    content, image, setMarkDown, data, markDown, qnaList,
    setLanguage, setTitle, setContent, getQnaList,
    setImage, createQnA, getUrlImage
  }

}
export default useQnA;