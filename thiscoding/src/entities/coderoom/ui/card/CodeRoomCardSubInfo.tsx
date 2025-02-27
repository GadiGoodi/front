import GroupsIcon from '@mui/icons-material/Groups';
import Face3Icon from '@mui/icons-material/FaceSharp';

interface CodeRoomCardSubInfoProps {
  headCount: number;
  nickname: string;
}
const CodeRoomCardSubInfo = ({
  headCount,
  nickname,
}: CodeRoomCardSubInfoProps) => {
  return (
    <div className="flex justify-between">
      <div className="text-[11px] flex justify-center items-center gap-[5px]">
        <GroupsIcon className="w-[20px] h-[20px]"></GroupsIcon>
        {headCount}/6
      </div>
      <div className="text-[11px] flex justify-center items-center gap-[2px] ">
        <Face3Icon className="w-[20px] h-[20px] rounded-[200]"></Face3Icon>
        {nickname}
      </div>
    </div>
  );
};

export default CodeRoomCardSubInfo;
