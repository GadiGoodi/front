import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import HomeIcon from '@mui/icons-material/Home';
import ChatRoom from './ChatRoom';
interface ProfileProps {
  closeModal: () => void;
  onFriendClick: (friendName: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ closeModal, onFriendClick }) => {
  return (
    <div className="flex-col gap-[10px] flex items-center justify-center fixed bottom-[140px] right-[320px] bg-[#c5d6b9] w-[300px] h-[300px] p-[10px] rounded-md">
      <button
        className="w-[20px] h-[20px] text-white self-end "
        onClick={closeModal}
      >
        <CloseIcon fontSize="small" />
      </button>
      <div className="rounded-full w-[120px] h-[120px] bg-[#b6d286]"></div>

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
      <div className="flex flex-col justify-center items-center">
        <div className="text-[16px] text-white">원진</div>
        <div className="text-[12px] text-white opacity-80">카공하실 분</div>
      </div>

      <div className="flex gap-12 ">
        <div
          className="flex flex-col gap-[5px] cursor-pointer"
          onClick={onFriendClick}
        >
          <div className="flex items-center justify-center rounded-full w-[50px] h-[40px ">
            <SmsIcon style={{ fontSize: 20, color: '#ffffff' }} />
          </div>
          <div className="text-center text-[10px] text-white">1:1 채팅</div>
        </div>
        <div className="flex flex-col gap-[5px] cursor-pointer">
          <div className="flex items-center justify-center rounded-full w-[50px] h-[40px">
            <HomeIcon style={{ fontSize: 20, color: '#ffffff' }} />
          </div>
          <div className="text-center text-[10px] text-white">HOME</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
