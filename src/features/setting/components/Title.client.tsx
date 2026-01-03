'use client';

import { cn } from '@common/libs/utils';

interface TitleProps {
  title: string;
  className?: string;
}

const Title = ({ title, className }: TitleProps) => {
  return (
    <h2 className={cn('pb-16pxr text-p17b border-b border-gray-100 text-gray-800', className)}>
      {title}
    </h2>
  );
};

export default Title;
