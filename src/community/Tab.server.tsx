import { cn } from '@lib/utils';

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

function Tab({ isActive, className, children, onClick, ...props }: TabProps) {
  return (
    <button
      className={cn(
        'text-p15m flex h-fit w-fit cursor-pointer justify-items-center rounded-[6px] px-[8px] py-[8px]',
        isActive ? 'text-gray-0 bg-gray-800' : 'bg-gray-50 text-gray-500',
        className,
      )}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export default Tab;
