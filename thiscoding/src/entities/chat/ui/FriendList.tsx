import { Dispatch, SetStateAction } from 'react';
import FriendListContent from './FriendListContent';
interface FriendListProps {
  onFriendClick: (friendName: string) => void;
  onChangeState: (newState: string) => void;
  onProfileClick: () => void;
}
const FriendList: React.FC<FriendListProps> = ({
  onFriendClick,
  onChangeState,
  onProfileClick,
}) => {
  const friends = [
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
      <FriendListContent
        onFriendClick={onFriendClick}
        onProfileClick={onProfileClick}
        onChangeState={onChangeState}
        friends={friends}
      />
    </>
  );
};

export default FriendList;
