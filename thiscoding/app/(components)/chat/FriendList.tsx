import { Dispatch, SetStateAction } from 'react';

interface FriendListProps {
  onFriendClick: (friendName: string) => void;
  onChangeState: (newState: string) => void;
}
const FriendList: React.FC<FriendListProps> = ({
  onFriendClick,
  onChangeState,
}) => {
  const friends = ['Nell', 'John', 'Alice'];

  return (
    <>
      <div className="p-[13px] flex justify-between">
        <button
          className="w-[110px] text-[13px] font-bold text-[#656565]"
          onClick={() => onChangeState('FriendList')}
        >
          친구
        </button>
        <button
          className="w-[110px] text-[13px] font-bold text-[#BFC0C1]"
          onClick={() => onChangeState('ChatList')}
        >
          채팅
        </button>
      </div>
      <div className="border-b-[1px] border-b-[#ebebeb]"></div>

      <div className="m-[20px]">
        {friends.map((friend) => (
          <div
            key={friend}
            className="flex items-center justify-between mb-[10px] cursor-pointer"
            onClick={() => onFriendClick(friend)} // 친구 클릭 시 채팅 시작
          >
            <button className="w-[36px] h-[36px] rounded-[200px] bg-black"></button>
            <div className="text-[14px] w-[130px] font-semibold text-[#333333]">
              {friend}
            </div>
            <button className="w-[20px] h-[20px]">
              <img
                src="/Cells.svg"
                alt="Messaging Icon"
                width="50"
                height="50"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendList;
