'use client';

import AdminApi from '@/entities/admin/apis/adminApi';
import {
  AdminNoticesDetailDTO,
  NoticePostData,
} from '@/entities/admin/types/AdminNoticesDetailDTO';
import { useState } from 'react';

const useAdmin = () => {
  const [postNoticesDetail, setPostNoticesDetail] =
    useState<AdminNoticesDetailDTO>();
  const defaultNoticeData: NoticePostData = {
    title: '',
    content: '',
    category: '',
  };
  const [noticeData, setNoticeData] = useState(defaultNoticeData);

  const {
    postAdminNotices,
    getAdminNoticesDetail,
    deleteAdminNotices,
    updateAdminNotices,
  } = AdminApi();

  const createAdminNotices = async () => {
    const result = await postAdminNotices(noticeData);
    console.log('공지사항 작성 성공!');
  };
  const AdminNoticesDetail = async (id: number) => {
    const result = await getAdminNoticesDetail(id);
    setPostNoticesDetail(result);
    console.log('공지사항 상세조회 성공!');
  };

  const removeAdminNotices = async (id: number) => {
    const result = await deleteAdminNotices(id);
    // if (result.status === 204) {
    console.log('공지사항 삭제 성공!');
    // } else {
    //   console.error("공지사항 삭제 실패!")
    // }
  };

  const modifyAdminNotices = async (id: number, data: any) => {
    console.log(typeof id);
    console.log(data);
    const result = await updateAdminNotices(id, data);
    console.log('공지사항 수정 성공!');
  };

  return {
    modifyAdminNotices,
    setNoticeData,
    createAdminNotices,
    postNoticesDetail,
    AdminNoticesDetail,
    removeAdminNotices,
    noticeData,
  };
};

export default useAdmin;
