import { useState } from 'react';
import Messenger from './Messenger';
import CloseIcon from '@mui/icons-material/Close';

const ChatBtn = () => {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);

  const toggleMessenger = () => {
    setIsMessengerOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="h-[100px] w-[100px] rounded-full bg-[#fafafa] fixed bottom-10 right-10 flex justify-center items-center shadow"
        onClick={toggleMessenger}
      >
        {isMessengerOpen ? (
          <CloseIcon style={{ fontSize: 50, color: '#656565' }} />
        ) : (
          <img
            src="/svg/Messaging.svg"
            alt="Messaging Icon"
            width="50"
            height="50"
          />
        )}
      </button>
      <div className="absoulute h-[30px] w-[30px] bg-[#e64946]  fixed bottom-[118px] right-[45px] flex justify-center items-center  rounded-full text-[12px] text-[#ffffff]">
        99+
      </div>

      {isMessengerOpen && <Messenger />}
    </>
  );
};

export default ChatBtn;
