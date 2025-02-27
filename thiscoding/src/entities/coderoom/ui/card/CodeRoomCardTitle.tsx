interface CodeRoomCardTitleProps {
  language: string;
  title: string;
}

const CodeRoomCardTitle = ({ language, title }: CodeRoomCardTitleProps) => {
  return (
    <div className="h-10 flex gap-2  items-center bg-[#2c2c2c] rounded-t-lg p-3">
      <div className="flex justify-center items-center h-4 text-[10px] text-white  bg-[#0095eb] rounded-lg px-[10px] font-medium">
        {language}
      </div>
      <div className="flex justify-center items-center text-[13px] text-white font-medium overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};

export default CodeRoomCardTitle;
