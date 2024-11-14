import { Dispatch, SetStateAction } from 'react';

interface ChatListProps {
  onChatSelect: (friendName: string) => void;
  onChangeState: (newState: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect, onChangeState }) => {
  const chats = ['Nell', 'John', 'Alice'];

  const handleDoubleClick = (friend: string) => {
    onChatSelect(friend); // 더블클릭 시 채팅 시작
  };

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

      <div className="m-[20px]">
        {chats.map((chat) => (
          <div
            key={chat}
            className="flex items-center justify-between mb-[10px] cursor-pointer"
            onDoubleClick={() => handleDoubleClick(chat)}
          >
            <button className="w-[36px] h-[36px] rounded-[200px] bg-black"></button>
            <div className="w-[140px]">
              <div className="text-[13px] w-[130px] font-semibold text-[#333333]">
                {chat}
              </div>
              <div className="text-[12px] text-[#666666] ">
                저 자바 너무 어려워요!
              </div>
            </div>
            <div className="h-[20px] w-[20px] rounded-[200px] bg-[#0095E8] text-[12px] text-white flex justify-center items-center">
              1
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatList;
