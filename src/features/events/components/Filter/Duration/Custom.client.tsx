'use client';

import { useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import Calendar from 'react-calendar';

import { formatDate, isInRange, isSameDay } from '@common/utils/dates';

import { Arrow } from '@common/components/svg/Arrow';

import useEventsFilter from '@features/events/hooks/useEventsFilter';

import '@app/styles/custom-calendar.css';

import { DateRange, FilterType } from '../../../types/filter';
import DateList from './DataList/DataList.client';

const Custom = () => {
  const { handleSelect } = useEventsFilter(FilterType.DURATION);
  const searchParams = useSearchParams();
  const today = new Date(); // 오늘 날짜 객체

  const initialDateRange = useMemo(() => {
    const dates = searchParams.get(FilterType.DURATION);
    if (!dates) {
      return [null, null] as DateRange;
    }
    const [start, end] = dates.split(',').map((dateStr) => new Date(dateStr));
    const startDate = start instanceof Date && !isNaN(start.getTime()) ? start : null;
    const endDate = end instanceof Date && !isNaN(end.getTime()) ? end : null;
    return [startDate, endDate] as DateRange;
  }, [searchParams]);

  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);
  const [startDate, endDate] = dateRange;

  // 캘린더 날짜 선택
  const handleCalendarChange = (value: Date) => {
    if (!startDate || (startDate && endDate)) {
      // 첫 번째 날짜가 선택되지 않았거나, 둘다 선택됐으면 새 범위 생성
      setDateRange([value, null]);
    } else {
      if (value > startDate) {
        setDateRange([startDate, value]);
        handleSelect(`${formatDate(startDate)},${formatDate(value)}`);
      } else {
        setDateRange([value, startDate]);
        handleSelect(`${formatDate(value)},${formatDate(startDate)}`);
      }
    }
  };

  // 날짜 포맷 변경(숫자만) - 캘린더에 일만 표시하기 위해
  const formatCalendarDay = (_locale: string | undefined, utcDate: Date) => {
    const day = utcDate.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  return (
    <>
      <DateList date1={startDate} date2={endDate} />
      <Calendar
        onChange={(value) => handleCalendarChange(value as Date)}
        value={dateRange}
        locale="ko-KR"
        view="month"
        formatDay={formatCalendarDay}
        // showNeighboringMonth={false} /* 이전 달 다음 달 보이지 않게 */
        calendarType="gregory" /* 일요일부터 시작 */
        prevLabel={<Arrow direction="left" className="w-18pxr h-19pxr text-[#74777D]" />}
        nextLabel={<Arrow direction="right" className="w-18pxr h-19pxr text-[#74777D]" />}
        prev2Label={null} /* 년 단위 이동 없앰 */
        next2Label={null} /* 년 단위 이동 없앰 */
        tileClassName={({ date }) => {
          const isStart = isSameDay(date, dateRange[0]);
          const isEnd = isSameDay(date, dateRange[1]);
          const inRange =
            dateRange[0] && dateRange[1] && isInRange(date, dateRange[0], dateRange[1]);
          const isToday = isSameDay(date, today);

          if (isStart) return 'selectedDay startDay';
          if (isEnd) return 'selectedDay endDay';
          if (inRange) return 'in-range';
          if (isToday) return 'today';
          return '';
        }}
      />
    </>
  );
};

export default Custom;
