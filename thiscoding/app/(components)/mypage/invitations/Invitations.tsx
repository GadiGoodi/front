import '@/app/globals.css';
import InvitationsContents from './InvitaionsContent';
import Pagination from '../../Pagination';
import ChatBtn from '../../chat/ChatBtn';

const Invitations = () => {
  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB] shadow">
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
        <Pagination />
        <ChatBtn />
      </div>
    </>
  );
};
export default Invitations;
