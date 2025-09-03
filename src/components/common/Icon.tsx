import { iconComponents } from 'assets/icons/icons';

type TIconProps = {
  name: keyof typeof iconComponents;
  width?: number;
  height?: number;
  className?: string;
};

export const Icon = ({ name, width = 16, height = 16, className }: TIconProps) => {
  const IconComponent = iconComponents[name];

  return (
    <span className={className}>
      <img src={IconComponent} alt={name} width={width} height={height} />
    </span>
  );
};
