import { cn } from '@lib/utils';

import { useTabsInfo } from '@common/hooks/stores/useTabsStore';

interface PanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * @description Tabs의 Panel 컴포넌트입니다.
 *
 * 선택된 Trigger에 해당하는 Panel만 렌더링합니다.
 *
 * @param {object} props
 * @param {string} props.value - 각 Trigger의 고유 값
 * @param {React.ReactNode} props.children - Trigger에 대응해 표시될 컴포넌트
 * @param {string} [props.className] - 추가적인 클래스 이름
 */
const Panel = ({ value, children, className }: PanelProps) => {
  const { selectedValue, option } = useTabsInfo();

  if (value !== selectedValue) return null;

  return (
    <div
      id={`${option}-panel-${value}`}
      role="tabpanel"
      aria-labelledby={`${option}-trigger-${value}`}
      className={cn('px-16pxr', className)}
    >
      {children}
    </div>
  );
};

export default Panel;
