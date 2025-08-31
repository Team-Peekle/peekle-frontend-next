import { SvgWrapper } from './SvgWrapper';

export const Down = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.371"
        height="5.834"
        fill="none"
        overflow="visible"
      >
        <path
          d="M 5.185 3.713 L 9.219 0 L 10.371 1.061 L 5.185 5.834 L 0 1.061 L 1.152 0.001 L 5.185 3.713 Z"
          fill="currentColor"
        ></path>
      </svg>
    </SvgWrapper>
  );
};
