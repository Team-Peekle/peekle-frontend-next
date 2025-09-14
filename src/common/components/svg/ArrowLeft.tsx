import { SvgWrapper } from './SvgWrapper';

export const ArrowLeft = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.991"
        height="16.593"
        fill="none"
        overflow="visible"
      >
        <path
          d="M 9.991 1.462 L 8.485 0 L 0 8.296 L 8.485 16.593 L 9.98 15.13 L 2.947 8.296 Z"
          fill="rgb(157, 161, 171)"
        ></path>
      </svg>
    </SvgWrapper>
  );
};
