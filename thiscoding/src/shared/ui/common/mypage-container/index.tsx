interface Props {
  children: React.ReactNode;
}

export const MyPageContainer = ({ children }: Props) => {
  return (
    <div className="absolute w-[950] h-[650] bg-white ml-24 rounded-2xl border-[#EBEBEB] shadow">
      {children}
    </div>
  );
};
