import VisibilityIcon from '@mui/icons-material/Visibility';
import TextsmsIcon from '@mui/icons-material/Textsms';
import Link from 'next/link';

const Top10 = () => {
  return (
    <>
      <div className="py-3 transform transition-transform ease-in-out duration-300 hover:scale-105">
        <Link href={'/'}>
          <div className="bg-[#2C2C2C] w-[250px] h-[90px] text-white p-4 rounded-tl-2xl rounded-tr-2xl shadow-lg">
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
                    <VisibilityIcon style={{ fontSize: '15px' }} />
                    조회수
                  </span>
                  <span>
                    <TextsmsIcon style={{ fontSize: '15px' }} />
                    댓글수
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-overflow bg-white w-[250px] h-[130px] py-[6px] px-3 rounded-bl-2xl rounded-br-2xl shadow-lg">
            I'm like some kind of supernova Watch out Look at me go, 재미 좀 볼
            빛의 core, so hot, hot 문이 열려 서로의 존재를 느껴 마치 Discord, 날
            닮은 너 (incoming!), 너 누구야? (Drop) 사건은 다가와, ah-oh, ayy
            거세게 커져가, ah-oh, ayy That tick, that tick, tick bomb That tick,
            that tick, tick bomb 감히 건드리지 못할 걸 (누구도 말이야) 지금 내
            안에선, su-su-su-supernova Nova, can't stop hyperstellar 원초 그걸
            찾아 Bring the light of a dying star 불러낸 내 우주를 봐봐,
            supernova
          </div>
        </Link>
      </div>
    </>
  );
};

export default Top10;
