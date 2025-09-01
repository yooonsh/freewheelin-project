import type { iconComponents } from 'assets/icons/icons';
import { Icon } from './Icon';
import { cn } from 'lib/cn';

type TButtonProps = {
  onClick: () => void;
  icon?: keyof typeof iconComponents;
  children?: React.ReactNode;
  className?: string;
};

export const Button = ({ onClick, icon, children, className }: TButtonProps) => {
  return (
    <button
      className={cn(
        'flex h-[18px] cursor-pointer items-center gap-1 text-[12px] font-normal tracking-normal text-[#959595]',
        className,
      )}
      onClick={onClick}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
};
