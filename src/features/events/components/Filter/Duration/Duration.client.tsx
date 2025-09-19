'use client';

import Tabs from '@common/components/tabs/Tabs.client';

import { DurationType, FilterType } from '@features/events/types/filter';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

import { DURATION_TYPE_LABELS } from '@features/events/constansts/filter';
import { PREDEFINED_RANGES } from '@features/events/constansts/filter';

import Custom from './Custom.client';
import DateList from './DataList/DataList.client';

const Duration = () => {
  const { handleSelect } = useEventsFilter(FilterType.DURATION);

  return (
    <div>
      <header>
        <Tabs listClassName="py-16pxr" option="이벤트 기간 선택 탭" defaultValue={DurationType.ALL}>
          {/* 리스트 부분 */}
          <Tabs.List>
            {Object.keys(DURATION_TYPE_LABELS).map((key) => {
              const type = key as DurationType;

              return (
                <Tabs.Trigger
                  key={type}
                  value={type}
                  label={DURATION_TYPE_LABELS[type]}
                  onClick={() => handleSelect(type)}
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
      </header>
    </div>
  );
};
export default Duration;
