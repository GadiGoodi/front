import postQnaApi from "@/app/(apis)/mypage/postQna/postQnaApi";
import { PostQnaType } from "@/app/(models)/users/PostQnaType";
import { useState } from "react";

const usePostQna = () => {
  const { getQnaList } = postQnaApi();

  const [postQnaList, setPostQnaList] = useState<Array<PostQnaType>>([]);



  const fetchQnaList = async (id: number) => {
    const result = await getQnaList(id)
    setPostQnaList(result);
  }


  return {
    fetchQnaList, postQnaList
  }
}
export default usePostQna;