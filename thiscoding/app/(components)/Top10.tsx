import VisibilityIcon from '@mui/icons-material/Visibility';
import TextsmsIcon from '@mui/icons-material/Textsms';
import Link from 'next/link';

const Top10 = () => {
  return (
    <>
      <Link href={'/'}>
        <div className="bg-[#2C2C2C] w-[290px] h-[90px] text-white p-4 rounded-tl-2xl rounded-tr-2xl shadow-lg">
          <div className="flex gap-2">
            <span className="bg-[#0095E8] px-4 rounded-full">언어</span>
            <span className="">제목</span>
          </div>

          <div className="text-xs">
            <div className="flex justify-between">
              <div className="flex my-3 gap-1">
                <span>작성자</span>
                <span>|</span>
                <span>작성일자</span>
              </div>
              <div className="flex m-3 gap-1">
                <span>
                  <VisibilityIcon />
                  조회수
                </span>
                <span>
                  <TextsmsIcon />
                  댓글수
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-[290px] h-[140px] p-4 rounded-bl-2xl rounded-br-2xl shadow-lg">
          본문글
        </div>
      </Link>
    </>
  );
};

export default Top10;
