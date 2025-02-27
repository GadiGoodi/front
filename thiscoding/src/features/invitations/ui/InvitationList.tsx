'use client';

import { CodeRoomCard } from '@/entities/coderoom/ui/card';
import { useInvitations } from '@/entities/coderoom/queries';
import { usePagination } from '@/shared/hooks/usePagination';
import { Pagination } from '@/shared/ui/Pagination';
import { MyPageContainer } from '@/shared/ui/common/mypage-container';
import {
  useAcceptInvitations,
  useDeclineInvitations,
} from '../mutations/mutations';

const InvitationList = () => {
  const { page, setPage } = usePagination();
  const {
    data: { content, totalElements, currentPage, totalPage, pageSize },
  } = useInvitations(page);
  const { mutate: accept } = useAcceptInvitations();
  const { mutate: decline } = useDeclineInvitations();

  const handleAccept = (alarmId: number, codeRoomId: number) => {
    accept({ alarmId, codeRoomId });
  };

  const handleDecline = (alarmId: number, codeRoomId: number) => {
    decline({ alarmId, codeRoomId });
  };

  return (
    <MyPageContainer>
      <div className="grid grid-cols-4 gap-x-[50px] gap-y-[36px] p-[40px] mx-[10px]">
        {content?.map((invitations) => (
          <CodeRoomCard
            key={invitations.codeRoomId}
            invitations={invitations}
            leftAction={handleAccept}
            rightAction={handleDecline}
          />
        ))}
      </div>
      <Pagination
        totalElements={totalElements}
        currentPage={currentPage}
        totalPage={totalPage}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </MyPageContainer>
  );
};

export default InvitationList;
