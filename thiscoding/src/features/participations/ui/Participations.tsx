import ParticipationsContent from './ParticipationsContent';
import { Pagination } from '@/shared/ui/Pagination';
const Participations = () => {
  return (
    <>
      <div className="w-[950] h-[650] bg-[#FFFFFF] ml-24 rounded-2xl border-[#EBEBEB] shadow">
        <div className="grid grid-cols-4 gap-x-[50px] gap-y-[36px] p-[40px] mx-[10px]">
          <ParticipationsContent />
        </div>
        {/* <Pagination /> */}
      </div>
    </>
  );
};

export default Participations;
