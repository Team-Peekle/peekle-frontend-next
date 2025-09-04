import { cn } from '@lib/utils';

interface DayCardProps {
  title: string;
  date: string;
  className?: string;
}

export default function DayCard({ title, date, className }: DayCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start gap-1 rounded-[8px] bg-gray-50 p-4',
        className,
      )}
    >
      <p className="text-p14-16 w-full text-left text-gray-400">{title}</p>
      <p className="text-p16-18 w-full text-left text-gray-700">{date}</p>
    </div>
  );
}
