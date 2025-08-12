import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

// Svg들의 공통 스타일을 정의하는 컴포넌트. size 말고는 딱히 없어보임
export const SvgWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  return <Slot className={cn('inline-block size-6', className)} {...props} />;
}
