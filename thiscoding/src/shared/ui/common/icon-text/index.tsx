interface Props {
  Icon: React.ElementType;
  children?: React.ReactNode;
  fontSize?: number;
  iconSize?: number;
}
export const IconText = ({ Icon, children, iconSize, fontSize }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Icon style={{ fontSize: iconSize }} />
      <span style={{ fontSize: fontSize }}>{children}</span>
    </div>
  );
};
