interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton = ({ onClick, children }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="h-[25px] w-[65px] rounded-[10px] text-[11px] font-medium text-white  bg-[#ff7262] hover:opacity-80"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
