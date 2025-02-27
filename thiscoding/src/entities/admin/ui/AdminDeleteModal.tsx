'use client';

import { Dispatch, SetStateAction } from 'react';

interface UserReportModalProps {
  setIsAdminDelete: Dispatch<SetStateAction<boolean>>;
}

const AdminDeleteModal = ({ setIsAdminDelete }: UserReportModalProps) => {
  return (
    <>
      <div className="w-[400] h-[250] bg-[#FFFFFF] rounded-lg flex-col justify-center items-center">
        <div className="text-[#EA4B48] text-2xl font-bold pt-5 ml-5 border-b pb-5">
          (닉네임)님 글 삭제
        </div>
        <div className="flex-col justify-center items-center ml-12">
          <div className="flex-col justify-start my-4">
            <div className="mb-2">정지 횟수</div>
            <div className="border text-[#999999] border-[#E6E6E6] w-[300] h-[40] px-5 py-2 rounded-md shadow-xl">
              1회
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mt-5">
            <button className="bg-[#2388FF] w-[130] h-[45] rounded-full text-white">
              삭제 및 정지
            </button>
            <button
              onClick={() => setIsAdminDelete(false)}
              className="bg-[#FC7373] w-[130] h-[45] rounded-full text-white"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDeleteModal;
