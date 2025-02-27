import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import { IconText } from '@/shared/components/common/icon-text';

interface SubInfoProps {
  nickname: string;
  createDate: string;
  viewCount: number;
  likeCount: number | null;
  answerCount: number | null;
}

const SubInfo = ({
  nickname,
  createDate,
  viewCount,
  likeCount = null,
  answerCount,
}: SubInfoProps) => {
  return (
    <>
      <div className="flex justify-between text-xs mx-4">
        <div className="flex gap-5 mt-2 text-gray-400">
          <div>{nickname}</div>
          <div>{createDate}</div>
        </div>
        <div className="flex gap-5">
          <IconText Icon={RemoveRedEyeIcon} iconSize={20} fontSize={12}>
            {viewCount}
          </IconText>
          {likeCount != null ? (
            <IconText Icon={ThumbUpIcon} iconSize={15} fontSize={12}>
              {likeCount}
            </IconText>
          ) : (
            <IconText Icon={ChatIcon} iconSize={18} fontSize={12}>
              {answerCount}
            </IconText>
          )}
        </div>
      </div>
    </>
  );
};

export default SubInfo;
