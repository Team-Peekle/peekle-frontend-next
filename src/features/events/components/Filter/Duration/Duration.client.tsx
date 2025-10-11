'use client';

import { cn } from '@common/libs/utils';

import { formatDate } from '@common/utils/dates';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Tabs from '@common/components/tabs/Tabs.client';

import { DurationType, FilterType } from '@features/events/types/filter';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

import { DURATION_TYPE_LABELS } from '@features/events/constansts/filter';
import { PREDEFINED_RANGES } from '@features/events/constansts/filter';

import Custom from './Custom.client';
import DateList from './DataList/DataList.client';

const Duration = () => {
  const isMobile = useIsMobile();

  const { handleSelect } = useEventsFilter(FilterType.DURATION);

  /**
   * 탭 클릭 시 최종 날짜를 계산하고 searchParams에 반영하는 함수
   * @param type 선택된 기간 타입 (ALL, TODAY, ONE_WEEK 등)
   */
  const handleDurationClick = (type: DurationType) => {
    if (type === DurationType.CUSTOM) {
      // CUSTOM일 경우, handleSelect에 'CUSTOM' 값만 전달 (날짜는 Custom.client에서 처리)
      handleSelect(type);
      return;
    }

    const range = PREDEFINED_RANGES[type as Exclude<DurationType, DurationType.CUSTOM>];

    // date1과 date2를 yyyy-MM-dd 형식의 문자열로 변환
    const startDate = formatDate(range[0]);
    const endDate = formatDate(range[1]);

    // searchParams 업데이트
    handleSelect(`${startDate},${endDate}`);
  };

  return (
    <Tabs
      listClassName={cn(isMobile ? 'pb-16pxr' : 'py-16pxr')}
      option="이벤트 기간 선택 탭"
      defaultValue={DurationType.ALL}
    >
      {/* 리스트 부분 */}
      <Tabs.List>
        {Object.keys(DURATION_TYPE_LABELS).map((key) => {
          const type = key as DurationType;

          return (
            <Tabs.Trigger
              key={type}
              value={type}
              label={DURATION_TYPE_LABELS[type]}
              onClick={() => handleDurationClick(type)}
            />
          );
        })}
      </Tabs.List>
      {/* 패널 부분 */}
      {Object.keys(DURATION_TYPE_LABELS).map((key) => {
        const type = key as DurationType;
        if (type === DurationType.CUSTOM) {
          return (
            <Tabs.Panel key={type} value={type}>
              <Custom />
            </Tabs.Panel>
          );
        }
        const [date1, date2] = PREDEFINED_RANGES[type];
        return (
          <Tabs.Panel key={type} value={type}>
            <DateList date1={date1} date2={date2} />
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
};
export default Duration;
