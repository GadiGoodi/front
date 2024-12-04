import AdminApi from "@/app/(apis)/admin/adminApi";
import { AdminNoticesDetailDTO, NoticePostData } from "@/app/(models)/admin/adminNotices/AdminNoticesDetailDTO";
import { useState } from 'react';

const useAdmin = () => {

  const [postNoticesDetail, setPostNoticesDetail] = useState<AdminNoticesDetailDTO>();
  const [noticesTitle, setNoticesTitle] = useState<string>("")
  const [noticesContent, setNoticesContent] = useState<string>("")
  const [noticesCategory, setNoticesCategory] = useState<string>("")


  const { postAdminNotices, getAdminNoticesDetail, deleteAdminNotices, updateAdminNotices } = AdminApi();


  const noticesTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoticesTitle(e.target.value);
  }

  const noticesContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoticesContent(e.target.value);
  }

  const selectCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoticesCategory(e.target.value);
  }


  const noticeData: NoticePostData = {
    title: noticesTitle,
    content: noticesContent,
    category: noticesCategory,
  }

  const createAdminNotices = async () => {
    const result = await postAdminNotices(noticeData);
    console.log("공지사항 작성 성공!")
  }
  const AdminNoticesDetail = async (id: number) => {
    const result = await getAdminNoticesDetail(id);
    setPostNoticesDetail(result);
    console.log("공지사항 상세조회 성공!")
  }

  const removeAdminNotices = async (id: number) => {
    const result = await deleteAdminNotices(id);
    // if (result.status === 204) {
    console.log("공지사항 삭제 성공!")
    // } else {
    //   console.error("공지사항 삭제 실패!")
    // }
  }

  const modifyAdminNotices = async (id: number, data: any) => {
    console.log(typeof id);
    console.log(data);
    const result = await updateAdminNotices(id, data);
    console.log("공지사항 수정 성공!")
  }

  return {
    noticesTitleHandler, modifyAdminNotices, noticesContentHandler, selectCategoryHandler,
    createAdminNotices, postNoticesDetail, AdminNoticesDetail, removeAdminNotices,
    noticeData
  }
}

export default useAdmin;