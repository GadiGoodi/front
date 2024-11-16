import { useState } from 'react';
import Profile from './Profile';
interface FriendListContentProps {
  onFriendClick: (friendName: string) => void;
  onChangeState: (newState: string) => void;
  onProfileClick: () => void;
  friends: string[];
}

const FriendListContent: React.FC<FriendListContentProps> = ({
  onFriendClick,
  onChangeState,
  friends,
}) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const handleDoubleClick = () => {
    setProfileModalOpen(true); //
  };

  const closeModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <>
      <div className="flex-col justify-center h-[360px] w-[300px] p-[12px] overflow-y-auto">
        {friends.map((friend) => (
          <div
            key={friend}
            className="flex items-center justify-start gap-[12px] mb-[10px] "
            // onClick={() => onFriendClick(friend)}
          >
            <div className="flex items-center" onClick={handleDoubleClick}>
              <button className="w-[38px] h-[38px] rounded-[200px] bg-[#b6d286]"></button>
            </div>

            <div className="flex-col self-center">
              <div className="text-[14px] w-[130px] font-semibold text-[#333333]">
                {friend}
              </div>
              <div className="text-[12px] opacity-50">카공하실 분</div>
            </div>

            <div className="flex gap-1 ">
              <div className="px-[2px] rounded-sm  text-black bg-gradient-to-br from-[rgb(245,219,153)] 0% via-[#ffd500] 10% to-[#d8ad8e] 100% text-[7px]">
                JS
              </div>
              <div className="px-[2px] rounded-sm text-white bg-[#5382A1] 100% text-[7px]">
                Java
              </div>
              <div className="px-[2px] rounded-sm text-white bg-gradient-to-br from-[rgb(99,113,245)] 0% via-[#4e55b7] 10% to-[#593ac0] 100% text-[7px]">
                React
              </div>
            </div>
          </div>
        ))}
      </div>
      {isProfileModalOpen && (
        <Profile
          closeModal={closeModal}
          onFriendClick={onFriendClick}
          onChangeState={onChangeState}
        />
      )}
    </>
  );
};

export default FriendListContent;
