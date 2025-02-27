import { useState } from 'react';
import FriendList from './FriendList';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const Messenger = () => {
  const [currentState, setCurrentState] = useState<string>('FriendList');
  const [previousState, setPreviousState] = useState<string>('');
  const [profileSelect, setProfileSelect] = useState<boolean>(false);

  const handleStateChange = (newState: string) => {
    setPreviousState(currentState); // 현재 상태를 이전 상태로 저장
    setCurrentState(newState);
  };

  const handleProfileSelect = () => {
    setProfileSelect(!profileSelect);
  };

  const handleChatSelect = () => {
    handleStateChange('ChatRoom');
  };

  const handleFriendSelect = () => {
    handleStateChange('ChatRoom');
  };

  const handleBack = () => {
    setCurrentState(previousState); // 이전 상태로 돌아가기
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-[300px] h-[440px] bg-[#fafafa] rounded-xl fixed bottom-[190px] right-[40px] drop-shadow-md">
        {currentState === 'FriendList' && (
          <FriendList
            onFriendClick={handleChatSelect}
            onChangeState={handleStateChange}
            onProfileClick={handleProfileSelect}
          />
        )}
        {currentState === 'ChatList' && (
          <ChatList
            onChatSelect={handleChatSelect}
            onChangeState={handleStateChange}
          />
        )}
        {currentState === 'ChatRoom' && <ChatRoom onBack={handleBack} />}
      </div>
      <div className="w-0 h-0 border-solid border-t-[35px] border-r-[15px] border-b-0 border-l-[15px] border-t-[#fafafa] border-r-transparent border-b-transparent border-l-transparent fixed bottom-[155px] right-[65px] drop-shadow-sm"></div>
    </div>
  );
};

export default Messenger;
