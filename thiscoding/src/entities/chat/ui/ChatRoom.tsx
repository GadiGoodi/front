import React, { useState } from 'react';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
interface ChatRoomProps {
  onBack: () => void;
}
const ChatRoom: React.FC<ChatRoomProps> = ({ onBack }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="h-[420px]">
      <div className="p-[12px] flex justify-between items-center ">
        <button className="">
          <ArrowBackIosNewSharpIcon
            fontSize="small"
            className="w-[20px] h-[20px]"
            onClick={onBack}
          />
        </button>
        <div className="w-[26px] h-[26px] bg-[#b6d286] rounded-full">
          {/* <img src="/Cells.svg" alt="Messaging Icon" width="26" height="26" /> */}
        </div>
        <div className="w-[220px] text-[14px] font-bold">강아지코딩</div>
      </div>
      <div className="border-b-[1px] border-b-[#ebebeb]"></div>

      <div className="overflow-y-scroll h-[300px] p-[10px] flex flex-col  gap-[12px] flex-grow ">
        <div className="m-[10px] flex self-center absolute top-[50px]">
          <div className="rounded-[10px] p-[2px] text-center w-[110px] bg-[#ebebeb] opacity-50 text-[10px]">
            2024년 10월 22일(화)
          </div>
        </div>
        <div className="flex  justify-end gap-[3px] items-end">
          <div className="text-[10px] opacity-50">오전 12:40</div>
          <div className=" bg-gradient-to-br from-[rgb(218,108,125)] 0% via-[#e84480] 10% to-[#df188c] 100% self-end max-w-[200px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-[15px] p-[7px] text-white text-[12px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요?
          </div>
        </div>
        <div className="flex  justify-end gap-[3px] items-end">
          <div className="text-[10px] opacity-50">오전 12:41</div>
          <div className="bg-gradient-to-br from-[rgb(209,129,240)] 0% via-[#9979d1] 10% to-[#7483c6] 100% self-end max-w-[200px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-[15px] p-[7px] text-white text-[12px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요?
          </div>
        </div>
        <div className="flex  justify-end gap-[3px] items-end">
          <div className="text-[10px] opacity-50">오전 12:41</div>
          <div className="bg-gradient-to-br from-[rgb(189,205,130)] 0% via-[#7cbc8e] 10% to-[#bbdb93] 100% self-end max-w-[200px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-[15px] p-[7px] text-white text-[12px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요?
          </div>
        </div>
        <div className="flex  justify-end gap-[3px] items-end">
          <div className="text-[10px] opacity-50">오전 12:42</div>
          <div className="bg-[#0095E8] self-end max-w-[200px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-[15px] p-[7px] text-white text-[12px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요?
          </div>
        </div>
        <div className=" flex flex-row-reverse justify-end items-end gap-[3px]">
          <div className="text-[10px] opacity-50">오전 12:43</div>
          <div className="bg-gray-100 self-start max-w-[200px]  rounded-tl-2xl rounded-tr-2xl rounded-br-2xl px-[15px] p-[7px] text-black text-[12px]">
            HashMap은 비동기화되어 빠르고
          </div>
        </div>

        <div className=" flex flex-row-reverse justify-end items-end gap-[3px]">
          <div className="text-[10px] opacity-50">오전 12:44</div>
          <div className="bg-gray-100 self-start max-w-[200px]  rounded-tl-2xl rounded-tr-2xl rounded-br-2xl px-[15px] p-[7px] text-black text-[12px]">
            HashMap은 비동기화되어 빠르고
          </div>
        </div>

        <div className=" flex  flex-row-reverse justify-end items-end gap-[3px]">
          <div className="text-[10px] opacity-50">오전 12:45</div>
          <div className="bg-gray-100 self-start max-w-[200px] rounded-tr-2xl rounded-tl-2xl rounded-br-2xl px-[15px] p-[7px] text-black text-[12px]">
            Hashtable은 동기화되어 스레드에 안전합니다.
          </div>
        </div>
        <div className=" flex flex-row-reverse justify-end items-end gap-[3px]">
          <div className="text-[10px] opacity-50">오전 12:46</div>
          <div className="bg-gray-100 self-start max-w-[200px] rounded-tr-2xl rounded-tl-2xl rounded-br-2xl px-[15px] p-[7px] text-black text-[12px]">
            Hashtable은 동기화되어 스레드에 안전합니다.
          </div>
        </div>
        <div className="flex  justify-end gap-[3px] items-end">
          <div className="flex flex-col items-end">
            <div className="text-[10px] opacity-50">안읽음</div>
            <div className="text-[10px] opacity-50">오전 12:42</div>
          </div>

          <div className="bg-[#0095E8] self-end max-w-[200px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-[15px] p-[7px] text-white text-[12px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요? 자바에서 HashMap과
            Hashtable의 차이는 무엇인가요?
          </div>
        </div>
      </div>
      <div className="p-[10px] flex justify-center items-center">
        <textarea
          className="text-[12px] w-full p-2 resize-none overflow-hidden bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 pr-[35px]"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={handleInputChange}
        ></textarea>

        <button
          className={`right-[20px] flex justify-center items-center absolute w-[20px] h-[20px] rounded-[200px] 
          ${message.trim() === '' ? 'bg-gray-400' : 'bg-[#0095E8]'}`}
          disabled={message.trim() === ''} // 텍스트가 없으면 버튼 비활성화
        >
          <ArrowUpwardSharpIcon sx={{ color: 'white', fontSize: 15 }} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
