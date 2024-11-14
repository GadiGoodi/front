import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import ArrowBackIosNewSharpIcon from '@mui/icons-material/ArrowBackIosNewSharp';
interface ChatRoomProps {
  onBack: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onBack }) => {
  return (
    <div>
      <div className="p-[13px] flex justify-between items-center">
        <button className="">
          <ArrowBackIosNewSharpIcon
            fontSize="small"
            className="w-[20px] h-[20px]"
            onClick={onBack}
          />
        </button>
        <div className="button">
          <img src="/Cells.svg" alt="Messaging Icon" width="26" height="26" />
        </div>
        <div className="text-[#656565] w-[165px] text-[12px] font-bold">
          강아지코딩
        </div>
      </div>
      <div className="border-b-[1px] border-b-[#ebebeb]"></div>
      <div className="h-[268px]">
        <div className="m-[10px] flex justify-center ">
          <div className="rounded-[10px] p-[2px] text-center w-[110px] bg-[#ebebeb] text-[9px]">
            2024년 10월 22일(화)
          </div>
        </div>
        <div className="m-[10px] flex flex-col justify-end gap-[10px] h-[180px]">
          <div className="bg-[#0095E8] self-end max-w-[200px] rounded-[50px] px-[15px] p-[7px] text-white text-[10px]">
            자바에서 HashMap과 Hashtable의 차이는 무엇인가요?
          </div>
          <div className="bg-[#ebebeb] self-start max-w-[200px] rounded-[50px] px-[15px] p-[7px] text-black text-[10px]">
            HashMap은 비동기화되어 빠르고
          </div>
          <div className="bg-[#ebebeb] self-start max-w-[200px] rounded-[50px] px-[15px] p-[7px] text-black text-[10px]">
            Hashtable은 동기화되어 스레드에 안전합니다.
          </div>
          <div className=""></div>
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            className="w-[220px] p-[10px] rounded-[50px] bg-[#ebebeb] text-[9px]"
            placeholder="메세지를 입력하세요."
          />
          <button className="right-[20px] flex justify-center items-center absolute w-[20px] h-[20px] bg-[#0095E8] rounded-[200px]">
            <ArrowUpwardSharpIcon
              sx={{ color: 'white', fontSize: 15 }}
            ></ArrowUpwardSharpIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
