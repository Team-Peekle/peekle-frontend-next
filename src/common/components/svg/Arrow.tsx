import { SvgWrapper } from './SvgWrapper';

interface ArrowProps extends React.HTMLAttributes<HTMLElement> {
  direction?: 'left' | 'right';
}

const PATHS = {
  left: 'M12.9375 15.6875L6.75 9.5L12.9375 3.3125',
  right: 'M5.0625 3.3125L11.25 9.5L5.0625 15.6875',
};

export const Arrow = ({ direction = 'left', ...props }: ArrowProps) => {
  const path = PATHS[direction];
  return (
    <SvgWrapper {...props}>
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {path && (
          <path
            d={path}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </SvgWrapper>
  );
};
