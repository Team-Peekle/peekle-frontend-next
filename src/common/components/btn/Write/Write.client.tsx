'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '@common/types/btn';
import { WriteType } from '@common/types/btn';

import { WriteIcon } from '@common/components/svg/WriteIcon';

interface WriteProps extends ButtonsCommonProps {
  writeType: WriteType;
}

const Write = ({ writeType, onClick, ...props }: WriteProps) => {
  const V1 = writeType === WriteType.V1;
  const V2 = writeType === WriteType.V2;

  return (
    <button
      aria-label="글쓰기 버튼"
      className={clsx('rounded-50pxr gap-10pxr flex items-center justify-center bg-gray-900', {
        'w-99pxr h-48pxr gap-6pxr': V1,
        'w-60pxr h-60pxr': V2,
      })}
      onClick={onClick}
      {...props}
    >
      {V1 && (
        <>
          <WriteIcon className="w-20pxr h-20pxr text-gray-0" />
          <p className="text-p16b text-gray-0">글쓰기</p>
        </>
      )}
      {V2 && <WriteIcon className="w-26pxr h-26pxr text-gray-0" />}
    </button>
  );
};

export default Write;
