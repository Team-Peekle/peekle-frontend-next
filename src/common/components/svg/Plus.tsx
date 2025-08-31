import { SvgWrapper } from './SvgWrapper';

export const Plus = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" overflow="visible">
        <path
          d="M 14 7.778 L 7.778 7.778 L 7.778 14 L 6.222 14 L 6.222 7.778 L 0 7.778 L 0 6.222 L 6.222 6.222 L 6.222 0 L 7.778 0 L 7.778 6.222 L 14 6.222 Z"
          fill="currentcolor"
        ></path>
      </svg>
    </SvgWrapper>
  );
};
