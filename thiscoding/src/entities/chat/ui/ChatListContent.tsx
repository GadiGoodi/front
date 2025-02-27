import { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';

interface ChatListContentProps {
  onChatSelect: (friendName: string) => void;
  chats: string[];
}

const ChatListContent: React.FC<ChatListContentProps> = ({
  onChatSelect,
  chats,
}) => {
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDropdownModalOpen, setDropdownModalOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => {
    setDropdownModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 드롭다운 외부를 클릭했을 때 드롭다운을 닫음
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdown = (event: React.MouseEvent) => {
    if (containerRef.current) {
      event.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left + 50;
      const offsetY = event.clientY - rect.top + 60;

      setModalPosition({ x: offsetX, y: offsetY });
      setDropdownModalOpen(true);
    }
  };

  const handleDoubleClick = (friend: string) => {
    onChatSelect(friend);
  };

  return (
    <>
      <div
        className="flex-col justify-center h-[360px] w-[300px] p-[12px] overflow-y-auto"
        ref={containerRef}
      >
        {chats.map((chat) => (
          <div
            key={chat}
            className="flex mb-[14px] items-center justify-between cursor-pointer"
            onDoubleClick={() => handleDoubleClick(chat)}
          >
            <button className="w-[38px] h-[38px] rounded-full bg-[#b6d286]"></button>
            <div
              className="w-[160px] cursor-default "
              onContextMenu={handleDropdown}
            >
              <div className="text-[13px] w-[130px] font-semibold text-[#333333]">
                {chat}
              </div>
              <div className="text-[12px] text-[#666666]">
                저 자바 너무 어려워요!
              </div>
            </div>
            <div>
              <div className="text-[10px] opacity-80">오전 12:40</div>
              <div className="float-end h-[15px] w-[15px] rounded-[200px] bg-[#FC7373] text-[10px] text-white flex justify-center items-center">
                1
              </div>
            </div>
          </div>
        ))}
      </div>
      {isDropdownModalOpen && (
        <Dropdown position={modalPosition} ref={dropdownRef} />
      )}
    </>
  );
};

export default ChatListContent;
