'use client';

import useParticipations from '@/features/participations/mutation/useParticipations';
import { useEffect } from 'react';
import { UUID } from 'crypto';

import GroupsIcon from '@mui/icons-material/Groups';
import Face3Icon from '@mui/icons-material/FaceSharp';

const ParticipationsContent = () => {
  const { codingrooms, setCodingrooms, participants, setParticipants } =
    useParticipations();

  return (
    <>
      {codingrooms.map((codingroom) => (
        <div className="w-[176] h-[150] bg-[#ffffff] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[10]">
          <div className="h-[40] flex gap-[5px]  items-center bg-[#2c2c2c] rounded-t-lg px-[14px]">
            <div className="flex justify-center items-center h-[16] text-[10px]   text-white  bg-[#0095eb] rounded-[10px] px-[10px] font-normal ml-[1px]">
              JavaScript
            </div>
            <div className="flex justify-center items-center text-[13px] text-white">
              자스 학습방
            </div>
          </div>
          <div className="w-[176px] h-[110px] p-[14px] flex flex-col justify-between">
            <div className="whitespace-nowrap text-[12px] w-full bg-[#ffffff]">
              헷갈리는 자스 빠르게 정복 고고!
            </div>
            <div className="flex justify-between">
              <div className="text-[11px] flex justify-center items-center gap-[5px]">
                <GroupsIcon className="w-[20px] h-[20px]"></GroupsIcon>
                {codingroom.headCount}/6
              </div>

              <div className="flex relative">
                {participants.map((participant, index) => (
                  <div
                    className={`absolute flex items-center justify-center gap-[2px] -translate-x-[20px] -traslate-x-[${index + 1 * 10}px] z-[${index}]`}
                  >
                    <Face3Icon className="w-[20px] h-[20px] rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button className="h-[25px] w-[65px] rounded-[10px] text-[11px] text-white font-normal bg-[#0095eb]">
                참여하기
              </button>
              <button className="h-[25px] w-[65px] rounded-[10px] text-[11px] text-white font-normal bg-[#ff7262]">
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ParticipationsContent;
