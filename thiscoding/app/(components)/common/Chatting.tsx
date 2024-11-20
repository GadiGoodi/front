'use client';

import { PiChatsCircleFill } from 'react-icons/pi';
import '@/app/globals.css';

const Chatting = () => {
  return (
    <>
      <div className="fixed bottom-0 right-[60px] p-4 ">
        <button className="bg-[#D9D9D9] rounded-full w-[50px] h-[50px] flex items-center justify-center  shadow-lg">
          <PiChatsCircleFill
            className="transform"
            style={{ color: '#656565', fontSize: '20px' }}
          />
        </button>
      </div>
    </>
  );
};

export default Chatting;
