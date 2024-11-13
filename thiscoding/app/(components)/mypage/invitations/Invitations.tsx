import '@/app/globals.css';
import InvitationsContents from './InvitaionsContent';
import Pagination from '@mui/material/Pagination';
const Invitations = () => {
  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB]">
        <div className="grid grid-cols-4 gap-x-[50px] gap-y-[36px] p-[40px] mx-[10px]">
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
          <InvitationsContents />
        </div>
        <div className="flex justify-center items-center ">
          <Pagination
            count={1}
            variant="outlined"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {},
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#0095eb', // 클릭 시 배경색
                color: '#ffffff', // 클릭 시 글자색
                borderColor: '#ffffff',
                borderRadius: '12px',
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: '#e0f7ff', // 호버 시 배경색
                borderColor: '#ffffff',
                borderRadius: '12px',
              },
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Invitations;
