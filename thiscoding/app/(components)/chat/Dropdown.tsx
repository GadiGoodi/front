import { forwardRef } from 'react';

interface DropdownProps {
  position: { x: number; y: number }; // 모달 위치를 받는 props
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ position }, ref) => {
    const style = {
      position: 'fixed' as 'fixed',
      top: position.y,
      left: position.x,
      transform: 'translate(-50%, -50%)',
    };

    return (
      <div ref={ref} style={style} className="shadow-lg">
        <div className="cursor-pointer text-[12px] text-center flex items-center justify-center h-[26px] w-[75px] rounded-sm border bg-[#fafafafa] shadow-sm hover:bg-gray-200">
          채팅방 나가기
        </div>
      </div>
    );
  },
);

export default Dropdown;
