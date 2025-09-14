import { cn } from '@common/libs/utils';

import { useTabsInfo } from '@common/hooks/stores/useTabsStore';

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @description Tabs의 List 컴포넌트입니다.
 *
 * Tabs의 Trigger들을 감싸는 역할을 합니다.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Trigger 컴포넌트들
 * @param {string} [props.className] - 추가적인 클래스 이름
 */
const List = ({ children, className }: ListProps) => {
  const { option } = useTabsInfo();

  return (
    <div
      role="tablist"
      aria-label={option}
      aria-orientation="horizontal"
      className={cn(
        'px-16pxr gap-8pxr scrollbar-hide flex w-full items-center overflow-x-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default List;
