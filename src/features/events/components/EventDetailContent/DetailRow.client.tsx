import { ReactNode } from 'react';

import { DEFAULT_TEXT } from '@features/events/constants/eventDetail';

interface DetailRowProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

const DetailRow = ({ label, value, icon }: DetailRowProps) => {
  return (
    <span className="gap-24pxr flex flex-row items-center">
      <span className="text-p16m gap-10pxr min-w-50pxr flex flex-row items-center">
        {icon}
        <p className="text-gray-400">{label}</p>
      </span>
      {/* value 내용이 없으면 '정보 없음'으로 처리 */}
      <p className="text-p16m text-gray-700">
        {value === '' || value === null || value === undefined ? DEFAULT_TEXT : value}
      </p>
    </span>
  );
};

export default DetailRow;
