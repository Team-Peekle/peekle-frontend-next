'use client';

import { ChipType } from '@common/types/chip';

import { useTabsInfo } from '@common/hooks/stores/useTabsStore';
import { useSetSelectedValue } from '@common/hooks/stores/useTabsStore';

import Chip from '@common/components/Chip/Chip.client';

interface TriggerProps {
  value: string;
  label: string;
  onClick?: () => void;
}

/**
 * @description Tabs의 Trigger 컴포넌트입니다.
 *
 * 클릭시 특정 탭을 활성화 시키는 버튼 역할입니다.
 *
 * @param {object} props
 * @param {string} props.value - 각 Trigger의 고유 값
 * @param {string} props.label - Trigger에 표시될 텍스트
 * @param {() => void} [props.onClick] - Trigger 클릭시 실행될 콜백 함수
 */
const Trigger = ({ value, label, onClick }: TriggerProps) => {
  const { option, selectedValue } = useTabsInfo();
  const setSelectedValue = useSetSelectedValue();

  const isActive = selectedValue === value;

  const onSelect = () => {
    setSelectedValue(value);
    onClick?.();
  };

  return (
    <Chip
      chipType={isActive ? ChipType.VAR1 : ChipType.VAR2}
      id={`${option}-trigger-${value}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${option}-panel-${value}`}
      onClick={onSelect}
      text={label}
    />
  );
};

export default Trigger;
