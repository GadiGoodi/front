import CodeRoomCardContent from './CodeRoomCardContent';
import CodeRoomCardSubInfo from './CodeRoomCardSubInfo';
import CodeRoomCardTitle from './CodeRoomCardTitle';
import ActionButton from '@/shared/ui/common/action-button';
import type { Invitations } from '@/entities/coderoom/types';

interface CodeRoomCardProps {
  invitations: Invitations;
  leftAction: (alarmId: number, codeRoomId: number) => void;
  rightAction: (alarmId: number, codeRoomId: number) => void;
}

export const CodeRoomCard = ({
  invitations: {
    language,
    title,
    content,
    headCount,
    nickname,
    alarmId,
    codeRoomId,
  },
  leftAction,
  rightAction,
}: CodeRoomCardProps) => {
  return (
    <>
      <div className="w-[176px] h-[150px] bg-[#ffffff] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[10px]">
        <CodeRoomCardTitle language={language} title={title} />
        <div className="p-3 flex flex-col gap-2">
          <CodeRoomCardContent content={content} />
          <CodeRoomCardSubInfo headCount={headCount} nickname={nickname} />
          <div className="flex justify-between">
            <ActionButton onClick={() => leftAction(alarmId, codeRoomId)}>
              수락하기
            </ActionButton>
            <ActionButton onClick={() => rightAction(alarmId, codeRoomId)}>
              거절하기
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
};
