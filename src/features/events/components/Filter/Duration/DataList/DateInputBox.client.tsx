'use client';

import { formatDate } from '@common/utils/dates';

import { Calendar } from '@common/components/svg/Calendar';

interface DateInputBoxProps {
  date: Date | null;
  onClick?: () => void;
}

const DateInputBox = ({ date, onClick }: DateInputBoxProps) => {
  const dateStr = formatDate(date);
  const DEFAULT_DATE_STR = '연도. 월. 일';

  return (
    <div
      className="w-152pxr px-16pxr py-12pxr rounded-8pxr text-p16m flex shrink-0 flex-row items-center justify-between border-[2px] border-solid border-gray-100 text-gray-400"
      onClick={onClick}
    >
      <p>{dateStr ?? DEFAULT_DATE_STR}</p>
      <Calendar type="small" className="w-11pxr h-11pxr" />
    </div>
  );
};

export default DateInputBox;
