'use client';

import DateInputBox from './DateInputBox.client';

interface DateListProps {
  date1: Date | null;
  date2: Date | null;
  onClick1?: () => void;
  onClick2?: () => void;
}

const DateList = ({ date1, date2, onClick1, onClick2 }: DateListProps) => {
  return (
    <div className="gap-8pxr flex shrink-0 flex-row items-center">
      <DateInputBox date={date1} onClick={onClick1} />
      <div className="w-8pxr h-1pxr shrink-0 bg-[#464B53]"></div>
      <DateInputBox date={date2} onClick={onClick2} />
    </div>
  );
};

export default DateList;
