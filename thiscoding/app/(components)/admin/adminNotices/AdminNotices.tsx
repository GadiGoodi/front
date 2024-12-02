import "@/app/globals.css"
import AdminNoticesContent from "./AdminNoticesContent";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdminNoticesListDTO } from "@/app/(models)/admin/adminNotices/adminNoticesListDTO";
const AdminNotices = () => {

  const [NoticesList, setNoticesList] = useState<Array<AdminNoticesListDTO>>([]);

  useEffect(() => {
    getNoticesList();
  }, []);


  const page = 0;

  //관리자 공지사항 목록 조회 API
  const getNoticesList = () => {
    const result = axios.get(`http://localhost:8080/api/admin/notices?page=${page}`)
      .then(res => {
        console.log(res.data.content);
        setNoticesList(res.data.content);
      }).catch(err => {
        console.log("에러 메세지 : " + err);
      })
    return result;

  }
  return (
    <>
      <>
        <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB] relative">
          <div className="absolute flex justify-end mt-3 right-[50] w-full font-thin">개별 문의 : abc123@naver.com</div>
          <table className="w-[850] ml-[50] mt-12 mr-[50]">
            <thead>
              <tr className="border-t border-b border-black h-[50px]">
                <th className="px-4 py-2 align-middle">카테고리</th>
                <th className="px-4 py-2 align-middle w-[380]">제목</th>
                <th className="px-4 py-2 align-middle w-[200]">날짜</th>
                <th className="px-4 py-2 align-middle">조회수</th>
                <th className="px-4 py-2 align-middle">삭제</th>
              </tr>
            </thead>
            {NoticesList?.length !== 0 ?
              <>
                <tbody className="cursor-pointer">
                  {NoticesList?.map(notices => (
                    <AdminNoticesContent
                      key={notices.id}
                      notices={notices}
                    />
                  ))}
                </tbody>
              </>
              : <tbody>
                <></>
              </tbody>
            }
          </table>
          <Link href="/admin/notices/post-notices" className="w-[90] h-[40] border rounded-2xl flex justify-center items-center border-black absolute right-[50] bottom-[30] text-[#0095E8]">
            글쓰기
          </Link>
        </div>
      </>
    </ >
  )
}
export default AdminNotices;