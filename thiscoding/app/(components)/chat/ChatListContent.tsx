interface ChatListContentProps {
  onChatSelect: (friendName: string) => void;
  chats: string[];
}

const ChatListContent: React.FC<ChatListContentProps> = ({
  onChatSelect,
  chats,
}) => {
  const handleDoubleClick = (friend: string) => {
    onChatSelect(friend); // 더블클릭 시 채팅 시작
  };
  return (
    <div className="flex-col justify-center   h-[360px] w-[300px] p-[12px] overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat}
          className="flex mb-[14px] items-center justify-between cursor-pointer"
          onDoubleClick={() => handleDoubleClick(chat)}
        >
          <button className="w-[38px] h-[38px] rounded-full bg-[#b6d286]"></button>
          <div className="w-[160px]">
            <div className="text-[13px] w-[130px] font-semibold text-[#333333]">
              {chat}
            </div>
            <div className="text-[12px] text-[#666666] ">
              저 자바 너무 어려워요!
            </div>
          </div>
          <div className="">
            <div className="text-[10px] opacity-80">오전 12:40</div>
            <div className="float-end h-[15px] w-[15px] rounded-[200px] bg-[#FC7373] text-[10px] text-white flex justify-center items-center">
              1
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListContent;
