import { Dispatch, SetStateAction } from 'react';
import ChatListContent from './ChatListContent';

interface ChatListProps {
  onChatSelect: (friendName: string) => void;
  onChangeState: (newState: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect, onChangeState }) => {
  const chats = [
    '시언',
    '혜리',
    '원진',
    '재원',
    '인수',
    '문상환',
    '남궁성',
    '김영한',
    '강요천',
  ];

  return (
    <>
      <div className="p-[13px] flex justify-between">
        <button
          className="w-[110px] text-[13px] font-bold text-[#BFC0C1]"
          onClick={() => onChangeState('FriendList')} // 친구 리스트로 변경
        >
          친구
        </button>
        <button
          className="w-[110px] text-[13px] font-bold text-[#656565]"
          onClick={() => onChangeState('ChatList')}
        >
          채팅
        </button>
      </div>
      <div className="border-b-[1px] border-b-[#ebebeb]"></div>
      <ChatListContent onChatSelect={onChatSelect} chats={chats} />
    </>
  );
};

export default ChatList;
