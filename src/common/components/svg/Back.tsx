import { SvgWrapper } from './SvgWrapper';

export const Back = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.5 10.938H7.569L13.509 4.998L12 3.5L3.5 12L12 20.5L13.498 19.002L7.569 13.063H20.5V10.938Z"
          fill="currentColor"
        />
      </svg>
    </SvgWrapper>
  );
}
