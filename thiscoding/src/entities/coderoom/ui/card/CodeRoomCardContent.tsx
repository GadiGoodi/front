interface CodeRoomCardContentProps {
  content: string;
}
const CodeRoomCardContent = ({ content }: CodeRoomCardContentProps) => {
  return (
    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs bg-[#ffffff]">
      {content}
    </div>
  );
};

export default CodeRoomCardContent;
